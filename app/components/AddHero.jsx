import { useState, useRef } from 'react';
import { addHero } from '@/services/Requests';
import Image from 'next/image';
import ClassList from './ClassList';

const AddHero = ({ user_id, updateList }) => {


    const [requestStatus, setRequestStatus] = useState({
        error: null,
        loading: false,
        response: null
    });

    const ref = useRef(null);

    const [selectClass, setSelectClass] = useState(null);
    const [classList, setClassList] = useState(null);


    const sendData = async () => {
        try {
            setRequestStatus({
                error: null,
                loading: true,
                response: null
            })
            const { data } = await addHero({ name: ref.current.innerText, class_id: classList[selectClass]._id, user_id });
            setRequestStatus({
                error: null,
                loading: false,
                response: data
            })
            updateList();

            setTimeout(() => {
                setRequestStatus({
                    error: null,
                    loading: false,
                    response: null
                })
            }, 1500);

        } catch (error) {
            console.log(error);
            setSelectClass(null);
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
                })
            }, 1500);
        }
    }
    return (
        <div className="flex flex-col p-2  rounded-md bg-secondary">
            {requestStatus.loading &&
                <div className='flex justify-center items-center h-full'>
                    <div className="w-12 h-12 rounded-full animate-spin
        border-y border-solid border-yellow-500 border-t-transparent shadow-md"></div>
                </div>
            }
            {requestStatus.error && <div className='flex justify-center items-center h-full text-nowrap'>{requestStatus.error}</div>}
            {requestStatus.response && <div className='flex justify-center items-center h-full text-nowrap'>{requestStatus.response.message}</div>}
            {!requestStatus.error && !requestStatus.loading && !requestStatus.response &&
                <>

                    <div className='flex items-center w-full'>
                        <div className="flex items-center gap-2 w-1/3" ref={ref} contentEditable autoFocus={true} suppressContentEditableWarning={true}>
                            +
                        </div>
                        <div className="w-1/3 flex justify-end gap-2">
                            {selectClass != null && classList &&
                                <>
                                    <Image
                                        src={classList[selectClass].specIcon}
                                        alt="icon"
                                        width={50}
                                        height={50}
                                        className='min-w-[50px]'
                                    />
                                    <Image
                                        src={classList[selectClass].classIcon}
                                        alt="icon"
                                        width={35}
                                        height={35}
                                        className='min-w-[50px]'
                                    />
                                </>
                            }
                        </div>
                        <div className="w-1/3 flex justify-end gap-2">
                            <button className='bg-primary rounded-md p-2 text-red-500' onClick={() => {
                                ref.current.innerText = "+";
                                setSelectClass(null);
                            }}>Reset</button>
                            <button className='bg-primary rounded-md p-2 text-green-500' onClick={() => {
                                sendData();
                            }}>Add</button>
                        </div>
                    </div>
                    <ClassList setSelectClass={setSelectClass} setClassList={setClassList} />
                </>
            }
        </div>
    );
};

export default AddHero;