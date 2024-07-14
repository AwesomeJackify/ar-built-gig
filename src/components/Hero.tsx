import config from "../config.json";
import { Icon } from "@iconify-icon/react";
import { useEffect, useRef, useState } from "react";

interface VideoProject {
  url: string;
  title: string;
  description: string;
  link: string;
}

interface Props {
  projects: VideoProject[];
}

const Hero = ({ projects }: Props) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const miniVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const animationFrameId = useRef<number | null>(null);

  const currentProject = projects[currentProjectIndex];
  const bufferTime = 1; // Buffer time to detect video end

  useEffect(() => {
    const video = videoRefs.current[currentProjectIndex];
    const miniVideo = miniVideoRefs.current[currentProjectIndex];

    if (video && miniVideo) {
      setProgress(0);
      video.currentTime = 0;
      miniVideo.currentTime = 0;
      video.playbackRate = 0.8;
      miniVideo.playbackRate = 0.8;

      const interval = setInterval(() => {
        if (video.currentTime >= video.duration - bufferTime) {
          // Video is about to end, handle logic here
          setCurrentProjectIndex(
            (prevIndex) => (prevIndex + 1) % projects.length
          );
        }
      }, 100); // Check every 100ms

      return () => clearInterval(interval); // Clean up interval on component unmount
    }
  }, [currentProjectIndex, projects.length]);

  const handleProgressClick = (index: number) => {
    setCurrentProjectIndex(index);
    setProgress(0);
  };

  useEffect(() => {
    const video = videoRefs.current[currentProjectIndex];

    const updateProgress = () => {
      if (video) {
        setProgress((video.currentTime / (video.duration - bufferTime)) * 100);
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
  }, [currentProjectIndex]);

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
        {projects.map((project, index) => (
          <video
            key={index}
            ref={(el) => (videoRefs.current[index] = el)}
            autoPlay
            muted
            playsInline
            loop
            className={`${
              currentProjectIndex === index ? "" : "hidden"
            } w-full h-full object-cover absolute top-0 left-0 right-0 bottom-0 grayscale-[50%]`}
          >
            <source src={project.url} type="video/mp4" />
          </video>
        ))}
      </div>
      <div className="md:absolute max-md:w-11/12 max-md:mx-auto w-96 top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/2 bg-primary p-8 px-6 flex flex-col items-center gap-8 pb-12 max-md:-translate-x-0 max-md:-translate-y-0 max-md:mb-8">
        <div className="relative w-full h-ful">
          {projects.map((project, index) => (
            <video
              key={index}
              ref={(el) => (miniVideoRefs.current[index] = el)}
              autoPlay
              muted
              playsInline
              loop
              className={`${
                currentProjectIndex === index ? "" : "hidden"
              } w-full h-full object-cover aspect-square`}
            >
              <source src={project.url} type="video/mp4" />
            </video>
          ))}
          <div className="absolute bottom-4 w-full flex justify-center">
            <a
              href={currentProject.link}
              className="btn flex items-center gap-1 bg-gray-200 p-4 py-3 w-fit"
            >
              <Icon icon="fluent:tap-double-20-filled" className="text-2xl" />
              <h1 className="capitalize font-light text-sm">Check it out</h1>
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center text-center gap-2 text-white">
          <h1 className="text-5xl">{currentProject.title}</h1>
          <h2 className="font-extralight text-xl">
            {currentProject.description}
          </h2>
        </div>
        <div className="flex w-full gap-2 h-[2px]">
          {projects.map((_, index) => (
            <div
              key={index}
              className="relative w-full h-full flex items-center"
            >
              <div
                onClick={() => handleProgressClick(index)}
                className="h-4 top-0 -translate-y-1/2 left-0 w-full absolute z-10 cursor-pointer"
              ></div>
              <progress
                className="cursor-pointer progress w-full h-full bg-white/20 [&::-webkit-progress-value]:bg-white"
                value={currentProjectIndex === index ? progress : 0}
                max="100"
              ></progress>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
