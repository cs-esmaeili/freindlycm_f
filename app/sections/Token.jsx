import Image from 'next/image';
import { useState, useEffect } from 'react';
import { tokenPriceList as RtokenPriceList } from '@/services/Requests'

const Token = () => {

    const [requestStatus, setRequestStatus] = useState({
        error: null,
        loading: true,
        response: null
    });

    const tokenPriceList = async () => {
        try {
            const { data } = await RtokenPriceList();
            setRequestStatus({
                error: null,
                loading: false,
                response: data
            })
            console.log(data);
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
        tokenPriceList();
    }, []);


    return (
        <div className="flex flex-col  grow bg-primary rounded-lg p-3 gap-3 overflow-auto">
            {requestStatus.loading &&
                <div className='flex justify-center items-center h-full'>
                    <div class="w-12 h-12 rounded-full animate-spin
                    border-y border-solid border-yellow-500 border-t-transparent shadow-md"></div>
                </div>
            }
            {requestStatus.error && <div className='flex justify-center items-center h-full'>{requestStatus.error}</div>}
            {requestStatus.response &&
                <>
                    {requestStatus.response.reverse().map((value, index) => {
                        return (
                            <div className='flex bg-secondary p-3 rounded-md items-center'>
                                <div className={`w-1/4 ${(value.change) ? "text-green-400" : "text-red-400" }`}>{value.token} K</div>
                                <div className='flex w-2/4 justify-center'>{value.createdAt}</div>
                                <div className='flex w-1/4 justify-end ' onClick={() => {
                                }}>
                                    <Image
                                        className='bg-primary rounded-full p-1'
                                        src={(value.change) ? "/arrow-down.png" : "/arrow-up.png"}
                                        alt="icon"
                                        width={40}
                                        height={40}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </>
            }
        </div>
    );
};

export default Token;