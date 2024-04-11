import DropDown from "@/app/components/DropDown";
import Image from 'next/image';
import { userList } from '@/services/Requests';
import { useState, useEffect } from 'react';

const Users = () => {

    const [requestStatus, setRequestStatus] = useState({
        error: null,
        loading: true,
        response: null
    });

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
                error: "Something is wrong !",
                loading: false,
                response: null
            })
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="flex flex-col w-1/4 bg-secondary_dark rounded-lg p-3 gap-3">
            {requestStatus.loading &&
                <div className='flex justify-center items-center h-full'>
                    <div className="w-12 h-12 rounded-full animate-spin
                    border-y border-solid border-yellow-500 border-t-transparent shadow-md"></div>
                </div>
            }
            {requestStatus.response && requestStatus.response.map((value, index) => {
                return (<DropDown name={value.name} heroList={value.heroList} leader={value.leader} />)
            })}
            {requestStatus.error && <div className='flex justify-center items-center h-full'>{requestStatus.error}</div>}

        </div>
    );
};

export default Users;