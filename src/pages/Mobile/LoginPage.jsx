import { Button } from "@/components/ui/button";
import { useState } from "react";

const LoginPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
console.log(currentStep);

  const onboardingData = [
    {
      title: "Beauty & Wellness Delivered",
      description:
        "Glow up with top beauty picks. Self-care starts at your doorstep",
      image: "/api/placeholder/200/250",
    },
    {
      title: "All Health Essentials in One App",
      description:
        "Order trusted medicines anytime, anywhere. Your health, just a tap away",
      image: "/api/placeholder/200/250",
    },
    {
      title: "Stay fit from Home",
      description: "Gear up for fitness. Everything you need delivered to you",
      image: "/api/placeholder/200/250",
    },
  ];
  const handleNext = () => {
    if (currentStep < onboardingData.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSkip = () => {
    console.log("Skipped onboarding");
  };
  return (
    <div className="min-h-screen  flex items-center justify-center ">
      <div className=" max-w-sm w-full p-8 text-center">
        <h1 className="text-2xl font-bold text-blue-900 tracking-wider mb-8">
          M E D C O
        </h1>
        <div className="mb-8">
          <img
            src={onboardingData[currentStep].image}
            alt="Medical delivery illustration"
            className="mx-auto w-48 h-60 object-contain"
          />
        </div>
        {currentStep !== 3 && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {onboardingData[currentStep].title}
            </h2>

            <p className="text-sm text-gray-600 mb-8 leading-relaxed">
              {onboardingData[currentStep].description}
            </p>

            <div className="flex justify-center space-x-2 mb-8">
              {onboardingData.map((_, index) => (
                <div
                  key={index}
                  className={`w-6 h-1 rounded-full transition-all duration-300 ${
                    index <= currentStep
                      ? index === currentStep
                        ? "bg-gradient-to-r from-[#0D2C8D] to-[#2563eb]"
                        : "bg-[#0D2C8D]"
                      : "bg-[#D2D2D2]"
                  }`}
                  style={
                    index === currentStep
                      ? {
                          background: `linear-gradient(to right, #0D2C8D 50%, #D2D2D2 50%)`,
                        }
                      : {}
                  }
                ></div>
              ))}
            </div>

            <div className="flex flex-col space-y-4 pl-5 pr-5">
              <Button onClick={handleNext}>Next</Button>
              <Button variant={"destructive"} onClick={handleSkip}>
                Skip
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
