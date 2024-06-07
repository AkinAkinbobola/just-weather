import Image from "next/image";
import Search from "@/components/Search";
import TempToggle from "@/components/TempToggle";
import Link from "next/link";
import { Suspense } from "react";

const Header = () => {
  return (
    <section className="w-full py-8 flex flex-col items-center gap-4 sm:flex-row sm:items-center">
      <div className="flex justify-center sm:justify-start w-full sm:w-auto">
        <Link href={"/"}>
          <Image
            src="/assets/icons/logo.svg"
            alt="Just Weather Logo"
            width={140}
            height={20}
          />
        </Link>
      </div>

      <div className="flex items-center gap-4 flex-grow w-full sm:w-auto">
        <Suspense>
          <Search />
        </Suspense>
        <TempToggle />
      </div>
    </section>
  );
};

export default Header;
