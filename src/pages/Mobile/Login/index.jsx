import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Smartphone, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Ecom from "../../../assets/icon/Ecom.svg";
import Google from "../../../assets/icon/Social icon.svg";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-white pt-2 px-4">
      <div className="flex justify-center md:justify-start md:pl-8 pt-0 mb-6">
        <div className="flex flex-row items-center gap-2">
          <img src={Ecom} alt="Ecom" className="w-8 h-8" />
          <span className="text-[#0D2C8D] font-bold text-3xl tracking-wide">
            E-COM
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center py-4">
        <h2 className="text-2xl font-semibold text-center text-[var(--primary)] p-2">
          Welcome Back!
        </h2>
        <p className="text-sm font-normal text-[var(--secondary)] w-2/3 text-center">
          Use your username and password to access your account
        </p>
      </div>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col p-4 gap-4 max-w-xl w-full">
          <div>
            <label className="block text-sm font-medium text-[var(--primary)] mb-2">
              User name
            </label>
            <Input type="text" placeholder="Enter email" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--primary)] mb-2">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--secondary)]"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff
                    className="text-[var(--icon)] w-[20px] h-[20px]"
                    strokeWidth={1.25}
                  />
                ) : (
                  <Eye
                    className="text-[var(--icon)] w-[20px] h-[20px]"
                    strokeWidth={1.25}
                  />
                )}
              </button>
            </div>
          </div>
          <div className="text-right">
            <button className="font-medium text-sm text-[var(--tertiary)] hover:underline">
              Forgot your password?
            </button>
          </div>
          <Button
            onClick={() => console.log("Sign in clicked")}
            className="w-full"
          >
            Sign In
          </Button>
        </div>
        <div className="flex flex-col items-center gap-4 max-w-xl w-full ">
          <div className="flex items-center w-full">
            <div className="flex-grow h-px bg-[var(--border)]" />
            <span className="mx-4 text-sm text-muted-foreground">
              Or continue with
            </span>
            <div className="flex-grow h-px bg-[var(--border)]" />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => navigate("/verify", { state: "mobile" })}
            >
              <Smartphone
                className="text-[var(--icon)] w-[20px] h-[20px]"
                strokeWidth={1.25}
              />
              Mobile OTP
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => navigate("/verify", { state: "email" })}
            >
              <Mail
                className="text-[var(--icon)] w-[20px] h-[20px]"
                strokeWidth={1.25}
              />
              Email OTP
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => console.log("Google clicked")}
            >
              <img src={Google} alt="google" /> Google
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <button
              className="text-[var(--tertiary)] hover:underline"
              onClick={() => navigate("/register")}
            >
              Create One
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
