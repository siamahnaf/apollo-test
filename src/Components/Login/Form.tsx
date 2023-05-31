import { ChangeEvent, useContext, useEffect } from "react";
import Image from "next/image";
import { Input, Button } from "@material-tailwind/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import nextBase64 from "next-base64";

//Logo
import Logo from "@/Assets/logo.png";

//Context
import { LoginContext } from "@/Context/login-context";

//Apollo Client
import { useMutation } from "@apollo/client";
import { USER_LOGIN } from "@/Apollo/Query/user.query";
import { UserLoginData } from "@/Apollo/Types/user.types";

//Types
interface Inputs {
    phone: string;
}

const Form = () => {
    //Apollo Hook

    const [login, { data, loading }] = useMutation<UserLoginData>(USER_LOGIN);

    //Initialize Hook
    const router = useRouter();

    //Context
    const { setVerify } = useContext(LoginContext);

    //Form
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm<Inputs>({
        defaultValues: {
            phone: "+880 " + nextBase64.decode(router.query.token as string || "")
        }
    })

    //Submit Handler
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        login({ variables: { loginInput: { phone: value.phone.replace(/(^|\s)0+(?=\d)/g, "$1").replace(/[\s+]/g, "") } } });
    }

    //Lifecycle Hook
    useEffect(() => {
        if (data?.login.success) {
            setVerify(true)
            router.push(`/login?verify=true&token=${nextBase64.encode(getValues("phone").substring(5))}`)
        }
    }, [data])
    return (
        <div className="px-[10%] text-center">
            <Image src={Logo} alt="logo" width={120} height={89} className="inline" />
            <h5 className="text-xl font-bold mt-[1.5em] mb-2.5">
                SIGNIN TO E-CAMPUS
            </h5>
            <p className="opacity-40 mb-[3em] text-sm">
                Please enter your phone number
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label="Phone Number"
                    size="lg"
                    className="rounded-lg"
                    color="green"
                    onInput={(e: ChangeEvent<HTMLInputElement>) => {
                        const formatted = e.target.value.trim()
                            .replace(/[^0-9+]/g, "")
                            .replace(/^(\+?88?)?0?/, "+880 ")
                            .replace(/(\d{6})(?=\d)/g, "$1 ");
                        e.target.value = formatted
                    }}
                    shrink={errors.phone ? false : true}
                    error={errors.phone ? true : false}
                    {...register("phone", {
                        required: true,
                        minLength: 11
                    })}
                />
                <Button className="bg-main text-white text-[15px] font-medium py-2.5 rounded-lg mt-5 relative" fullWidth color="green" defaultValue="John Doe" type="submit">
                    {loading ? "PLEASE WAIT..." : "NEXT"}
                    {loading &&
                        <div className="absolute top-2/4 right-4 -translate-y-2/4">
                            <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                        </div>
                    }
                </Button>
            </form>
        </div>
    );
};

export default Form;