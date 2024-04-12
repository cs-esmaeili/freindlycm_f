import Image from 'next/image';
import { useState, useEffect } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import DeleteUser from './DeleteUser';
import { FiEdit } from "react-icons/fi";
import UserUpdate from './UserUpdate';
import DeleteHero from './DeleteHero';
import AddHero from './AddHero';

const DropDown = ({ updateList, user, editMode, name, heroList, leader }) => {

    const [open, setOpen] = useState(false);
    const [inFarmNumber, setInFarmNumber] = useState(null);

    const [userEditMode, setUserEditMode] = useState(false);

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
            <div className='flex w-full justify-between'>
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
                {editMode && <DeleteUser updateList={updateList} user_id={user._id} />}
                {editMode && <div className="ml-3 bg-primary rounded-full p-2" onClick={() => {
                    setUserEditMode(true);
                }}>
                    <FiEdit className="text-lg text-blue-500" />
                </div>}

            </div>

            {editMode && userEditMode &&
                <UserUpdate updateList={updateList} setUserEditMode={setUserEditMode} Ename={name} Eleader={leader} userEditMode user_id={user._id} />
            }

            <div className={`flex-col w-full ${heroList && "gap-3"} hidden ${open && "!flex"}`} >
                {heroList && heroList.map((value, index) => {
                    return (
                        <div draggable onDragStart={(e) => {
                            e.dataTransfer.setData("text/plain", value._id);
                        }}
                         className={`flex bg-secondary p-2 rounded-md justify-between items-center w-full h-fit ${value.inFarm && "!bg-green-600"}`}>
                            <div className="flex items-center gap-2 w-fit">
                                {value.name}
                            </div>
                            <div className="w-fit flex flex-wrap h-fit justify-end items-center gap-2">
                                <div className='flex h-fit min-w-[35px] gap-2'>
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
                                {editMode &&
                                    <div>
                                        <DeleteHero updateList={updateList} user_id={user._id} hero_id={value._id} />
                                    </div>
                                }

                            </div>
                        </div>
                    )
                })}
                {editMode &&
                    <AddHero user_id={user._id} updateList={updateList} />
                }
            </div>
        </div>
    );
};

export default DropDown;