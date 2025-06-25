import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOff } from "lucide-react";
import React, { useState } from "react";
import Ecom from "../../assets/icon/Ecom.svg";
import Google from "../../assets/icon/Social icon.svg";
import { Button } from "@/components/ui/button";
import { register } from "@/api/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const formData = {
      name: form.name,
      email: form.email,
      phone: {
        code: "+91",
        number: form.phone,
      },
      password: form.password,
    };

    try {
      await register(formData);
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col xs:items-center xs:justify-center bg-white pt-2 px-4">
      <div className="flex justify-center md:justify-start md:pl-8 pt-0 mb-6">
        <div className="flex flex-row items-center gap-2">
          <img src={Ecom} alt="Ecom" className="w-8 h-8" />
          <span className="text-[#0D2C8D] font-bold text-3xl tracking-wide">
            E-COM
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <form
          className="w-full max-w-md bg-white rounded-xl  "
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <h1 className="text-2xl font-semibold text-center mb-1 text-[var(--primary)]">
            Create your account
          </h1>
          <p className="text-[var(--secondary)] text-center mb-6">
            Join us by filling in the details below
          </p>
          <label className="block text-sm font-medium mb-1 text-[var(--primary)]">
            Name<span className="text-[#DC2626]">*</span>
          </label>
          <Input
            type="text"
            name="name"
            className="mb-4"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <label className="block text-sm font-medium mb-1 text-[var(--primary)]">
            Email Address<span className="text-[#DC2626]">*</span>
          </label>
          <Input
            type="email"
            name="email"
            className="mb-4"
            placeholder="Enter a valid email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label className="block text-sm font-medium mb-1 text-[var(--primary)]">
            Phone number<span className="text-[#DC2626]">*</span>
          </label>
          <Input
            type="text"
            name="phone"
            className="mb-4"
            placeholder="Used for OTP login"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <label className="block text-sm font-medium mb-1 text-[var(--primary)]">
            Password<span className="text-[#DC2626]">*</span>
          </label>
          <div className="relative mb-4">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              className="pr-10"
              placeholder="Minimum 8 characters"
              value={form.password}
              onChange={handleChange}
              required
              minLength={8}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeIcon
                  className="text-[var(--icon)] w-[20px] h-[20px]"
                  strokeWidth={1.25}
                />
              ) : (
                <EyeOff
                  className="text-[var(--icon)] w-[20px] h-[20px]"
                  strokeWidth={1.25}
                />
              )}
            </button>
          </div>
          <label className="block text-sm font-medium mb-1 text-[var(--primary)]">
            Confirm Password<span className="text-[#DC2626]">*</span>
          </label>
          <div className="relative mb-2">
            <Input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              className="pr-10"
              placeholder="Minimum 8 characters"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              minLength={8}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowConfirm((prev) => !prev)}
              tabIndex={-1}
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? (
                <EyeIcon
                  className="text-[var(--icon)] w-[20px] h-[20px]"
                  strokeWidth={1.25}
                />
              ) : (
                <EyeOff
                  className="text-[var(--icon)] w-[20px] h-[20px]"
                  strokeWidth={1.25}
                />
              )}
            </button>
          </div>
          {error && <div className="text-red-600 text-sm mb-2">{error}</div>}

          <Button type="submit" className="w-full " disabled={loading}>
            Create Account
          </Button>
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-[var(--border)]"></div>
            <span className="mx-2 text-[var(--secondary)] text-sm">
              Or continue with
            </span>
            <div className="flex-grow h-px bg-[var(--border)]"></div>
          </div>
          <Button variant={"outline"} className="w-full ">
            <img src={Google} alt="google" className="w-5 h-5" /> Google
          </Button>
          <p className="text-center text-sm text-[var(--primary)] mt-6">
            Already have an account?{" "}
            <a
              href="/"
              className="text-[var(--tertiary)] font-medium hover:underline"
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
