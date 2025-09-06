import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleCheck } from "lucide-react";
import Ecom from "../../../assets/icon/Ecom.svg";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useState, forwardRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { sendOTP } from "@/api/authApi";
import getPhoneObject from "@/lib/phoneobject";
import { useSelector } from "react-redux";


const TailwindPhoneInput = forwardRef((props, ref) => (
  <Input
    {...props}
    ref={ref}
    placeholder="9876543210"
    className={`pr-10 py-2 text-sm ${props.className || ""}`}
  />
));

function VerificationScreen() {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const isValidMobile = mobile ? isValidPhoneNumber(mobile) : false;
  const isValidEmail = /^[\w.%+-]+@[A-Za-z\d.-]+\.[A-Za-z]{2,}$/.test(email);

  const user = useSelector(state => state.Auth);
  useEffect(() => {
    if(!state) navigate('/404')
    if (user.isAuthenticated) {
      navigate('/');
    }
  }, [])
  console.log(state)
  const handleSendOTP = async () => {
    setLoading(true);
    let purposeValue = "";
    try {
      if (state?.type === "email" && state?.purpose != "reset-password") {
        purposeValue = "login-email";
        try {
          await sendOTP({ email, purpose: purposeValue });
        } catch (err) {
          if (err.message === "Email is not verified") {
            toast("Email not verified. Sending verification email...");
            purposeValue = "verify-email";
            await sendOTP({ email, purpose: purposeValue });
          } else {
            throw err;
          }
        }
      }else if(state?.type == "email" && state?.purpose =="reset-password"){
        await sendOTP({email, purpose: "reset-password"});
      } else {
        const phoneObj = getPhoneObject(mobile);
        if (!phoneObj) throw new Error("Invalid phone number format");
        purposeValue = "login-phone";
        try {
          await sendOTP({ phone: phoneObj, purpose: purposeValue });
        } catch (err) {
          if (err.message === "Phone is not verified") {
            toast("Phone not verified. Sending verification SMS...");
            purposeValue = "verify-phone";
            await sendOTP({ phone: phoneObj, purpose: purposeValue });
          } else {
            throw err;
          }
        }
      }
      navigate("/otp", {
        state: {
          type: state?.type,
          value: state?.type === "email" ? email : mobile,
          purpose:state?.purpose ? state?.purpose : purposeValue,
        },
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white pt-2 px-4">
      <div className="flex justify-center md:justify-start md:pl-8 md:pt-0 pt-10 mb-6">
        <div className="flex flex-row items-center gap-2">
          <img src={Ecom} alt="Ecom" className="w-8 h-8" />
          <span className="text-[#0D2C8D] cursor-pointer font-bold text-3xl tracking-wide" onClick={()=>navigate('/')}>
            E-COM
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center min-h-[80vh] w-ful">
        <div className="flex flex-col items-center py-4 ">
          <h2 className="text-2xl font-semibold text-center text-[var(--primary)] p-2">
            Verify Your {state?.type === "email" ? "Email ID" : "Mobile Number"}
          </h2>
          <p className="text-sm font-normal text-[var(--secondary)] w-4/5 text-center">
            Enter your {state?.type === "email" ? "email ID" : "mobile number"} to
            receive a one-time verification code.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center max-w-md w-full ">
          <div className="flex flex-col p-4 py-12 gap-4 w-full max-w-xl">
            <div>
              <label className="block text-sm font-medium text-[var(--primary)] mb-2">
                {state?.type === "email" ? "Email ID" : "Mobile Number"}
              </label>
              <div className="relative">
                {state?.type === "email" ? (
                  <Input
                    type="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pr-10"
                  />
                ) : (
                  <PhoneInput
                    inputComponent={TailwindPhoneInput}
                    international
                    defaultCountry="IN"
                    placeholder="Used for OTP login"
                    value={mobile}
                    onChange={setMobile}
                  />
                )}
                {(isValidMobile || isValidEmail) && (
                  <CircleCheck
                    size={20}
                    className="fill-[#019939] text-white absolute right-3 top-1/2 -translate-y-1/2"
                  />
                )}
              </div>
            </div>
            <Button
              onClick={handleSendOTP}
              className="w-full"
              disabled={
                loading || (state?.type === "email" ? !isValidEmail : !isValidMobile)
              }
            >
              Send OTP
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerificationScreen;
