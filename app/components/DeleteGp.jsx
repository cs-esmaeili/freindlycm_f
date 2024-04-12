import { useState } from 'react';
import { deleteGp } from '@/services/Requests';

const DeleteGp = ({ gp_id, colNumber, update }) => {

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
            const { data } = await deleteGp({ gp_id, colNumber });
            setRequestStatus({
                error: null,
                loading: false,
                response: false
            });
            update();

        } catch (error) {
            console.log(error);
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


    return (
        <div className='flex p-3 bg-red-700 opacity-80 rounded-lg justify-center items-center hover:opacity-100' onClick={() => {
            sendData()
        }}>
            {requestStatus.loading &&
                <div className='flex justify-center items-center h-full'>
                    <div className="w-12 h-12 rounded-full animate-spin
                border-y border-solid border-yellow-500 border-t-transparent shadow-md"></div>
                </div>
            }
            {requestStatus.error && <div className='flex justify-center items-center h-full text-nowrap'>{requestStatus.error}</div>}
            {!requestStatus.error && !requestStatus.response && !requestStatus.loading &&
                <span>Delete Group</span>
            }

        </div>
    );
};

export default DeleteGp;