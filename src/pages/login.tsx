import type { GetServerSideProps } from "next";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

//Image Files
import BgSvg from "@/Assets/login-bg.svg";

//Components
import Form from "@/Components/Login/Form";
import Verify from "@/Components/Login/Verify";

//Context
import { LoginContext } from "@/Context/login-context";

const Login = () => {
    //Initialize Hook
    const router = useRouter();
    //State
    const [verify, setVerify] = useState<boolean>(router.query.verify === "true" ? true : false);
    return (
        <div className="xxl:container xxl:mx-auto">
            <div className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-8">
                    <Image src={BgSvg} alt="background-vector" style={{ width: "100%", height: "100vh", objectFit: "cover", objectPosition: "center" }} priority />
                </div>
                <div className="col-span-4">
                    <LoginContext.Provider value={{ verify, setVerify }}>
                        {verify ? (<Verify />) : (<Form />)}
                    </LoginContext.Provider>
                </div>
            </div>
        </div>
    );
};
export default Login;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {}
    }
}