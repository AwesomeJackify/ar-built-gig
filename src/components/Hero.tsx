import config from "../config.json";
import { Icon } from "@iconify-icon/react";

import project1Video from "../assets/videos/project1.mp4";
import project2Video from "../assets/videos/project2.mp4";

import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const [heroVideo, setHeroVideo] = useState(project1Video);
  const [checkItOutLink, setCheckItOutLink] = useState("/projects/project-1");
  const [heroTitle, setHeroTitle] = useState("Project 1");
  const [heroDescription, setHeroDescription] = useState(
    "Residential and commercial spaces in tune with nature"
  );
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

    const miniVideo =
      heroVideo === project1Video
        ? miniVideo1Ref.current
        : miniVideo2Ref.current;

    if (video && miniVideo) {
      setProgress(0);
      video.currentTime = 0;
      miniVideo.currentTime = 0;
      video.play();
      miniVideo.play();
    }

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

    const handleEnded = () => {
      if (heroVideo === project1Video) {
        setHeroVideo(project2Video);
        setProgress(0);
      } else {
        setHeroVideo(project1Video);
        setProgress(0);
      }
    };

    video?.addEventListener("timeupdate", handleTimeUpdate);
    video?.addEventListener("ended", handleEnded);

    return () => {
      video?.removeEventListener("timeupdate", handleTimeUpdate);
      video?.removeEventListener("ended", handleEnded);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
  }, [heroVideo]);

  const handleProgressClick = (num: number) => {
    if (num === 1 && heroVideo !== project1Video) {
      setHeroVideo(project1Video);
      setCheckItOutLink("/projects/project-1");
      setHeroTitle("Project 1");
      setHeroDescription(
        "Residential and commercial spaces in tune with nature"
      );
    } else if (num === 2 && heroVideo !== project2Video) {
      setHeroVideo(project2Video);
      setCheckItOutLink("/projects/curved-deck");
      setHeroTitle("Curved Deck");
      setHeroDescription(
        "A beautiful curved deck that complements the natural landscape"
      );
    }
  };

  return (
    <div className="flex w-full relative bg-secondary max-md:flex-col min-h-[calc(100dvh)]">
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
      <div className="flex-1 relative max-md:h-96 max-md:hidden">
        <video
          ref={heroVideo1Ref}
          autoPlay
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
          muted
          className={`${
            heroVideo == project2Video ? "" : "hidden"
          } w-full h-full object-cover max-md:hidden absolute top-0 left-0 right-0 bottom-0 grayscale-[50%]`}
        >
          <source src={project2Video} type="video/mp4" />
        </video>
      </div>
      <div className="md:absolute max-md:w-11/12 max-md:mx-auto w-3/12 top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/2 bg-primary p-4 flex flex-col items-center gap-8 pb-12 max-md:-translate-x-0 max-md:-translate-y-0 max-md:mb-8">
        <div className="relative">
          <video
            ref={miniVideo1Ref}
            autoPlay
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
            muted
            className={`${
              heroVideo == project2Video ? "" : "hidden"
            } w-full h-full object-cover aspect-square`}
          >
            <source src={project2Video} type="video/mp4" />
          </video>
          <div className="absolute bottom-4 w-full flex justify-center">
            <a
              href={checkItOutLink}
              className="btn flex items-center gap-1 bg-gray-200 p-4 py-3 w-fit"
            >
              <Icon icon="fluent:tap-double-20-filled" className="text-2xl" />
              <h1 className="capitalize font-light text-sm">Check it out</h1>
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center text-center gap-2 text-white">
          <h1 className="text-5xl">{heroTitle}</h1>
          <h2 className="font-extralight text-xl">{heroDescription}</h2>
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
