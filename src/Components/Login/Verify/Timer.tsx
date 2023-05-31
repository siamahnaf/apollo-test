import { useState, useEffect } from "react";
import { Otptimer } from "otp-timer-ts";
import { useRouter } from "next/router";
import nextBase64 from "next-base64";

//Notification
import { Notification } from "@/Components/Common/Notification";

//Fonts
import { inter } from "@/Fonts";

//Apollo Client
import { useMutation } from "@apollo/client";
import { RESEND_CODE } from "@/Apollo/Query/user.query";
import { ResendCodeData } from "@/Apollo/Types/user.types";

const Timer = () => {
    //Apollo hook
    const [resend, { error }] = useMutation<ResendCodeData>(RESEND_CODE);

    //Initialize Hook
    const router = useRouter();

    //State
    const [notification, setNotification] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    //Handle Resent Otp
    const handleResend = () => {
        const number = nextBase64.decode(router.query.token as string).replace(/^0+/, '')
        resend({ variables: { resendInput: { phone: "880" + number.replace(/(^|\s)0+(?=\d)/g, "$1").replace(/[\s+]/g, "") } } })
    }

    //Lifecycle Hook
    useEffect(() => {
        if (error) { setNotification(true) }
    }, [error])
    useEffect(() => {
        setMounted(true);
    }, [])
    return (
        <div className="">
            {error &&
                <Notification
                    open={notification}
                    handleClose={onNotification}
                    severity="error"
                >{error.message}</Notification>
            }
            {mounted &&
                <Otptimer
                    minutes={0}
                    seconds={60}
                    onResend={handleResend}
                    text="Resend code in"
                    buttonText="Resend code"
                    buttonStyle={{
                        fontSize: "16px",
                        color: "#00AB55",
                        fontFamily: inter.style.fontFamily,
                        fontWeight: 500
                    }}
                    textContainerStyle={{
                        fontSize: "15px",
                        opacity: 0.8,
                        fontFamily: inter.style.fontFamily
                    }}
                />
            }
        </div>

    );
};

export default Timer;