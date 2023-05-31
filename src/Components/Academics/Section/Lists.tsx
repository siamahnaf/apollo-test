import { useState } from "react";
import { Icon } from "@iconify/react";

//Components
import { Notification } from "@/Components/Common/Notification";

//Apollo
import { useQuery, useMutation } from "@apollo/client";
import { GET_SECTION_LIST, DELETE_SECTION_LIST } from "@/Apollo/Query/Academics/section.query";
import { GetSectionListData, DeleteSectionData } from "@/Apollo/Types/Academics/section.types";

const Lists = () => {
    //State
    const [notification, setNotification] = useState(false);

    //Apollo Hook
    const sectionsData = useQuery<GetSectionListData>(GET_SECTION_LIST, { variables: { searchInput: {} } });


    const [deleteSection, { data, error }] = useMutation<DeleteSectionData>(DELETE_SECTION_LIST, {
        onCompleted: () => setNotification(true),
        refetchQueries: [{ query: GET_SECTION_LIST, variables: { searchInput: {} } }]
    });

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    //On Delete Handler
    const onSectionDelete = (id: string) => {
        deleteSection({ variables: { deleteSectionId: id } })
    }
    return (
        <div className="mt-8 mb-8">
            {(error || data) &&
                <Notification
                    open={notification}
                    handleClose={onNotification}
                    severity={error?.message ? "error" : "success"}
                >
                    {error?.message ?? data?.deleteSection.message}
                </Notification>
            }
            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th className="bg-primary capitalize text-main font-medium">Section Name</th>
                            <th className="bg-primary capitalize text-main font-medium">Created By</th>
                            <th className="bg-primary capitalize text-main font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sectionsData.data?.getSections.map((item, i) => (
                            <tr key={i}>
                                <td>{item.name}</td>
                                <td>+{item.createdBy?.name || item.createdBy?.phone}</td>
                                <td className="flex gap-3">
                                    <div className="tooltip" data-tip="Edit">
                                        <button className="text-blue-600">
                                            <Icon icon="material-symbols:edit-document" className="text-xl" />
                                        </button>
                                    </div>
                                    <div className="tooltip" data-tip="Delete">
                                        <button className="text-red-500" onClick={() => onSectionDelete(item.id)}>
                                            <Icon icon="ic:round-delete" className="text-xl" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {sectionsData.data?.getSections.length === 0 &&
                            <tr>
                                <td colSpan={3} className="text-center text-main font-medium text-base py-4">
                                    There is no section created yet!
                                </td>
                            </tr>
                        }
                        {sectionsData.error &&
                            <tr>
                                <td colSpan={3} className="text-center text-main font-medium text-base py-4">
                                    {error?.message}
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Lists;