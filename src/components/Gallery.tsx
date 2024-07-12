import Marquee from "react-fast-marquee";

import bio2Img from "../assets/images/bio/bio2.png";
import bio4Img from "../assets/images/bio/bio4.jpg";
import bio5Img from "../assets/images/bio/bio5.jpg";
import bio6Img from "../assets/images/bio/bio6.jpg";
import bio7Img from "../assets/images/bio/bio7.jpg";
import bio8Img from "../assets/images/bio/bio8.jpg";
import bio9Img from "../assets/images/bio/bio9.jpg";
import bio10Img from "../assets/images/bio/bio10.jpg";

const images = [
  bio2Img,
  bio4Img,
  bio5Img,
  bio6Img,
  bio7Img,
  bio8Img,
  bio9Img,
  bio10Img,
];

const Gallery = () => {
  return (
    <Marquee autoFill pauseOnHover className="w-full ">
      {images.map((image, index) => (
        <img
          key={index}
          src={image.src}
          alt={`Bio ${index + 1}`}
          width={100}
          height={100}
          className="w-96 aspect-square object-cover"
        />
      ))}
    </Marquee>
  );
};

export default Gallery;
