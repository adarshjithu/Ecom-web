import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Phone, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";

const LoginPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loginStep, setLoginStep] = useState("main");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);

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
    if (currentStep < onboardingData.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSkip = () => {
    setCurrentStep(3);
  };

  const handleLoginWithOTP = () => {
    setLoginStep("phone");
  };

  const handleSendOTP = () => {
    if (phoneNumber.length >= 10) {
      setLoginStep("otp");
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 4) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const renderLoginScreen = () => {
    if (loginStep === "phone") {
      return (
        <>
          <div className="min-h-screen flex items-start justify-start">
            <div className="max-w-sm w-full p-8 ">
              <h1 className="text-2xl font-bold text-[var(--tertiary)] tracking-wider mb-8 text-center">
                M E D C O
              </h1>

              <h2 className="text-xl font-semibold mb-2 text-[var(--primary)] text-center">
                Verify Your Number
              </h2>

              <h1 className="text-sm text-[var(--secondary)] mb-8 text-center">
                Enter your mobile number to receive a one-time verification
                code.
              </h1>

              <div className="mb-8">
                <span className="font-medium pb-3 block"> Mobile Number</span>
                <Input
                  type={"tel"}
                  placeholder="Enter phone number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              <Button onClick={handleSendOTP} className={"w-full mb-8"}>
                Send OTP
              </Button>
              <span className="italic text-[var(--secondary)]">
                You’ll receive a 4-digit code on your registered phone number.
              </span>
            </div>
          </div>
        </>
      );
    }

    if (loginStep === "otp") {
      return (
        <div className="min-h-screen flex items-start justify-center">
          <div className="max-w-sm w-full p-8 ">
            <h1 className="text-2xl font-bold text-[#0D2C8D] tracking-wider mb-8 text-center">
              M E D C O
            </h1>

            <h2 className="text-xl font-semibold mb-2 text-center">
              Enter OTP Code
            </h2>

            <p className="text-sm text-[#8B8B8B] mb-13 text-center">
              Enter your mobile number to receive a one-time verification code.
            </p>

            <div className="flex justify-center space-x-3 mb-6">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                />
              ))}
            </div>

            <Button className="w-full  mb-4">Verify OTP</Button>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                Didn't receive code?{" "}
              </span>
              <button className="text-sm text-[#0D2C8D] font-medium">
                Resend{" "}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-sm w-full p-8 text-center">
          <h1 className="text-2xl font-bold text-[var(--tertiary)] tracking-wider mb-8 text-center">
            M E D C O
          </h1>

          <h2 className="text-xl font-semibold text-[var(--primary)] mb-2 text-center">
            Welcome Back!
          </h2>

          <p className="text-sm text-[var(--secondary)] mb-8 text-center">
            Log in to access your account
          </p>

          <div className="mb-8">
            <div className="relative">
              <img
                src="/api/placeholder/250/200"
                alt="World map with location pins"
                className="mx-auto w-84 h-78 object-contain"
              />
            </div>
          </div>

          <div className=" flex flex-col space-y-4">
            <Button onClick={handleLoginWithOTP}>
              <Phone size={20} />
              <span>Login with OTP</span>
            </Button>

            <Button variant="destructive">
              <Mail size={20} />
              <span>Login with Google</span>
            </Button>
          </div>

          <div className="mt-6 text-center">
            <span className="text-sm text-[var(--secondary)]">
              Don't have an account?{" "}
            </span>
            <button className="text-sm text-[var(--primary)] font-medium">
              REGISTER
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (currentStep < 3) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-sm w-full p-8 text-center">
          <h1 className="text-2xl font-bold text-[#0D2C8D] tracking-wider mb-8">
            M E D C O
          </h1>
          <div className="mb-8">
            <img
              src={onboardingData[currentStep].image}
              alt="Medical delivery illustration"
              className="mx-auto w-48 h-60 object-contain"
            />
          </div>

          <h2 className="text-xl font-semibold  mb-3 text-[var(--primary)]">
            {onboardingData[currentStep].title}
          </h2>

          <p className="text-sm text-[var(--secondary)] mb-8 leading-relaxed">
            {onboardingData[currentStep].description}
          </p>

          <div className="flex justify-center space-x-2 mb-8">
            {onboardingData.map((_, index) => (
              <div
                key={index}
                className={`w-6 h-1 rounded-full transition-all duration-300 ${
                  index <= currentStep
                    ? index === currentStep
                      ? "bg-gradient-to-r from-[#0D2C8D] to-[#0D2C8D] "
                      : "bg-[#0D2C8D]"
                    : "bg-[#8B8B8B]"
                }`}
              ></div>
            ))}
          </div>

          <div className="flex flex-col space-y-4 px-4">
            <Button onClick={handleNext}>Next</Button>
            <Button variant="outline" onClick={handleSkip}>
              Skip
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return renderLoginScreen();
};

export default LoginPage;
