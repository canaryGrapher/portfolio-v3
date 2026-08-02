#!/usr/bin/env node
/**
 * Sets up THOUGHTS_ADMIN_PASSWORD_HASH and THOUGHTS_JWT_SECRET.
 *
 *   pnpm hash-password                 prompts for the password, prints the values
 *   pnpm hash-password --write         prompts, then writes them into .env for you
 *   pnpm hash-password "my password"   non-interactive (ends up in shell history)
 *
 * --write only fills in THOUGHTS_* keys and leaves everything else in .env alone.
 */
import bcrypt from 'bcryptjs';
import readline from 'node:readline';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const ROUNDS = 12;
const ENV_PATH = path.join(process.cwd(), '.env');

function promptHidden(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true,
    });

    let muted = false;
    rl._writeToOutput = (chunk) => {
      if (!muted) rl.output.write(chunk);
    };

    rl.question(question, (answer) => {
      rl.close();
      process.stdout.write('\n');
      resolve(answer);
    });

    muted = true;
  });
}

/**
 * Next runs dotenv-expand over .env, so an unescaped `$` is read as the start of
 * a variable reference. A bcrypt hash is full of them ($2b$12$...), and would be
 * silently mangled into a shorter string. Backslash-escaping is the only form
 * that survives; single quotes do not help.
 */
const escapeForDotenv = (value) => value.replace(/\$/g, '\\$');

/** Replaces KEY="..." in place, or appends it if the key is absent. */
const upsertEnv = (contents, key, value) => {
  const line = `${key}="${value}"`;
  const pattern = new RegExp(`^${key}=.*$`, 'm');
  return pattern.test(contents) ? contents.replace(pattern, line) : `${contents.trimEnd()}\n${line}\n`;
};

const main = async () => {
  const args = process.argv.slice(2);
  const write = args.includes('--write');
  const positional = args.find((a) => !a.startsWith('--'));

  const password = positional ?? (await promptHidden('Password: '));

  if (!password || password.length < 12) {
    console.error('\nPassword must be at least 12 characters.');
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, ROUNDS);
  const secret = crypto.randomBytes(32).toString('base64');

  if (!write) {
    console.log('\nPaste these into .env exactly as shown, then restart the dev server:\n');
    console.log(`THOUGHTS_ADMIN_PASSWORD_HASH="${escapeForDotenv(hash)}"`);
    console.log(`THOUGHTS_JWT_SECRET="${secret}"`);
    console.log('\nThe backslashes before each $ are required. Next expands .env values,');
    console.log('so an unescaped $2b$12$ is treated as variables and silently truncated.');
    console.log('\nDo not forget THOUGHTS_ADMIN_USERNAME, which you set yourself.');
    console.log('Re-run with --write to have this script edit .env for you.\n');
    return;
  }

  if (!fs.existsSync(ENV_PATH)) {
    console.error(`\nNo .env found at ${ENV_PATH}. Copy .env.sample to .env first.`);
    process.exit(1);
  }

  let contents = fs.readFileSync(ENV_PATH, 'utf-8');
  const existingSecret = contents.match(/^THOUGHTS_JWT_SECRET="(.+)"$/m)?.[1];

  contents = upsertEnv(contents, 'THOUGHTS_ADMIN_PASSWORD_HASH', escapeForDotenv(hash));
  // Keep an existing secret so writing a new password does not log you out.
  contents = upsertEnv(contents, 'THOUGHTS_JWT_SECRET', existingSecret || secret);

  fs.writeFileSync(ENV_PATH, contents);

  console.log('\nWrote THOUGHTS_ADMIN_PASSWORD_HASH and THOUGHTS_JWT_SECRET to .env.');
  if (existingSecret) console.log('Kept your existing JWT secret, so current sessions survive.');
  console.log('Set THOUGHTS_ADMIN_USERNAME yourself, then restart the dev server.\n');
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
