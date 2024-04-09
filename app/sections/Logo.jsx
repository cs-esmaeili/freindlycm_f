import Image from 'next/image';

const Logo = () => {
    return (
        <div className="flex flex-col h-fit p-5 gap-6 bg-primary justify-evenly items-center rounded-lg">
            <div className="relative w-[110px] h-[110px]">
                <Image
                    src="/logo.png"
                    alt="icon"
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div>
                <span>
                    گروه بندی فارم تاریخ :
                </span>
                <span>
                    1400/12/01
                </span>
            </div>
        </div>
    );
};

export default Logo;