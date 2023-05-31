import { useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import TinyCollapse from "react-tiny-collapse";

//Data
import NavsData from "@/Data/Layout/Navs.data";

//Types
interface Props {
    main?: string;
    sub?: string;
}

const Navs = ({ main, sub }: Props) => {
    //State
    const [open, setOpen] = useState<string | null>(sub ? main || null : null);
    //Handler
    const onHandler = (id: string) => {
        if (open === id) {
            setOpen(null);
        } else {
            setOpen(id)
        }
    }
    return (
        <ul className="px-3">
            {NavsData.map((item, i) => (
                <li key={i} className={`rounded-lg ${main === item.id ? "bg-primary" : ""}`}>
                    {!item.sub ? (
                        <Link href={item.url} className="py-3 pl-6 pr-2 flex gap-3 select-none">
                            <Icon icon={item.icon} className={`text-[22px] inline  ${main === item.id ? "text-main" : ""}`} />
                            <p className={`text-base transition-all ${main === item.id ? "font-bold text-main" : "font-normal"}`}>{item.name}</p>
                        </Link>
                    ) : (
                        <div className="flex gap-3 w-full cursor-pointer py-3 pl-6 pr-2 select-none" onClick={() => onHandler(item.id)}>
                            <Icon icon={item.icon} className={`text-[22px] inline  ${main === item.id ? "text-main" : ""}`} />
                            <p className={`text-base transition-all ${main === item.id ? "font-bold text-main" : "font-normal"}`}>{item.name}</p>
                            <div className="flex-1 text-right">
                                <Icon icon="material-symbols:keyboard-arrow-down-rounded" className={`text-2xl inline transition-all duration-300 ease-in-out ${open === item.id ? "rotate-0" : "-rotate-90"} ${main === item.id ? "text-main" : ""}`} />
                            </div>
                        </div>
                    )}
                    <TinyCollapse isOpen={open === item.id} easing="cubic-bezier(0.4, 0, 0.2, 1)" duration={280}>
                        <ul className="mx-3 pb-2">
                            {item.sub && item.sub.map((subItem, index) => (
                                <li key={index}>
                                    <Link href={subItem.url} className={`rounded-lg px-[45px] text-sm font-medium block w-full py-2 ${subItem.id === sub ? "bg-secondary font-semibold text-main" : ""}`}>
                                        {subItem.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </TinyCollapse>
                </li>
            ))}
        </ul>
    );
};

export default Navs;