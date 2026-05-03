import Image from "next/image";
import logo from "../../../public/images/logo.png";
import Link from "next/link";

function Logo() {
    return (
        <Link href="/" className="w-[120px] md:w-[220px] inline-block">
            <Image
                src={logo}
                alt="Logo"
                width={220}
                height={53}
                priority
                className="w-full h-auto"
                style={{ width: "auto", height: "auto" }}
            />
        </Link>
    );
}

export default Logo;
