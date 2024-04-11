import { useState, useEffect } from 'react';
import { classList } from '@/services/Requests';
import Image from 'next/image';

const ClassList = ({ setSelectClass, setClassList }) => {


    const [requestStatus, setRequestStatus] = useState({
        error: null,
        loading: false,
        response: null
    });

    const getData = async () => {
        try {
            setSelectClass(null);
            setRequestStatus({
                error: null,
                loading: true,
                response: null
            })
            setClassList(null);
            const { data } = await classList();
            setRequestStatus({
                error: null,
                loading: false,
                response: data
            })
            setClassList(data);
        } catch (error) {
            console.log(error);
            setRequestStatus({
                error: (error?.response?.data?.message) ? (error?.response?.data?.message) : "Something is wrong !",
                loading: false,
                response: null
            });
            setClassList(data);
        }
    }


    useEffect(() => {
        getData();
    }, []);

    return (
        <div className='flex flex-wrap w-full h-[200px] overflow-auto  mt-5 gap-3  justify-center'>
            {requestStatus.loading &&
                <div className='flex justify-center items-center h-full'>
                    <div className="w-12 h-12 rounded-full animate-spin
        border-y border-solid border-yellow-500 border-t-transparent shadow-md"></div>
                </div>
            }
            {requestStatus.error && <div className='flex justify-center items-center h-full text-nowrap'>{requestStatus.error}</div>}
            {requestStatus.response && requestStatus.response.map((value, index) => {
                return (
                    <div className='flex justify-center items-center hover:border-2' onClick={() => {
                        setSelectClass(index);
                    }}>
                        <Image
                            src={value.specIcon}
                            alt="icon"
                            width={50}
                            height={50}
                            className='min-w-[50px]'
                        />
                        <Image
                            src={value.classIcon}
                            alt="icon"
                            width={35}
                            height={35}
                            className='min-w-[50px]'
                        />
                    </div>
                )
            })
            }
        </div>
    );
};

export default ClassList;