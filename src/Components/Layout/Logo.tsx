import Image from "next/image";

//Images
import LogoImage from "@/Assets/logo.png";

const Logo = () => {
    return (
        <div className="text-center mb-10 pt-8">
            <Image src={LogoImage} alt="logo" width={120} height={89} className="inline w-1/3" />
        </div>
    );
};

export default Logo;