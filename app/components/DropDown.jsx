import Image from 'next/image';
import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const DropDown = ({ name, heroList }) => {

    const [open, setOpen] = useState(false);

    return (
        <div className='flex flex-col items-center bg-secondary p-3 rounded-md gap-3 hover:border-2'>
            <div className='flex w-full justify-between' onClick={() => {
                console.log("dadsa");
                setOpen(!open);
            }}>
                <div>{name}</div>
                <div className='flex items-center'>
                    <span>3</span>
                    {open ?
                        <IoIosArrowUp className='ml-5' />
                        :
                        <IoIosArrowDown className='ml-5' />
                    }
                </div>

            </div>
            <div className={`flex-col w-full ${heroList && "gap-3"} hidden ${open && "!flex"}`}>
                {heroList && heroList.map((value, index) => {
                    console.log(value.class.name);
                    return (
                        <div className="flex bg-secondary p-2 rounded-md items-center w-full">
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