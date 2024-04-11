import Image from 'next/image';
import { useState, useEffect } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const DropDown = ({ name, heroList, leader }) => {

    const [open, setOpen] = useState(false);
    const [inFarmNumber, setInFarmNumber] = useState(null);

    useEffect(() => {
        let localInFarm = 0;
        for (let index = 0; index < heroList.length; index++) {
            if (heroList[index].inFarm) {
                localInFarm++;
            }
        }
        setInFarmNumber(localInFarm);
    }, [heroList]);

    return (
        <div className='flex flex-col items-center bg-secondary p-3 rounded-md gap-3 hover:border-2'>
            <div className='flex w-full justify-between' onClick={() => {
                setOpen(!open);
            }}>
                <div className='flex gap-2 items-center'>
                    <div>{name}</div>
                    {(leader == 1 || leader == 2) &&
                        <div>
                            <Image
                                src={(leader == 1) ? "/leader.png" : "/coleader.png"}
                                alt="icon"
                                width={35}
                                height={35}
                            />
                        </div>
                    }
                </div>
                <div className='flex items-center'>
                    {inFarmNumber &&
                        <span>{inFarmNumber}</span>
                    }
                    {open ?
                        <IoIosArrowUp className='ml-5' />
                        :
                        <IoIosArrowDown className='ml-5' />
                    }
                </div>

            </div>
            <div className={`flex-col w-full ${heroList && "gap-3"} hidden ${open && "!flex"}`}>
                {heroList && heroList.map((value, index) => {
                    return (
                        <div className={`flex bg-secondary p-2 rounded-md items-center w-full ${value.inFarm && "bg-green-600"}`}>
                            <div className="flex items-center gap-2 w-2/3">
                                {value.name}
                            </div>
                            <div className="w-1/3 flex justify-end gap-2">
                                <Image
                                    src={value.class.specIcon}
                                    alt="icon"
                                    width={35}
                                    height={35}
                                />
                                <Image
                                    src={value.class.classIcon}
                                    alt="icon"
                                    width={35}
                                    height={35}
                                />
                            </div>
                        </div>
                    )
                })}


            </div>
        </div>
    );
};

export default DropDown;