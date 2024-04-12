import { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { addGp } from "@/services/Requests";

const AddGp = ({ update }) => {

    const [requestStatus, setRequestStatus] = useState({
        error: null,
        loading: false,
        response: null
    });


    const sendData = async (col1, col2) => {
        try {
            setRequestStatus({
                error: null,
                loading: true,
                response: null
            })
            const { data } = await addGp({ col1, col2 });
            setRequestStatus({
                error: null,
                loading: false,
                response: data
            })

            setTimeout(() => {
                setRequestStatus({
                    error: null,
                    loading: false,
                    response: null
                })
            }, 1500);
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
        <div className="flex w-full h-fit gap-2">
            <div className={`flex flex-col w-full  rounded-lg p-3 justify-center items-center`} onClick={() => {
                sendData([], []);
            }}>
                <div className=" bg-primary rounded-lg p-3 w-fit h-fit">
                    <BsPlusLg className="text-3xl" />
                </div>
            </div>
        </div>
    );
};

export default AddGp;