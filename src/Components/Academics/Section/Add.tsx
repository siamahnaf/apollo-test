import { useState, useEffect } from "react";
import { Input, Button } from "@material-tailwind/react";
import { useForm, SubmitHandler } from "react-hook-form";

//Components
import { Notification } from "@/Components/Common/Notification";

//Apollo
import { useMutation } from "@apollo/client";
import { ADD_SECTION, GET_SECTION_LIST } from "@/Apollo/Query/Academics/section.query";
import { AddSectionData } from "@/Apollo/Types/Academics/section.types";

//Interface
interface Inputs {
    section: string;
}

const Add = () => {
    //State
    const [notification, setNotification] = useState(false);

    //Apollo Hook
    const [addSection, { data, error, loading }] = useMutation<AddSectionData>(ADD_SECTION, {
        onCompleted: () => setNotification(true),
        refetchQueries: [{ query: GET_SECTION_LIST, variables: { searchInput: {} } }]
    });

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    //Form Initializing
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm<Inputs>();

    //Submit
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        addSection({ variables: { sectionInput: { name: value.section } } })
    }
    //Lifecycle Hook
    useEffect(() => {
        if (data?.addSection.success) {
            reset()
        }
    }, [error, data])
    return (
        <div className="mt-2">
            {(error || data) &&
                <Notification
                    open={notification}
                    handleClose={onNotification}
                    severity={error?.message ? "error" : "success"}
                >
                    {error?.message ?? data?.addSection.message}
                </Notification>
            }
            <p className="text-lg font-semibold">Add Section</p>
            <form onSubmit={handleSubmit(onSubmit)} className="w-96 p-5 border border-dashed border-textColor border-opacity-30 rounded-xl mt-5">
                <Input
                    variant="standard"
                    label="Section"
                    color="green"
                    className="!text-base"
                    error={errors.section ? true : false}
                    success
                    {...register("section", { required: true })}
                />
                <div className="mt-10 flex gap-2 items-center">
                    <div className="flex-1">
                        {loading &&
                            <div className="w-5 h-5 border-b-2 border-main rounded-full animate-spin ml-auto"></div>
                        }
                    </div>
                    <Button className="rounded-lg bg-main font-base py-2.5" type="submit" color="green">
                        Save Section
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Add;