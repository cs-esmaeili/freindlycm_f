import { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { addHeroToGp } from "@/services/Requests";


const AddHeroToGp = ({ gp_id, colNumber, update }) => {



    const [requestStatus, setRequestStatus] = useState({
        error: null,
        loading: false,
        response: null
    });


    const sendData = async (hero_id) => {
        try {
            setRequestStatus({
                error: null,
                loading: true,
                response: null
            })
            const { data } = await addHeroToGp({ gp_id, colNumber, hero_id });
            setRequestStatus({
                error: null,
                loading: false,
                response: null
            })
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
                })
            }, 1500);
        }
    }


    return (
        <>
            {requestStatus.loading &&
                <div className='flex justify-center items-center h-full'>
                    <div className="w-12 h-12 rounded-full animate-spin
                border-y border-solid border-yellow-500 border-t-transparent shadow-md"></div>
                </div>
            }
            {requestStatus.error && <div className='flex justify-center items-center h-full text-nowrap'>{requestStatus.error}</div>}
            {!requestStatus.error && !requestStatus.response && !requestStatus.loading &&
                <div className='flex p-3 border-2 rounded-lg border-dashed justify-center text-green-300 border-green-300'
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault();
                        const hero_id = e.dataTransfer.getData("text/plain");
                        sendData(hero_id);
                    }}>
                    Add Hero
                </div>
            }
        </>
    );
};

export default AddHeroToGp;