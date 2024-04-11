'use client'

import VideoJS from "@/app/components/videoPlayer";
import Token from "./sections/Token";
import DiscAndLogo from "./sections/DiscAndLogo";
import Users from "./sections/Users";
import Gps from "./sections/Gps";


export default function Home() {
  return (
    <div className="flex relative w-full h-screen max-w-full max-h-full overflow-hidden">

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

      <div className="flex w-full p-5 z-20 gap-3 h-screen max-h-screen min-w-0 min-h-0">

        <div className="flex flex-col w-1/4 gap-3">
          <DiscAndLogo />
          <Token />
        </div>
        <Gps />
        <Users />
      </div>
    </div>
  );
}
