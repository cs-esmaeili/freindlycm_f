import Image from 'next/image';
import { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import Config from "@/config.json";
import { notifyUser } from '@/app/utils/notification';


const Token = () => {

    let socket = null;
    
    const [requestStatus, setRequestStatus] = useState({
        error: null,
        loading: true,
        response: null
    });

    const [lastPrice, setLastPrice] = useState(null);


    useEffect(() => {
        if (requestStatus.response != null) {

            const lastPriceServer = requestStatus.response[0];
            console.log("server = " + lastPriceServer.token);

            if (lastPriceServer.change && (lastPrice != null && (lastPriceServer.token != lastPrice.token))) {
                notifyUser(Config.app_name, lastPriceServer.token + " K");
            }
            setLastPrice(lastPriceServer);

        }
    }, [requestStatus.response]);


    useEffect(() => {
        socket = io(Config.api);
        socket.on("wowToken", (payload) => {
            setRequestStatus({
                error: null,
                loading: false,
                response: payload
            });
        });

        const handleErrors = (error) => {
            console.log(error);
            setRequestStatus({
                error: "Service is offline ...",
                loading: false,
                response: null
            })
        }

        socket.on('connect_error', err => handleErrors(err))
        socket.on('connect_failed', err => handleErrors(err))
        socket.on('disconnect', err => handleErrors(err))
    }, []);


    return (
        <div className="flex flex-col  grow bg-primary rounded-lg p-3 gap-3 overflow-auto">
            {requestStatus.loading &&
                <div className='flex justify-center items-center h-full'>
                    <div className="w-12 h-12 rounded-full animate-spin
                    border-y border-solid border-yellow-500 border-t-transparent shadow-md"></div>
                </div>
            }
            {requestStatus.error && <div className='flex justify-center items-center h-full'>{requestStatus.error}</div>}
            {requestStatus.response &&
                <>
                    {requestStatus.response.map((value, index) => {
                        return (
                            <div className='flex bg-secondary p-3 rounded-md items-center'>
                                <div className={`w-1/4 ${(value.change) ? "text-green-400" : "text-red-400"}`}>{value.token} K</div>
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