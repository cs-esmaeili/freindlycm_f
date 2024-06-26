import DropDown from "@/app/components/DropDown";
import { GoPlus } from "react-icons/go";
import { userList } from '@/services/Requests';
import { useState, useEffect } from 'react';
import UserUpdate from "../components/UserUpdate";

const Users = ({ editMode, update, setUpdate }) => {

    const [requestStatus, setRequestStatus] = useState({
        error: null,
        loading: true,
        response: null
    });
    const [insertMode, setInsertMode] = useState(false);

    const getData = async () => {
        try {
            const { data } = await userList();
            setRequestStatus({
                error: null,
                loading: false,
                response: data
            })
        } catch (error) {
            console.log(error);
            setRequestStatus({
                error: (error?.response?.data?.message) ? (error?.response?.data?.message) : "Something is wrong !",
                loading: false,
                response: null
            })
        }
    }

    useEffect(() => {
        getData();
    }, [insertMode, update]);


    return (
        <div className="flex flex-col  w-full lg:w-1/4 bg-secondary_dark rounded-lg p-3 gap-3 overflow-auto">
            {requestStatus.loading &&
                <div className='flex justify-center items-center h-full'>
                    <div className="w-12 h-12 rounded-full animate-spin
                    border-y border-solid border-yellow-500 border-t-transparent shadow-lg"></div>
                </div>
            }
            {requestStatus.response && requestStatus.response.map((value, index) => {
                return (<DropDown updateList={getData} user={value} editMode={editMode} name={value.name} heroList={value.heroList} leader={value.leader} setUpdate={setUpdate} />)
            })}
            {requestStatus.error && <div className='flex justify-center items-center h-full'>{requestStatus.error}</div>}

            {editMode && insertMode && <UserUpdate setInsertMode={setInsertMode} setUpdate={setUpdate} />}

            {editMode &&
                <div className='flex flex-col items-center bg-secondary p-3 rounded-lg gap-3 hover:border-2' onClick={() => {
                    setInsertMode(true);
                }}>
                    <GoPlus className="text-xl" />
                </div>
            }

        </div>
    );
};

export default Users;