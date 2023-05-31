import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useClickOutside } from "@react-hookz/web";
import { Icon } from "@iconify/react";

//Profile Image
import ProfileImage from "@/Assets/profile.jpg";

const Profile = () => {
    //State
    const [open, setOpen] = useState<boolean>(false);

    //Initializing Hook
    const ref = useRef(null);

    //Use Click outside
    useClickOutside(ref, () => {
        setOpen(false)
    });
    return (
        <div className="relative" ref={ref}>
            <Image
                src={ProfileImage} alt="Profile"
                width={60} height={60}
                className="w-12 rounded-full cursor-pointer"
                onClick={() => setOpen(!open)}
            />
            <div className={`absolute right-0 w-72 top-full mt-1 transition-all duration-300 ease-in-out ${open ? "opacity-1 visible translate-y-0" : "opacity-0 invisible -translate-y-1 "} bg-white shadow-lg rounded-lg z-50`}>
                <div className="px-5 pt-5">
                    <Link href="/" className="flex gap-3 items-center">
                        <Image
                            src={ProfileImage} alt="Profile"
                            width={100} height={100}
                            className="w-16 rounded-full cursor-pointer"
                        />
                        <div>
                            <p className="text-xl font-medium">Lion Decostra</p>
                            <p className="text-base">01611994403</p>
                        </div>
                    </Link>
                </div>
                <div className="divider after:h-px before:h-px"></div>
                <div className="px-6 pb-5">
                    <div className="flex gap-2 items-center mb-3 cursor-pointer select-none">
                        <Icon icon="material-symbols:help" className="inline text-[21px]" />
                        <p className="text-base">Help</p>
                    </div>
                    <div className="flex gap-2 items-center text-red-600 cursor-pointer select-none">
                        <Icon icon="lucide:log-out" className="inline text-[20px]" />
                        <p className="text-base">Log out</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;