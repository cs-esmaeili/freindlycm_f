import { LiaExchangeAltSolid } from "react-icons/lia";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { gpList } from '@/services/Requests';

const Gps = () => {


    const [requestStatus, setRequestStatus] = useState({
        error: null,
        loading: true,
        response: null
    });

    const getData = async () => {
        try {
            const { data } = await gpList();
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
        <div className="flex flex-col w-2/4 gap-2 overflow-auto">
            {requestStatus.response && requestStatus.response.map((row, index) =>
                <div className="flex w-full h-fit gap-2">
                    <div className={`flex flex-col w-2/4 bg-primary rounded-lg p-3 gap-2 ${row.col1.length == 0 && "!bg-transparent"}`}>
                        {row.col1.map((hero, index) =>
                            <div className="flex bg-secondary p-2 rounded-md items-center">
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
                    </div>
                    <div className={`flex w-1/12 items-center justify-center opacity-0 ${row.col1.length > 0 && row.col2.length > 0 && "!opacity-100"}`}>
                        <LiaExchangeAltSolid className="text-5xl bg-primary rounded-lg p-3" />
                    </div>
                    <div className={`flex flex-col w-2/4 bg-primary rounded-lg p-3 gap-2 ${row.col2.length == 0 && "!bg-transparent"}`}>
                        {row.col2.map((hero, index) =>
                            <div className="flex bg-secondary p-2 rounded-md items-center">
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
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gps;