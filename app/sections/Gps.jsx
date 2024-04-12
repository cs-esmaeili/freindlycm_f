import { LiaExchangeAltSolid } from "react-icons/lia";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { gpList } from '@/services/Requests';
import AddGp from "../components/AddGp";
import DeleteGp from "../components/DeleteGp";
import AddHeroToGp from "../components/AddHeroToGp";
import DeleteHeroFromGp from "../components/DeleteHeroFromGp";

const Gps = ({ editMode, update, setUpdate }) => {


    const [requestStatus, setRequestStatus] = useState({
        error: null,
        loading: true,
        response: null
    });

    const getData = async () => {
        try {
            const { data } = await gpList();
            console.log(data);
            setRequestStatus({
                error: null,
                loading: false,
                response: data
            });
            setUpdate();
        } catch (error) {
            console.log(error);
            setRequestStatus({
                error: (error?.response?.data?.message) ? (error?.response?.data?.message) : "Something is wrong !",
                loading: false,
                response: null
            })
        }
    }

    useEffect(() => {
        getData();
    }, [update]);

    const colVisibility = (col) => {
        if (!col)
            return false;

        if (col.length == 0 && !editMode) {
            return false;
        }
        return true;
    }
    return (
        <div className="flex flex-col w-2/4 gap-2 overflow-auto">
            {requestStatus.response && requestStatus.response.map((row, index) =>
                <div className="flex w-full h-fit gap-2">
                    <div className={`flex flex-col w-2/4 bg-transparent rounded-lg p-3 gap-2 ${colVisibility(row.col1) && "!bg-primary"}`}>
                        {row.col1 && row.col1.map((hero, index) =>
                            <div className="flex bg-secondary p-2 rounded-md items-center" draggable onDragStart={(e) => {
                                e.dataTransfer.setData("text/plain", hero._id);
                            }}>
                                <div className="flex items-center gap-2 w-2/3">
                                    {(hero.user.leader == 1 || hero.user.leader == 2) &&
                                        <div>
                                            <Image
                                                src={(hero.user.leader == 1) ? "/leader.png" : "/coleader.png"}
                                                alt="icon"
                                                width={35}
                                                height={35}
                                            />
                                        </div>
                                    }
                                    <span>{hero.name}</span>
                                </div>
                                <div className="w-1/3 flex justify-end gap-2">
                                    <Image
                                        src={hero.class.specIcon}
                                        alt="icon"
                                        width={35}
                                        height={35}
                                    />
                                    <Image
                                        src={hero.class.classIcon}
                                        alt="icon"
                                        width={35}
                                        height={35}
                                    />
                                </div>
                            </div>
                        )}
                        {editMode && colVisibility(row.col1) &&
                            <div className="mt-auto flex gap-3 flex-col">
                                <DeleteHeroFromGp gp_id={row._id} colNumber={1} update={getData} />
                                <AddHeroToGp gp_id={row._id} colNumber={1} update={getData} />
                                <DeleteGp gp_id={row._id} colNumber={1} update={getData} />
                            </div>
                        }
                    </div>
                    <div className={`flex w-1/12 items-center justify-center opacity-0 ${(((row.col1 && row.col1.length > 0) && (row.col2 && row.col2.length > 0)) || (editMode && (colVisibility(row.col1) && colVisibility(row.col2)))) && "!opacity-100"}`}>
                        <LiaExchangeAltSolid className="text-5xl bg-primary rounded-lg p-3" />
                    </div>
                    <div className={`flex flex-col w-2/4 bg-transparent rounded-lg p-3 gap-2 ${colVisibility(row.col2) && "!bg-primary"}`}>
                        {row.col2 && row.col2.map((hero, index) =>
                            <div className="flex bg-secondary p-2 rounded-md items-center" draggable onDragStart={(e) => {
                                e.dataTransfer.setData("text/plain", hero._id);
                            }}>
                                <div className="flex items-center gap-2 w-2/3">
                                    {(hero.user.leader == 1 || hero.user.leader == 2) &&
                                        <div>
                                            <Image
                                                src={(hero.user.leader == 1) ? "/leader.png" : "/coleader.png"}
                                                alt="icon"
                                                width={35}
                                                height={35}
                                            />
                                        </div>
                                    }
                                    <span>{hero.name}</span>
                                </div>
                                <div className="w-1/3 flex justify-end gap-2">
                                    <Image
                                        src={hero.class.specIcon}
                                        alt="icon"
                                        width={35}
                                        height={35}
                                    />
                                    <Image
                                        src={hero.class.classIcon}
                                        alt="icon"
                                        width={35}
                                        height={35}
                                    />
                                </div>
                            </div>
                        )}
                        {editMode && colVisibility(row.col2) &&
                            <div className="mt-auto flex gap-3 flex-col">
                                <DeleteHeroFromGp gp_id={row._id} colNumber={2} update={getData} />
                                <AddHeroToGp gp_id={row._id} colNumber={2} update={getData} />
                                <DeleteGp gp_id={row._id} colNumber={2} update={getData} />
                            </div>
                        }
                    </div>
                </div>
            )}
            {editMode &&
                <AddGp update={getData} />
            }
        </div>
    );
};

export default Gps;