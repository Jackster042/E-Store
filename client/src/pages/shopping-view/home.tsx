// import images from assets

import image1 from "../../assets/account.jpg";
import image2 from "../../assets/banner-1.webp";
import image3 from "../../assets/banner-2.webp";
import image4 from "../../assets/banner-3.webp";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const images = [image1, image2, image3, image4];

const ShoppingHome = () => {
  return (
    <div className="flex flex-col  min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Home Image ${index + 1}`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          />
        ))}
        <Button
          variant="outline"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
          size="icon"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
          size="icon"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      {/* SHOP BY SECTION PART */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
        </div>
      </section>
    </div>
  );
};

export default ShoppingHome;
