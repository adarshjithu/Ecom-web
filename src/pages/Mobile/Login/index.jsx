import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Linkedin, Mail, Smartphone } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-col items-center py-4">
        <h3 className="text-[#0D2C8D] font-semibold text-2xl text-center">
          E-Com
        </h3>
        <div className="py-3"></div>
        <h2 className="text-2xl font-semibold text-center text-[var(--primary)] p-2">
          Welcome Back!
        </h2>
        <p className="text-sm font-normal text-[var(--secondary)] w-2/3 text-center">
          Use your username and password to access your account
        </p>
      </div>
      <div className="flex flex-col p-4 gap-4">
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
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center w-full">
          <div className="flex-grow h-px bg-[var(--border)]" />
          <span className="mx-4 text-sm text-muted-foreground">
            Or continue with
          </span>
          <div className="flex-grow h-px bg-[var(--border)]" />
        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex items-center gap-2 px-6"
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
            className="flex items-center gap-2 px-6"
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
            className="flex items-center gap-2 px-6"
            onClick={() => console.log("Google clicked")}
          >
            <Linkedin
              className="text-[var(--icon)] w-[20px] h-[20px]"
              strokeWidth={1.25}
            />
            Google
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          Don’t have an account?
          <button className="text-[var(--tertiary)] hover:underline">
            Create One
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
