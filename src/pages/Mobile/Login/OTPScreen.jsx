import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useLocation } from "react-router-dom";
import Ecom from "../../../assets/icon/Ecom.svg";

function OTPScreen() {
  const [otp, setOtp] = useState("");
  const { state } = useLocation();

  const handleChange = (value) => {
    setOtp(value);
    if (value.length === 6) console.log("OTP entered:", value);
  };

  const handleVerify = () => {
    console.log("Verify OTP clicked. Current OTP:", otp);
  };

  return (
    <div className="w-full min-h-screen bg-white pt-2 px-4 flex flex-col ">
      <div className="flex justify-center md:justify-start md:pl-8 pt-0 mb-6 w-full">
        <div className="flex flex-row items-center gap-2">
          <img src={Ecom} alt="Ecom" className="w-8 h-8" />
          <span className="text-[#0D2C8D] font-bold text-3xl tracking-wide">
            E-COM
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center py-4 w-full">
        <h2 className="mt-3 text-2xl font-semibold text-center text-[var(--primary)]">
          Enter OTP Code
        </h2>
        <p className="mt-2 text-sm text-[var(--secondary)] text-center max-w-xs">
          Enter the 6-digit code sent to {state.value}
        </p>
      </div>

      <div className="flex flex-col items-center gap-6 w-full px-6">
        <InputOTP
          value={otp}
          onChange={handleChange}
          maxLength={6}
          className="flex items-center gap-2"
        >
          <InputOTPGroup>
            {[0, 1, 2].map((i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
          <span className="text-3xl leading-none mx-1 select-none">•</span>
          <InputOTPGroup>
            {[3, 4, 5].map((i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <Button
          onClick={handleVerify}
          className="w-full lg:w-xs"
          disabled={otp.length !== 6}
        >
          Verify OTP
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          Didn’t receive the code?{" "}
          <button className="text-[var(--tertiary)] hover:underline">
            Resend OTP in&nbsp;30&nbsp;s
          </button>
        </p>
      </div>
    </div>
  );
}

export default OTPScreen;
