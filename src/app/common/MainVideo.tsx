"use client";

import { useEffect, useState } from "react";
import { VideoWrap, TextBanner2 } from "@/styled/Component.styles";
import { BtnWrap, WhiteBtn } from "@/styled/Button.styles";

type MainVideoData = {
  id: number;
  videoUrl: string;      // /uploads/video/xxx.mp4
  title: string;
  subtitle: string;
  btn1Text?: string;
  btn1Link?: string;
  btn2Text?: string;
  btn2Link?: string;
};

const API_BASE = "/api";

export default function  MainVideo (){

const [data, setData] = useState<MainVideoData | null>(null);

useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(`${API_BASE}/main-video`, {
          credentials: "include",
          cache: "no-store",
        });

        if (!res.ok) {
          setData(null);
          return;
        }
        
        const text = await res.text();
        
        if (!text) {
          setData(null);
          return;
        }
        
        const json = JSON.parse(text);
        setData(json);
        
      } catch (err) {
        console.error("main video load error", err);
      }
    };

    fetchVideo();
  }, []);

  const videoSrc = data?.videoUrl || "/videos/motion_5.mp4"; // /uploads 경로는 rewrites로 프록시

    return(
        <>
<VideoWrap>
    <video
    autoPlay muted loop playsInline
    >
        <source src={videoSrc} type="video/mp4"/>
    </video>
{data &&(
<TextBanner2>
<h1>{data.title}</h1>
<p>{data.subtitle}</p>
<BtnWrap>
            {data.btn1Text && data.btn1Link && (
              <WhiteBtn onClick={() => window.location.href = data.btn1Link!}>
                {data.btn1Text}
              </WhiteBtn>
            )}

            {data.btn2Text && data.btn2Link && (
              <>
                <div className="mx-2"></div>
                <WhiteBtn onClick={() => window.location.href = data.btn2Link!}>
                  {data.btn2Text}
                </WhiteBtn>
              </>
            )}
</BtnWrap>
</TextBanner2>
)}
</VideoWrap>
        </>
    )
}