import config from "../config.json";
import { Icon } from "@iconify-icon/react";

import project1Video from "../assets/videos/project1.mp4";

import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const [heroVideo, setHeroVideo] = useState(project1Video);
  const [progress, setProgress] = useState(0);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const video = document.querySelector("video");
    video?.addEventListener("loadedmetadata", () => {
      console.log(video?.duration);
    });

    const updateProgress = () => {
      if (video) {
        setProgress((video.currentTime / video.duration) * 100);
        animationFrameId.current = requestAnimationFrame(updateProgress);
      }
    };

    const handleTimeUpdate = () => {
      if (!animationFrameId.current) {
        animationFrameId.current = requestAnimationFrame(updateProgress);
      }
    };

    video?.addEventListener("timeupdate", handleTimeUpdate);

    video?.addEventListener("timeupdate", () => {
      setProgress((video?.currentTime / video?.duration) * 100);
    });
  }, [heroVideo]);

  return (
    <div className="flex w-full relative bg-secondary">
      <div className="flex flex-1 p-8">
        <div className="flex flex-col w-5/6 gap-8">
          <h1 className="text-8xl max-md:text-7xl font-extrabold">
            {config.businessName}
          </h1>
          <p className="whitespace-pre-line font-light text-5xl w-3/4">
            {config.heroText}
          </p>
          <a
            href="#contact"
            className="btn btn-lg btn-primary w-fit text-white"
          >
            Contact Us Today
          </a>
        </div>
      </div>
      <div className="flex-1 relative">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover absolute top-0 left-0 right-0 bottom-0"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>
      <div className="absolute w-4/12 top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/2 bg-primary p-4 flex flex-col items-center gap-8 pb-12">
        <div className="relative">
          <video
            autoPlay
            loop
            muted
            width={0}
            height={0}
            className="w-full h-full object-cover aspect-square"
          >
            <source src={project1Video} type="video/mp4" />
          </video>
          <div className="absolute bottom-4 w-full flex justify-center">
            <a
              href="#"
              className="btn flex items-center gap-1 bg-gray-200 p-4 py-3 w-fit"
            >
              <Icon icon="fluent:tap-double-20-filled" className="text-2xl" />
              <h1 className="capitalize font-light text-sm">Check it out</h1>
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center text-center gap-2 text-white">
          <h1 className="text-5xl">Project #1</h1>
          <h2 className="font-extralight text-xl">
            Residential and commercial spaces in tune with nature
          </h2>
        </div>
        <div className="flex w-full gap-2 h-[2px]">
          <progress
            className="progress w-full h-full bg-white/20 [&::-webkit-progress-value]:bg-white"
            value={progress}
            max="100"
          ></progress>
          <progress
            className="progress w-full h-full bg-white/20 [&::-webkit-progress-value]:bg-white"
            value="0"
            max="100"
          ></progress>
        </div>
      </div>
    </div>
  );
};

export default Hero;
