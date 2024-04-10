import Image from 'next/image';
import { getGeneralData } from '@/services/Requests';
import { useState, useEffect } from 'react';

const DiscAndLogo = () => {

    const [requestStatus, setRequestStatus] = useState({
        error: null,
        loading: true,
        response: null
    });

    const getData = async () => {
        try {
            const { data } = await getGeneralData();
            console.log(data);
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
        <>

            <div className="flex flex-col h-fit p-5 gap-6 bg-primary justify-evenly items-center rounded-lg">
                <div className="relative w-[110px] h-[110px]">
                    <Image
                        src="/logo.png"
                        alt="icon"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div>
                    {requestStatus.loading &&
                        <div className='flex justify-center items-center h-full'>
                            <div className="w-12 h-12 rounded-full animate-spin
                    border-y border-solid border-yellow-500 border-t-transparent shadow-md"></div>
                        </div>
                    }
                    {requestStatus.response && <span className='ltr text-justify'>{requestStatus.response.text[0]}</span>}
                    {requestStatus.error && <span>{requestStatus.error}</span>}
                </div>
            </div>
            <div className="flex flex-col h-1/3 p-5 gap-3 bg-primary justify-evenly items-center rounded-lg overflow-auto">
                {requestStatus.loading &&
                    <div className='flex justify-center items-center h-full'>
                        <div className="w-12 h-12 rounded-full animate-spin
                    border-y border-solid border-yellow-500 border-t-transparent shadow-md"></div>
                    </div>
                }
                {requestStatus.response && <span className='ltr text-justify'>{requestStatus.response.text[1]}</span>}
                {requestStatus.error && <div className='flex justify-center items-center h-full'>{requestStatus.error}</div>}
            </div >
        </>
    );
};

export default DiscAndLogo;