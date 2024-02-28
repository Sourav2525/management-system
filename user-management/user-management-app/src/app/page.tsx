import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle/ModeToggle"

export default function Home() {
  return (
    <div className="p-4">
      <Button>Click me</Button>
      <ModeToggle />
    </div>
  );
}
