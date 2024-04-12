import Image from 'next/image';
import VideoJS from "@/app/components/videoPlayer";
import { usePathname } from 'next/navigation'


const Password = ({ setPasswordCheck }) => {

    const PasswordUser = "1";
    const PasswordAdmin = "2";
    const pathname = usePathname()

    return (
        <div className='bg-primary relative w-full h-screen justify-center items-center flex flex-col gap-3 overflow-hidden'>
            <div className="absolute top-0 w-full h-full -z-10">
                <VideoJS
                    options={{
                        autoplay: true,
                        controls: false,
                        responsive: true,
                        muted: true,
                        loop: true,
                        fluid: true,
                        sources: [
                            {
                                src: '/back.mp4',
                                type: "video/mp4",
                            },
                        ],
                    }}
                />
            </div>
            <div className="relative w-[110px] h-[110px]">
                <Image
                    src="/logo.png"
                    alt="icon"
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div>
                <input
                    className='bg-primary rounded-lg p-3 text-center'
                    type="password"
                    placeholder='Password'
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            if (pathname == "/edit" && e.target.value == PasswordAdmin) {
                                setPasswordCheck(true);
                            }
                            if (pathname == "/" && e.target.value == PasswordUser) {
                                setPasswordCheck(true);
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default Password;