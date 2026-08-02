// Types for the Thoughts section (markdown posts stored in GitHub)

export type ThoughtStatus = 'draft' | 'published';

/** YAML frontmatter at the top of every content/thoughts/<slug>.md file */
export interface ThoughtFrontmatter {
  title: string;
  subtitle?: string;
  /** ISO 8601 */
  date: string;
  /** ISO 8601, bumped on every edit */
  updated?: string;
  tags: string[];
  featureImage?: string;
  excerpt?: string;
  status: ThoughtStatus;
  /** Estimated minutes, computed on save */
  readingTime?: number;
}

/** A post as returned by the listing endpoints (no body). */
export interface ThoughtSummary extends ThoughtFrontmatter {
  slug: string;
  /** GitHub blob sha, required when updating or deleting */
  sha?: string;
}

/** A full post, body included. */
export interface ThoughtPost extends ThoughtSummary {
  content: string;
}

/** Shape the editor submits to POST/PUT /api/thoughts/posts */
export interface ThoughtDraftInput {
  slug?: string;
  title: string;
  subtitle?: string;
  tags?: string[];
  featureImage?: string;
  excerpt?: string;
  status: ThoughtStatus;
  content: string;
  /** Present when updating an existing post */
  sha?: string;
  /** Preserved from the original post on update so the date does not shift */
  date?: string;
}

export interface ApiOk<T> {
  success: true;
  data: T;
}

export interface ApiErr {
  success: false;
  error: string;
}

export type ApiResult<T> = ApiOk<T> | ApiErr;

export interface UploadedImage {
  url: string;
  thumbnailUrl: string;
  fileId: string;
  name: string;
}

export interface SessionInfo {
  authenticated: boolean;
  username?: string;
  /** Unix seconds */
  expiresAt?: number;
}
