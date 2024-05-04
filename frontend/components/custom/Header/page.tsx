import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function Header() {
  return (
    <div className="absolute top-0 left-0 w-screen border-b border-gray-100 py-3 px-10 md:py-5 md:px-32 flex justify-between">
      <Image src="/logo.png" alt="Our logo" width={220} height={60} />

      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
    </div>
  );
}
