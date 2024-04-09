import Image from 'next/image';

const Token = () => {
    return (
        <div className="flex flex-col  grow bg-primary rounded-lg p-3 gap-3">

            <div className='flex bg-secondary p-3 rounded-md items-center'>
                <div className='w-1/4'>368k</div>
                <div className='flex w-2/4 justify-center'>1403/01/01 08:12</div>
                <div className='flex w-1/4 justify-end '>
                    <Image
                        src="/arrow-down.png"
                        alt="icon"
                        width={35}
                        height={35}
                    />
                </div>
            </div>

            <div className='flex bg-secondary p-3 rounded-md items-center'>
                <div className='w-1/4'>368k</div>
                <div className='flex w-2/4 justify-center'>1403/01/01 08:12</div>
                <div className='flex w-1/4 justify-end '>
                    <Image
                        src="/arrow-down.png"
                        alt="icon"
                        width={35}
                        height={35}
                    />
                </div>
            </div>

        </div>
    );
};

export default Token;