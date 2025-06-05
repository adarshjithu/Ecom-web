import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Phone, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import loginImage4 from "../../../assets/images/4.png";
import loginImage3 from "../../../assets/images/5.png";
import loginImage2 from "../../../assets/images/8.png";
import loginImage1 from "../../../assets/images/2.png";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loginStep, setLoginStep] = useState("main");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const onboardingData = [
    {
      title: "Beauty & Wellness Delivered",
      description:
        "Glow up with top beauty picks. Self-care starts at your doorstep",
      image: loginImage1,
    },
    {
      title: "All Health Essentials in One App",
      description:
        "Order trusted medicines anytime, anywhere. Your health, just a tap away",
      image: loginImage2,
    },
    {
      title: "Stay fit from Home",
      description: "Gear up for fitness. Everything you need delivered to you",
      image: loginImage3,
    },
  ];

  useEffect(() => {
    if (!showLogin) {
      const interval = setInterval(() => {
        setCurrentStep((prevStep) => {
          if (prevStep < onboardingData.length - 1) {
            return prevStep + 1;
          } else {
            setShowLogin(true);
            return prevStep;
          }
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [showLogin, onboardingData.length]);

  useEffect(() => {
    const desktopInterval = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % onboardingData.length);
    }, 3000);

    return () => clearInterval(desktopInterval);
  }, [onboardingData.length]);

  const handleLoginWithOTP = () => {
    setShowLogin(true);
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
      if (value && index < 3) {
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

  const renderMobileLoginScreen = () => {
    if (loginStep === "phone") {
      return (
        <div className="min-h-screen flex items-start justify-start">
          <div className="max-w-sm w-full p-8">
            <h1 className="text-2xl font-bold text-[#0D2C8D] tracking-wider mb-8 text-center">
              M E D C O
            </h1>

            <h2 className="text-xl font-semibold mb-2 text-[#333] text-center">
              Verify Your Number
            </h2>

            <h1 className="text-sm text-[#8B8B8B] mb-8 text-center">
              Enter your mobile number to receive a one-time verification code.
            </h1>

            <div className="mb-8">
              <span className="font-medium pb-3 block"> Mobile Number</span>
              <Input
                type={"tel"}
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full"
              />
            </div>

            <Button onClick={handleSendOTP} className={"w-full mb-8"}>
              Send OTP
            </Button>
            <span className="italic text-[#8B8B8B]">
              You'll receive a 4-digit code on your registered phone number.
            </span>
          </div>
        </div>
      );
    }

    if (loginStep === "otp") {
      return (
        <div className="min-h-screen flex items-start justify-center">
          <div className="max-w-sm w-full p-8">
            <h1 className="text-2xl font-bold text-[#0D2C8D] tracking-wider mb-8 text-center">
              M E D C O
            </h1>

            <h2 className="text-xl font-semibold mb-2 text-center">
              Enter OTP Code
            </h2>

            <p className="text-sm text-[#8B8B8B] mb-8 text-center">
              Enter the 4-digit code sent to your phone number.
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
                  className="w-[60px] h-[60px] text-center text-lg font-semibold"
                />
              ))}
            </div>

            <Button
              className="w-full mb-4"
              onClick={() => {
                navigate("/home");
              }}
            >
              Verify OTP
            </Button>

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
        <div className="max-w-sm w-full p-8 text-center mt-6">
          <h1 className="text-2xl font-bold text-[#0D2C8D] tracking-wider mb-8 text-center">
            M E D C O
          </h1>

          <h2 className="text-xl font-semibold text-[#333] mb-2 text-center">
            Welcome Back!
          </h2>

          <p className="text-sm text-[#8B8B8B] mb-8 text-center">
            Log in to access your account
          </p>

          <div className="mb-8">
            <div className="relative">
              <img
                src={loginImage4}
                alt="World map with location pins"
                className="mx-auto w-64 h-78 object-contain rounded-lg"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4 justify-end">
            <Button onClick={handleLoginWithOTP} className="w-full">
              <Phone size={20} className="mr-2" />
              <span>Login with OTP</span>
            </Button>

            <Button variant="outline" className="w-full">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Login with Google
            </Button>
          </div>

          <div className="mt-6 text-center">
            <span className="text-sm text-[#8B8B8B]">
              Don't have an account?{" "}
            </span>
            <button className="text-sm text-[#0D2C8D] font-medium">
              REGISTER
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderDesktopLoginForm = () => {
    if (loginStep === "phone") {
      return (
        <div className="flex flex-col justify-center h-full p-12">
          <div className="max-w-md w-full">
            <h2 className="text-xl font-semibold mb-2 text-[#333]">
              Verify Your Number
            </h2>

            <p className="text-sm text-[#8B8B8B] mb-8">
              Enter your mobile number to receive a one-time verification code.
            </p>

            <div className="mb-8">
              <span className="font-medium pb-3 block"> Mobile Number</span>
              <Input
                type={"tel"}
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full"
              />
            </div>

            <Button onClick={handleSendOTP} className="w-full mb-8">
              Send OTP
            </Button>
            <span className="italic text-[#8B8B8B] text-sm">
              You'll receive a 4-digit code on your registered phone number.
            </span>
          </div>
        </div>
      );
    }

    if (loginStep === "otp") {
      return (
        <div className="flex flex-col justify-center h-full p-12">
          <div className="max-w-md w-full">
            <h2 className="text-xl font-semibold mb-2">Enter OTP Code</h2>

            <p className="text-sm text-[#8B8B8B] mb-8">
              Enter the 4-digit code sent to your phone number.
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
                  className="w-[60px] h-[60px] text-center text-lg font-semibold"
                />
              ))}
            </div>

            <Button
              className="w-full mb-4"
              onClick={() => {
                navigate("/home");
              }}
            >
              Verify OTP
            </Button>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                Didn't receive code?{" "}
              </span>
              <button className="text-sm text-[#0D2C8D] font-medium">
                Resend
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col justify-center h-full p-12">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-semibold text-[#333] mb-2">
            Welcome Back!
          </h2>

          <p className="text-sm text-[#8B8B8B] mb-8">
            Log in to access your account
          </p>

          <div className="flex flex-col space-y-4 mb-6">
            <Button onClick={handleLoginWithOTP} className="w-full">
              <Phone size={20} className="mr-2" />
              <span>Login with OTP</span>
            </Button>

            <Button variant="outline" className="w-full">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Login with Google
            </Button>
          </div>

          <div className="text-center">
            <span className="text-sm text-[#8B8B8B]">
              Don't have an account?{" "}
            </span>
            <button className="text-sm text-[#0D2C8D] font-medium">
              REGISTER
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (typeof window !== "undefined" && window.innerWidth < 768) {
    if (!showLogin) {
      return (
        <div className="min-h-screen  flex flex-col">
          <div className="pt-16 pb-8 text-center">
            <h1 className="text-2xl font-bold text-[#0D2C8D] tracking-[0.2em]">
              MEDCO
            </h1>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center px-8">
            <div className="mb-12">
              <img
                src={onboardingData[currentStep].image}
                alt="Medical delivery illustration"
                className="w-48 h-48 object-contain"
              />
            </div>
            <h2 className="text-xl font-semibold mb-4 text-[#333] text-center px-4">
              {onboardingData[currentStep].title}
            </h2>

            <p className="text-sm text-[#666] text-center leading-relaxed px-6 mb-8">
              {onboardingData[currentStep].description}
            </p>

            <div className="flex justify-center space-x-2 mb-16">
              {onboardingData.map((_, index) => (
                <div
                  key={index}
                  className={`w-8 h-1 rounded-full transition-all duration-300 ${
                    index === currentStep ? "bg-[#0D2C8D]" : "bg-[#D1D5DB]"
                  }`}
                ></div>
              ))}
            </div>
          </div>

          <div className="px-6 pb-8 space-y-3">
            <Button
              onClick={handleLoginWithOTP}
              className="w-full bg-[#0D2C8D] hover:bg-[#0A2472] text-white py-4 rounded-lg font-medium"
            >
              <Phone size={20} className="mr-2" />
              Login with OTP
            </Button>

            <Button variant="outline" className="w-full">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Login with Google
            </Button>

            <div className="text-center pt-4">
              <span className="text-sm text-[#666]">
                Don't have an account?{" "}
              </span>
              <button className="text-sm text-[#0D2C8D] font-semibold">
                REGISTER
              </button>
            </div>
          </div>
        </div>
      );
    }

    return renderMobileLoginScreen();
  }

  return (
    <div className="min-h-screen flex bg-white">
      <div className="flex-1 bg-gradient-to-br from-[#EFF3FF] to-[#FFFFFF] flex flex-col justify-center items-center p-12">
        <div className="max-w-lg text-center">
          <h1 className="text-3xl font-bold text-[#0D2C8D] tracking-wider mb-12">
            M E D C O
          </h1>

          <div className="mb-8">
            <img
              src={onboardingData[currentStep].image}
              alt="Medical delivery illustration"
              className="mx-auto w-64 h-80 object-contain rounded-lg"
            />
          </div>

          <h2 className="text-2xl font-semibold mb-4 text-[#333]">
            {onboardingData[currentStep].title}
          </h2>

          <p className="text-base text-[#8B8B8B] mb-8 leading-relaxed">
            {onboardingData[currentStep].description}
          </p>

          <div className="flex justify-center space-x-2 mb-8">
            {onboardingData.map((_, index) => (
              <div
                key={index}
                className={`w-8 h-2 rounded-full transition-all duration-300 ${
                  index === currentStep ? "bg-[#0D2C8D]" : "bg-[#8B8B8B]"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white">{renderDesktopLoginForm()}</div>
    </div>
  );
};

export default LoginPage;
