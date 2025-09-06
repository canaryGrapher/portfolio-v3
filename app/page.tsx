import Main from "./components/main";

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
        <Main />
      </main>
    </div>
  );
}
