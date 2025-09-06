import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useLocation, useNavigate } from "react-router-dom";
import Ecom from "../../../assets/icon/Ecom.svg";
import getPhoneObject from "@/lib/phoneobject";
import toast from "react-hot-toast";
import { sendOTP, verifyOTP } from "@/api/authApi";
import { useSelector } from "react-redux";
import { showError, showSuccess } from "@/helpers/notification_helper";

function OTPScreen() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const [timer,setTimer] = useState(30);
  const user = useSelector(state => state.Auth);
  useEffect(() => {
    if (!state) {
      navigate('/404')
    }
    if (user.isAuthenticated) {
      navigate('/');
    }
  }, [])

   useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value) => {
    setOtp(value);
    if (value.length === 6) console.log("OTP entered:", value);
  };

  const handleVerify = async () => {
    setLoading(true);
    try {
      let formData = {
        otp,
        purpose: state?.purpose,
      };

      if (state?.type === "email") {
        formData.email = state?.value;
      } else if (state?.type === "phone") {
        formData.phone = getPhoneObject(state?.value);
      }

      const result = await verifyOTP(formData);
     
      if (state?.purpose == "reset-password") {
        navigate(`/reset-password/${result?.verification_id}`, { state })
      } else if (
        state?.purpose === "login-email" ||
        state?.purpose === "login-phone"
      ) {
        navigate("/");
      } else {
        navigate("/register-successfull",);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async()=>{
    try {
      const response = await sendOTP({ email: state?.value, purpose: state?.purpose });
      if(response){
        showSuccess("OTP Resend Successfully !");
      }
    } catch (error) {
      if(error.message){
        showError(error.message);
      }else{
        console.log(error);
      }
    }
  }

  return (
    <div className="w-full min-h-screen bg-white pt-2 px-4 flex flex-col ">
      <div className="flex justify-center md:justify-start md:pl-8 md:pt-0 pt-10 mb-6 w-full">
        <div className="flex flex-row items-center gap-2 ">
          <img src={Ecom} alt="Ecom" className="w-8 h-8" />
          <span className="text-[#0D2C8D] font-bold text-3xl cursor-pointer tracking-wide" onClick={()=>navigate('/')}>
            E-COM
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center  min-h-[80vh]">
        <div className="flex flex-col items-center py-4 w-full">
          <h2 className="mt-3 text-2xl font-semibold text-center text-[var(--primary)]">
            Enter OTP Code
          </h2>
          <p className="mt-2 text-sm text-[var(--secondary)] text-center max-w-xs">
            Enter the 6-digit code sent to {state?.value}
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
            disabled={otp.length !== 6 || loading}
          >
            Verify OTP
          </Button>

         <p className="text-sm text-muted-foreground text-center">
            Didn’t receive the code?{" "}
            {timer > 0 ? (
              <span className="text-gray-500">Resend OTP in {timer}s</span>
            ) : (
              <button
                onClick={handleResend}
                className="text-[var(--tertiary)] hover:underline"
              >
                Resend OTP
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OTPScreen;
