import { IoIosArrowDown } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { addUser, updateUser } from '@/services/Requests';

const UserUpdate = ({ updateList, setInsertMode, setUserEditMode, userEditMode, user_id, Ename, Eleader }) => {

    const [leader, setLeader] = useState(3);
    const ref = useRef(null);


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
            let request = null;
            if (userEditMode) {
                request = await updateUser({ user_id, leader, name: ref.current.innerText });
            } else {
                request = await addUser({ leader, name: ref.current.innerText });
            }
            const { data } = request;
            setRequestStatus({
                error: null,
                loading: false,
                response: data
            });
            setTimeout(() => {
                setLeader(3);
                if (!userEditMode) {
                    setInsertMode(false);
                } else {
                    updateList();
                }
                setRequestStatus({
                    error: null,
                    loading: false,
                    response: null
                });
                if (userEditMode)
                    setUserEditMode(false);
            }, 2000);

        } catch (error) {
            console.log(error);
            setRequestStatus({
                error: (error?.response?.data?.message) ? (error?.response?.data?.message) : "Something is wrong !",
                loading: false,
                response: null
            })

            setTimeout(() => {
                setLeader(3);
                if (!userEditMode) {
                    setInsertMode(false);
                } else {
                    updateList();
                }
                setRequestStatus({
                    error: null,
                    loading: false,
                    response: null
                });
                if (userEditMode)
                    setUserEditMode(false);
            }, 2000);
        }
    }

    useEffect(() => {
        if (userEditMode) {
            setLeader(Eleader);
        }
    }, [userEditMode]);

    return (
        <div className='flex flex-col items-center border-2 border-green-500 border-dashed p-3 rounded-md gap-3 hover:border-2'>
            {requestStatus.loading &&
                <div className='flex justify-center items-center h-full'>
                    <div className="w-12 h-12 rounded-full animate-spin
                border-y border-solid border-yellow-500 border-t-transparent shadow-md"></div>
                </div>
            }
            {requestStatus.error && <div className='flex justify-center items-center h-full'>{requestStatus.error}</div>}
            {requestStatus.response && <div className='flex justify-center items-center h-full'>{requestStatus.response.message}</div>}
            {!requestStatus.error && !requestStatus.response && !requestStatus.loading &&
                <div className='flex w-full justify-between items-center' onClick={() => {
                }}>
                    <div className='flex flex-col gap-2 items-center'>
                        <div className='flex  gap-2 items-center'>
                            <div ref={ref} contentEditable autoFocus={true} suppressContentEditableWarning={true} >{(userEditMode) ? Ename : "Name"}</div>
                        </div>
                        <div className='flex  gap-2 items-center'>
                            <div className="flex gap-3">

                                <label className="flex gap-1 items-center">
                                    <input type="radio" name="leader" value="small" checked={leader === 1} onChange={() => {
                                        setLeader(1);
                                    }} />
                                    <Image
                                        src={"/leader.png"}
                                        alt="icon"
                                        width={35}
                                        height={35}
                                    />
                                </label>
                                <label className="flex gap-1 items-center">
                                    <input type="radio" name="leader" value="medium" checked={leader === 2} onChange={() => {
                                        setLeader(2);
                                    }} />
                                    <Image
                                        src={"/coleader.png"}
                                        alt="icon"
                                        width={35}
                                        height={35}
                                    />
                                </label>
                                <label className="flex gap-1 items-center">
                                    <input type="radio" name="leader" value="large" checked={leader === 3} onChange={() => {
                                        setLeader(3);
                                    }} />
                                    <RxAvatar className="text-3xl" />
                                </label>


                            </div>
                        </div>


                    </div>
                    <div className="flex gap-2 mx-2 h-fit items-center justify-center" >
                        <button className="text-red-300 bg-secondary rounded-md p-2" onClick={() => {
                            if (userEditMode) {
                                setUserEditMode(false);
                            } else {
                                setInsertMode(false);
                            }
                        }}>cancel</button>
                        <button className="text-green-300 bg-secondary rounded-md p-2" onClick={() => {
                            sendData();
                        }}>Done</button>
                    </div>
                    <div className='flex items-center'>
                        <span>0</span>
                        <IoIosArrowDown className='ml-5' />
                    </div>

                </div>
            }
        </div >
    );
};

export default UserUpdate;