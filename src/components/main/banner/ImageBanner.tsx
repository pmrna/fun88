import { useState } from "react";
import { GoDot, GoDotFill } from "react-icons/go";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";

type ImageBannerProps = {
  imageUrls: readonly string[];
};

function ImageBanner({ imageUrls }: ImageBannerProps) {
  const [imageIndex, setImageIndex] = useState(0);

  const handlePrev = () => {
    setImageIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setImageIndex((prevIndex) =>
      prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="w-full relative bg-center">
      <img
        src={imageUrls[imageIndex]}
        alt="banner"
        className="w-full h-48 object-cover rounded-lg"
      />
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-3 -translate-y-1/2 text-2xl rounded-full p-1 bg-black/20 text-white cursor-pointer"
      >
        <MdArrowLeft />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-3 -translate-y-1/2 text-2xl rounded-full p-1 bg-black/20 text-white cursor-pointer"
      >
        <MdArrowRight />
      </button>
      <div className="flex justify-center items-center absolute bottom-2 w-full ">
        {imageUrls.map((_, index) => (
          <div key={index} className="text-blue-800">
            {index === imageIndex ? <GoDotFill /> : <GoDot />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageBanner;
