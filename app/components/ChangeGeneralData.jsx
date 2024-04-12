import { setGeneralData } from '@/services/Requests';
import { useRef, useState } from 'react';


const ChangeGeneralData = ({ title, disc, editMode }) => {

    const [requestStatus, setRequestStatus] = useState({
        error: null,
        loading: false,
        response: null
    });
    const ref = useRef(null);
    const sendData = async () => {
        try {
            setRequestStatus({
                error: null,
                loading: true,
                response: false
            })
            const { data } = await setGeneralData({ title: (title ? ref.current.innerText : null), disc: (disc ? ref.current.innerText : null) });
            setRequestStatus({
                error: null,
                loading: false,
                response: data
            })
            setTimeout(() => {
                setRequestStatus({
                    error: null,
                    loading: null,
                    response: null
                })
            }, 1000);
        } catch (error) {
            setRequestStatus({
                error: (error?.response?.data?.message) ? (error?.response?.data?.message) : "Something is wrong !",
                loading: false,
                response: null
            })
            setTimeout(() => {
                setRequestStatus({
                    error: null,
                    loading: null,
                    response: null
                })
            }, 1000);
        }
    }


    return (
        <>
            <span className='ltr text-right' contentEditable ref={ref}>{title ? title : disc}</span>
            {requestStatus.loading &&
                <div className='flex justify-center items-center h-full'>
                    <div className="w-12 h-12 rounded-full animate-spin
                border-y border-solid border-yellow-500 border-t-transparent shadow-md"></div>
                </div>
            }
            {requestStatus.error && <div className='flex justify-center items-center h-full text-nowrap'>{requestStatus.error}</div>}
            {requestStatus.response && <div className='flex justify-center items-center h-full text-nowrap'>{requestStatus.response.message}</div>}
            {!requestStatus.error && !requestStatus.response && !requestStatus.loading && editMode &&
                <button className='ml-2 bg-blue-400 p-2 rounded-lg' onClick={() => {
                    sendData();
                }}>
                    Update
                </button>
            }
        </>
    );
};

export default ChangeGeneralData;