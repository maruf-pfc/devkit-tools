import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen">
      <Button className="text-5xl p-8 cursor-pointer">Hello World</Button>
      <button
        onClick={() => {
          throw new Error("Test error triggered");
        }}
      >
        Trigger Error
      </button>
    </main>
  );
}
