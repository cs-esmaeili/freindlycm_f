import { MdDelete } from "react-icons/md";
import { useState, useEffect, useRef } from 'react';
import { deleteHero } from '@/services/Requests';

const DeleteHero = ({ updateList, user_id, hero_id }) => {

    const [requestStatus, setRequestStatus] = useState({
        error: null,
        loading: false,
        response: null,
    });

    const sendData = async () => {

        try {
            setRequestStatus({
                error: null,
                loading: true,
                response: null
            });
            const { data } = await deleteHero({ user_id, hero_id });
            setRequestStatus({
                error: null,
                loading: false,
                response: data
            });
            setTimeout(() => {
                setRequestStatus({
                    error: null,
                    loading: false,
                    response: null
                });
                updateList();
            }, 2000);

        } catch (error) {
            setRequestStatus({
                error: (error?.response?.data?.message) ? (error?.response?.data?.message) : "Something is wrong !",
                loading: false,
                response: null
            })

            setTimeout(() => {
                setRequestStatus({
                    error: null,
                    loading: false,
                    response: null
                });
            }, 2000);
        }
    }

    useEffect(() => {
    }, []);

    return (
        <div className="ml-3 bg-primary rounded-full p-2" onClick={() => {
            sendData();
        }}>
            {requestStatus.loading &&
                <div className='flex justify-center items-center h-full'>
                    <div className="w-12 h-12 rounded-full animate-spin
                border-y border-solid border-yellow-500 border-t-transparent shadow-md"></div>
                </div>
            }
            {requestStatus.error && <div className='flex justify-center items-center h-full text-nowrap'>{requestStatus.error}</div>}
            {requestStatus.response && <div className='flex justify-center items-center h-full text-nowrap'>{requestStatus.response.message}</div>}
            {!requestStatus.error && !requestStatus.response && !requestStatus.loading &&
                <MdDelete className="text-xl text-red-500" />
            }
        </div>
    );
};

export default DeleteHero;