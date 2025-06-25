import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleCheck } from "lucide-react";

import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { useState, forwardRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const isValidMobile = mobile ? isValidPhoneNumber(mobile) : false;
  const isValidEmail = /^[\w.%+-]+@[A-Za-z\d.-]+\.[A-Za-z]{2,}$/.test(email);

  const handleSendOTP = () => {
    if (state === "email") {
      //TODO: call email api
    } else {
      //TODO: call mobile api
    }

    navigate("/otp", {
      state: { type: state, value: state === "email" ? email : mobile },
    });
  };

  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-col items-center py-10">
        <h3 className="text-[#0D2C8D] font-semibold text-2xl text-center">
          E-Com
        </h3>
        <div className="py-3" />
        <h2 className="text-2xl font-semibold text-center text-[var(--primary)] p-2">
          Verify Your Number
        </h2>
        <p className="text-sm font-normal text-[var(--secondary)] w-4/5 text-center">
          Enter your {state === "email" ? "email ID" : "mobile number"} to
          receive a one-time verification code.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center  ">
        <div className="flex flex-col p-4 py-12 gap-4 w-full max-w-xl">
          <div>
            <label className="block text-sm font-medium text-[var(--primary)] mb-2">
              {state === "email" ? "Email ID" : "Mobile Number"}
            </label>

            <div className="relative">
              {state === "email" ? (
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
            disabled={state === "email" ? !isValidEmail : !isValidMobile}
          >
            Send OTP
          </Button>
        </div>
      </div>
    </div>
  );
}

export default VerificationScreen;
