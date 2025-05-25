import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const slides = [
  {
    image:
      "https://www.myprotein.com/images?url=https://blogscdn.thehut.net/app/uploads/sites/478/2022/07/weekend-warriors-feature-min_1657891505.jpg&auto=avif&width=1200&fit=crop",
    headline: "GEAR UP. GRIND HARD. GET STRONG",
    subheading:
      "Everything you need to conquer your workouts — all in one place.",
    cta: "Explore Now",
  },
];

const HomeCarousel = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
      <img
        src={slides[current].image}
        alt="carousel"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>

      <div className="absolute bottom-0 left-0 right-0 h-[40vh] backdrop-blur-sm bg-black/20 z-15"></div>

      <div className="absolute bottom-0 w-full flex flex-col items-center justify-center pb-16 z-20">
        <h2 className="text-5xl md:text-4xl font-medium text-white text-center mb-4">
          {slides[current].headline}
        </h2>
        <p className="text-white text-2xl font-medium text-center mb-6">
          {slides[current].subheading}
        </p>
        <button className="bg-white text-lg backdrop-blur-sm text-[var(--tertiary)] font-medium px-6 py-2 rounded-[8px] shadow hover:bg-white transition-all duration-200">
          {slides[current].cta}
        </button>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 bottom-8 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full p-2 z-30 transition-all duration-200"
      >
        <ArrowLeft className="w-6 h-6 text-white" strokeWidth={"1.5px"} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 bottom-8 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full p-2 z-30 transition-all duration-200"
      >
        <ArrowRight className="w-6 h-6 text-white" strokeWidth={"1.5px"} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`w-2 h-2 rounded-full ${
              idx === current ? "bg-white" : "bg-[var(--tertiary)]"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HomeCarousel;
