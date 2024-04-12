'use client'

import VideoJS from "@/app/components/videoPlayer";
import Token from "./sections/Token";
import DiscAndLogo from "./sections/DiscAndLogo";
import Users from "./sections/Users";
import Gps from "./sections/Gps";
import { useState } from "react";
import Password from "./components/Password";
import { BsAspectRatio } from "react-icons/bs";


export default function Home({ editMode }) {

  const [updateUsers, setUpdateUsers] = useState(false);
  const [updateGps, setUpdateGps] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(true);

  if (passwordCheck) {
    return (
      <div className="flex relative w-full h-screen max-w-full max-h-full overflow-hidden">

        <div className="absolute top-0 w-full h-full -z-10 bottom-0 flex justify-center items-center">
          <div className="relative  h-screen">
            <VideoJS
              className="object-fill"
              options={{
                autoplay: true,
                controls: false,
                muted: true,
                loop: true,
                sources: [
                  {
                    src: '/back.mp4',
                    type: "video/mp4",
                  },
                ],
              }}
            />
          </div>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap overflow-y-auto lg:!overflow-hidden w-full p-5 z-20 gap-3 h-screen max-h-screen min-w-0 min-h-0">

          <div className="flex flex-col w-full lg:w-1/4 gap-3">
            <DiscAndLogo editMode={editMode} />
            <Token />
          </div>

          <Gps editMode={editMode} update={updateGps} setUpdate={() => setUpdateUsers(!updateUsers)} />
          <Users editMode={editMode} update={updateUsers} setUpdate={() => setUpdateGps(!updateGps)} />
        </div>
      </div>
    );
  } else {
    return (
      <Password setPasswordCheck={setPasswordCheck} />
    )
  }
}
