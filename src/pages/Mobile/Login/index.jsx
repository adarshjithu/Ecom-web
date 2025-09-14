import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Smartphone, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Ecom from "../../../assets/icon/Ecom.svg";
import Google from "../../../assets/icon/Social icon.svg";
import { login } from "@/api/authApi";
import toast from "react-hot-toast";
import axiosInstance from "@/api/axiosintercepter";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "@/store/actions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.Auth);

  useEffect(() => {
    if (user.isAuthenticated) {
      navigate('/');
    }
  }, [])

  // Yup Validation Schema
  const validationSchema = Yup.object({
    credential: Yup.string()
      .required("Username is required")
      .min(3, "Must be at least 3 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const initialValues = {
    credential: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await login(values);
      dispatch(setAuth(response?.user));
      navigate("/");
    } catch (err) {
        console.log(err)
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/api/v1/auth/google";
  };

  return (
    <>
      {/* Mobile Design */}
      <div className="block sm:hidden w-full min-h-screen flex justify-center items-center bg-white px-2">
        <div className="w-full px-4 bg-white p-0">
          <div className="flex flex-row items-center justify-center gap-3 mb-6">
            <img
              src={Ecom}
              alt="Ecom"
              style={{ height: "2rem", width: "2rem", color: "#0D2C8D" }}
            />
            <span
              className="text-[#0D2C8D] font-bold cursor-pointer text-3xl tracking-wide"
              style={{ lineHeight: 1 }}
              onClick={()=>navigate('/')}
            >
              E-COM
            </span>
          </div>
          <h2 className="text-xl font-semibold text-center text-[var(--primary)] mb-1">
            Welcome Back!
          </h2>
          <p className="text-sm font-normal text-[var(--secondary)] text-center mb-4">
            Use your username and password to access your account
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-3">
                <div>
                  <label className="block text-sm font-medium text-[var(--primary)] mb-1">
                    Username <span className="text-red-800">*</span>
                  </label>
                  <Field
                    as={Input}
                    type="text"
                    name="credential"
                    placeholder="Enter email"
                  />
                  <ErrorMessage
                    name="credential"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--primary)] mb-1">
                    Password <span className="text-red-800">*</span>
                  </label>
                  <div className="relative">
                    <Field
                      as={Input}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      name="password"
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
                        <Eye
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
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="text-right mb-2">
                  <button
                    type="button"
                    className="font-medium text-xs text-[#0D2C8D] hover:underline cursor-pointer"
                    onClick={() => navigate("/verify", { state:{type: "email", purpose:"reset-password"} })}
                  >
                    Forgot your password?
                  </button>
                </div>

                <Button
                  className="w-full text-base py-2"
                  disabled={isSubmitting}
                  type="submit"
                >
                  Sign In
                </Button>
              </Form>
            )}
          </Formik>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-[var(--border)]" />
            <span className="mx-2 text-xs text-muted-foreground">Or continue with</span>
            <div className="flex-grow h-px bg-[var(--border)]" />
          </div>
          <div className="flex gap-2 mb-4">
            <Button
              variant="outline"
              className="flex-1 flex items-center justify-center gap-2 px-2 py-1 text-xs"
              onClick={() => navigate("/verify", { state: {type:"mobile" }})}
            >
              <Smartphone className="text-[var(--icon)] w-[18px] h-[18px]" strokeWidth={1.25} />
              <span className="hidden xs:inline">Mobile OTP</span>
              <span className="xs:hidden">OTP</span>
            </Button>
            <Button
              variant="outline"
              className="flex-1 flex items-center justify-center gap-2 px-2 py-1 text-xs"
              onClick={() => navigate("/verify", { state:{type: "email"} })}
            >
              <Mail className="text-[var(--icon)] w-[18px] h-[18px]" strokeWidth={1.25} />
              <span className="hidden xs:inline">Email OTP</span>
              <span className="xs:hidden">Email</span>
            </Button>
            <Button
              variant="outline"
              className="flex-1 flex items-center justify-center gap-2 px-2 py-1 text-xs"
              onClick={handleGoogleLogin}
            >
              <img src={Google} alt="google" className="w-4 h-4" />
              <span className="hidden xs:inline">Google</span>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Don’t have an account?{" "}
            <button
              className="text-[#0D2C8D] hover:underline"
              onClick={() => navigate("/register")}
            >
              Create One
            </button>
          </p>
        </div>
      </div>

      {/* Desktop/Tablet Design */}
      <div className="hidden sm:block w-full min-h-screen bg-white">
        {/* Logo */}
        <div className="fixed top-0 left-0 pt-2 pb-4 px-4 mx-8">
          <div className="flex flex-row items-center gap-2">
            <img src={Ecom} alt="Ecom" className="w-8 h-8" />
            <span className="text-[#0D2C8D] cursor-pointer font-bold text-3xl tracking-wide" onClick={()=>navigate('/')}>
              E-COM
            </span>
          </div>
        </div>

        {/* Centered form */}
        <div className="flex justify-center items-center min-h-screen">
          <div className="max-w-xl w-full px-6">
            <div className="flex flex-col items-center py-4">
              <h2 className="text-2xl font-semibold text-center text-[var(--primary)] p-2">
                Welcome Back!
              </h2>
              <p className="text-sm font-normal text-[var(--secondary)] text-center">
                Use your username and password to access your account
              </p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--primary)] mb-2">
                      User name <span className="text-red-700">*</span>
                    </label>
                    <Field
                      as={Input}
                      type="text"
                      name="credential"
                      placeholder="Enter email or phone number"
                    />
                    <ErrorMessage
                      name="credential"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--primary)] mb-2">
                      Password <span className="text-red-700">*</span>
                    </label>
                    <div className="relative">
                      <Field
                        as={Input}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        name="password"
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
                          <Eye
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
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div className="text-right">
                    <button
                      type="button"
                      className="font-medium text-sm text-[#0D2C8D] hover:underline cursor-pointer"
                      onClick={() => navigate("/verify", { state: {type:"email", purpose:"reset-password"} })}
                    >
                      Forgot your password?
                    </button>
                  </div>

                  <Button className="w-full" disabled={isSubmitting} type="submit">
                    Sign In
                  </Button>
                </Form>
              )}
            </Formik>

            <div className="flex flex-col items-center gap-4 mt-6">
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
                  onClick={() => navigate("/verify", { state: {type:"mobile"} })}
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
                  onClick={() => navigate("/verify", { state:{type: "email" }})}
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
                  onClick={handleGoogleLogin}
                >
                  <img src={Google} alt="google" /> Google
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button
                  className="text-[#0D2C8D] hover:underline"
                  onClick={() => navigate("/register")}
                >
                  Create One
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
