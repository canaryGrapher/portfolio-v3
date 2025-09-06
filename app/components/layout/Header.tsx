import HeaderData from "@/data/Headers";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex justify-center items-center p-4 bg-black">
      <Image
        src={HeaderData.logo.src}
        alt="Logo"
        width={20}
        height={20}
        className="mx-3 absolute left-0"
      />
      <nav>
        {HeaderData.links.map((link) => (
          <Link
            href={link.href}
            key={link.title}
            className="text-sm font-bold text-gray-300 hover:text-white mx-5 uppercase">
            {link.title}
          </Link>
        ))}
      </nav>
    </header>
  );
};
