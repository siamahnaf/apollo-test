import { ChangeEvent } from "react";
import { Icon } from "@iconify/react";

//Apollo
import { useQuery } from "@apollo/client";
import { GET_SECTION_LIST } from "@/Apollo/Query/Academics/section.query";
import { GetSectionListData } from "@/Apollo/Types/Academics/section.types";

const ListsHeader = () => {
    //Apollo Hook
    const { fetchMore } = useQuery<GetSectionListData>(GET_SECTION_LIST, { variables: { searchInput: {} } });

    //OnChange Handler
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        fetchMore({
            variables: { searchInput: { search: e.target.value } }, updateQuery(_, { fetchMoreResult }) {
                return fetchMoreResult
            }
        })
    }
    return (
        <div className="mt-8">
            <div className="flex gap-8 items-center">
                <p className="text-base uppercase font-semibold">Section List</p>
                <div className="relative w-1/2">
                    <input
                        type="text"
                        placeholder="Search"
                        className="input w-full rounded-3xl input-sm bg-textColor bg-opacity-5 focus:outline-none pl-14 py-[18px]"
                        onChange={onChange}
                    />
                    <Icon icon="material-symbols:search" className="text-xl absolute top-2/4 left-6 -translate-y-2/4" />
                </div>
                <div className="flex-1 text-right">
                    <div className="bg-textColor bg-opacity-5 w-max ml-auto px-3 rounded-3xl flex">
                        <div className="tooltip" data-tip="Copy Document">
                            <button className="px-4 py-[9px] border-r border-neutral-200 border-solid">
                                <Icon icon="material-symbols:content-copy" className="text-xl" />
                            </button>
                        </div>
                        <div className="tooltip" data-tip="Export as Excel">
                            <button className="px-4 py-[9px] border-r border-neutral-200 border-solid">
                                <Icon icon="mdi:file-excel" className="text-xl" />
                            </button>
                        </div>
                        <div className="tooltip" data-tip="Export as PDF">
                            <button className="px-4 py-[9px] border-r border-neutral-200 border-solid">
                                <Icon icon="material-symbols:picture-as-pdf" className="text-xl" />
                            </button>
                        </div>
                        <div className="tooltip" data-tip="Print">
                            <button className="px-4 py-[9px]">
                                <Icon icon="material-symbols:print" className="text-xl" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListsHeader;