import Image from "next/image";
import Search from "@/components/Search";
import TempToggle from "@/components/TempToggle";

const Header = () => {
    return (
        <section className={"w-full py-8 flex items-center gap-10"}>
            <Image
                src={"/assets/icons/logo.svg"}
                alt={"Just Weather Logo"}
                width={140}
                height={20}/>

            <Search/>

            <TempToggle/>
        </section>
    );
};

export default Header;