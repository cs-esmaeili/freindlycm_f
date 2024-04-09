'use client'

import VideoJS from "@/app/components/videoPlayer";
import Image from 'next/image';
import { LiaExchangeAltSolid } from "react-icons/lia";
import DropDown from "./components/DropDown";
import Logo from "./sections/logo";
import Disc from "./sections/Disc";
import Token from "./sections/Token";


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
          <Logo />
          <Disc />
          <Token />
        </div>

        <div className="flex flex-col w-2/4 gap-2 overflow-auto">

          <div className="flex w-full h-fit gap-2">
            <div className="flex flex-col w-2/4 bg-primary rounded-lg p-3 gap-2">
              {new Array(9).fill(null).map(() =>
                <div className="flex bg-secondary p-2 rounded-md items-center">
                  <div className="flex items-center gap-2 w-2/3">
                    <Image
                      src="/leader.png"
                      alt="icon"
                      width={35}
                      height={35}
                    />
                    salam
                  </div>
                  <div className="w-1/3 flex justify-end gap-2">
                    <Image
                      src="/spec/mage/frost.png"
                      alt="icon"
                      width={35}
                      height={35}
                    />
                    <Image
                      src="/class/mage.png"
                      alt="icon"
                      width={35}
                      height={35}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex w-1/12 items-center justify-center">
              <LiaExchangeAltSolid className="text-5xl bg-primary rounded-lg p-3" />
            </div>
            <div className="flex flex-col w-2/4 bg-primary rounded-lg p-3 gap-2">
              {new Array(9).fill(null).map(() =>
                <div className="flex bg-secondary p-2 rounded-md items-center">
                  <div className="flex items-center gap-2 w-2/3">
                    <Image
                      src="/leader.png"
                      alt="icon"
                      width={35}
                      height={35}
                    />
                    salam
                  </div>
                  <div className="w-1/3 flex justify-end gap-2">
                    <Image
                      src="/spec/mage/frost.png"
                      alt="icon"
                      width={35}
                      height={35}
                    />
                    <Image
                      src="/class/mage.png"
                      alt="icon"
                      width={35}
                      height={35}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>



        </div>

        <div className="flex flex-col w-1/4 bg-secondary_dark rounded-lg p-3 gap-3">
          <DropDown />
          <DropDown />
        </div>
      </div>
    </div>
  );
}
