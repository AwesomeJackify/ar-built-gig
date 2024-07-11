import config from "../config.json";
import { Icon } from "@iconify-icon/react";

import project1Video from "../assets/videos/project1.mp4";
import project2Video from "../assets/videos/project2.mp4";

import project1Img from "../assets/images/project1.png";
import project2Img from "../assets/images/project2.png";

import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const [heroVideo, setHeroVideo] = useState(project1Video);
  const heroVideo1Ref = useRef<HTMLVideoElement | null>(null);
  const heroVideo2Ref = useRef<HTMLVideoElement | null>(null);
  const miniVideo1Ref = useRef<HTMLVideoElement | null>(null);
  const miniVideo2Ref = useRef<HTMLVideoElement | null>(null);

  const [progress, setProgress] = useState(0);
  const animationFrameId = useRef<number | null>(null);
  useEffect(() => {
    const video =
      heroVideo === project1Video
        ? heroVideo1Ref.current
        : heroVideo2Ref.current;

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

    return () => {
      video?.removeEventListener("timeupdate", handleTimeUpdate);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
  }, [heroVideo]);

  const handleProgressClick = (num: number) => {
    console.log(num);
    if (num === 1) {
      setHeroVideo(project1Video);
      if (heroVideo1Ref.current && miniVideo1Ref.current) {
        setProgress(0);
        heroVideo1Ref.current.currentTime = 0;
        miniVideo1Ref.current.currentTime = 0;
      }
    } else if (num === 2 && heroVideo !== project2Video) {
      setProgress(0);
      setHeroVideo(project2Video);
      if (heroVideo2Ref.current && miniVideo2Ref.current) {
        heroVideo2Ref.current.currentTime = 0;
        miniVideo2Ref.current.currentTime = 0;
      }
    }
  };

  return (
    <div className="flex w-full relative bg-secondary max-md:flex-col">
      <div className="flex flex-1 p-8">
        <div className="flex flex-col w-5/6 gap-8">
          <h1 className="text-8xl max-md:text-7xl font-extrabold">
            {config.businessName}
          </h1>
          <p className="whitespace-pre-line font-light text-5xl md:w-3/4 max-md:text-3xl">
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
      <div className="flex-1 relative max-md:h-96">
        <video
          ref={heroVideo1Ref}
          autoPlay
          loop
          muted
          className={`${
            heroVideo == project1Video ? "" : "hidden"
          } w-full h-full object-cover max-md:hidden absolute top-0 left-0 right-0 bottom-0 grayscale-[50%]`}
        >
          <source src={project1Video} type="video/mp4" />
        </video>
        <video
          ref={heroVideo2Ref}
          autoPlay
          loop
          muted
          className={`${
            heroVideo == project2Video ? "" : "hidden"
          } w-full h-full object-cover max-md:hidden absolute top-0 left-0 right-0 bottom-0 grayscale-[50%]`}
        >
          <source src={project2Video} type="video/mp4" />
        </video>
      </div>
      <div className="md:absolute w-4/12 top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/2 bg-primary p-4 flex flex-col items-center gap-8 pb-12">
        <div className="relative">
          <video
            ref={miniVideo1Ref}
            autoPlay
            loop
            muted
            className={`${
              heroVideo == project1Video ? "" : "hidden"
            } w-full h-full object-cover aspect-square`}
          >
            <source src={project1Video} type="video/mp4" />
          </video>
          <video
            ref={miniVideo2Ref}
            autoPlay
            loop
            muted
            className={`${
              heroVideo == project2Video ? "" : "hidden"
            } w-full h-full object-cover aspect-square`}
          >
            <source src={project2Video} type="video/mp4" />
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
          <div className="relative w-full h-full flex items-center">
            <div
              onClick={() => handleProgressClick(1)}
              className="h-4 top-0 -translate-y-1/2 left-0 w-full absolute z-10 cursor-pointer"
            ></div>
            <progress
              className="cursor-pointer progress w-full h-full bg-white/20 [&::-webkit-progress-value]:bg-white"
              value={heroVideo == project1Video ? progress : 0}
              max="100"
            ></progress>
          </div>

          <div className="relative w-full h-full flex items-center">
            <div
              onClick={() => handleProgressClick(2)}
              className="h-4 top-0 -translate-y-1/2 left-0 w-full absolute z-10 cursor-pointer"
            ></div>
            <progress
              className="cursor-pointer progress w-full h-full bg-white/20 [&::-webkit-progress-value]:bg-white"
              value={heroVideo == project2Video ? progress : 0}
              max="100"
            ></progress>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
