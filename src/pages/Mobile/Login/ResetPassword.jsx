import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOff } from "lucide-react";
import Ecom from "../../../assets/icon/Ecom.svg";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { resetPassword } from "@/api/authApi"; 
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";

// Yup schema
const ResetSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

function ResetPassword() {
  const navigate = useNavigate();
  const { state,purpose } = useLocation(); 
  const {id} = useParams();
  // state: { type: "email" | "phone", value: "...", purpose: "reset-password" }

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(()=>{
    if(!id || !state){
      navigate('/404')
    }
  },[])

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await resetPassword({
        verification_id:id,
        email: state.value,
        new_password: values.password,
      });
      toast.success("Password reset successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Failed to reset password");
    } finally {
      setSubmitting(false);
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
      <div className="flex flex-col items-center justify-center min-h-[80vh] w-full">
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={ResetSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col items-center justify-center max-w-md w-full p-4 py-12 gap-4 bg-white">
              <h2 className="text-2xl font-semibold text-center text-[var(--primary)] p-2">
                Reset Your Password
              </h2>
              <p className="text-sm font-normal text-[var(--secondary)] w-4/5 text-center mb-4">
                Enter your new password below
              </p>

              {/* New Password */}
              <div className="w-full">
                <label className="block text-sm font-medium text-[var(--primary)] mb-2">
                  New Password<span className="text-[#DC2626]">*</span>
                </label>
                <div className="relative">
                  <Field
                    as={Input}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Minimum 8 characters"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeIcon className="text-[var(--icon)] w-[20px] h-[20px]" strokeWidth={1.25} />
                    ) : (
                      <EyeOff className="text-[var(--icon)] w-[20px] h-[20px]" strokeWidth={1.25} />
                    )}
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              {/* Confirm Password */}
              <div className="w-full">
                <label className="block text-sm font-medium text-[var(--primary)] mb-2">
                  Confirm Password<span className="text-[#DC2626]">*</span>
                </label>
                <div className="relative">
                  <Field
                    as={Input}
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Re-enter password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowConfirm((prev) => !prev)}
                    tabIndex={-1}
                  >
                    {showConfirm ? (
                      <EyeIcon className="text-[var(--icon)] w-[20px] h-[20px]" strokeWidth={1.25} />
                    ) : (
                      <EyeOff className="text-[var(--icon)] w-[20px] h-[20px]" strokeWidth={1.25} />
                    )}
                  </button>
                </div>
                <ErrorMessage name="confirmPassword" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              <Button type="submit" className="w-full mt-4" style={{minWidth:"200px"}} disabled={isSubmitting}>
                {isSubmitting ? <ClipLoader size={20} /> : "Reset Password"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ResetPassword;
