import { forwardRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  ChevronRight,
  X,
  User,
  MapPin,
  CreditCard,
  ShoppingBag,
  Heart,
  Flag,
  Star,
  Languages,
  Headset,
  MessagesSquare,
  UserRoundPlus,
  Package,
  Handshake,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import getPhoneObject from "@/lib/phoneobject";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/api/axiosintercepter";
import { showSuccess } from "@/helpers/notification_helper";
import Cookies from "js-cookie";
import { setAuth } from "@/store/actions";
import { IoIosLogOut } from "react-icons/io";
const TailwindPhoneInput = forwardRef((props, ref) => (
  <Input
    {...props}
    ref={ref}
    placeholder="9876543210"
    className={`pr-10 py-2 text-sm  ${props.className || ""}`}
  />
));

const Profile = ({setIsProfileOpen, desktop }) => {
  const navigate = useNavigate();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (e, setFieldValue) => {
    setFieldValue('phone', e)
    setPhone(e)
  };

  const user = useSelector(state => state.Auth)
  const [phone, setPhone] = useState(user?.user?.phone?.code + user?.user?.phone?.number);

  const languageOptions = [
    { id: "english", name: "English", selected: true },
    { id: "arabic", name: "(اللغة العربية) Arab", selected: false },
  ];

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters")
      .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
      .required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .transform(value => value.replace(/\s/g, "")) // remove spaces
      .matches(/^\+\d{10,15}$/, "Invalid phone number format")
      .required("Phone number is required"),
  })

  const initialValues = {
    name: user?.user?.name,
    email: user?.user?.email,
    phone: user?.user?.phone?.code + user?.user?.phone?.number,
  };

  const handleSubmit = async (values, { setSubmitting }) => {

    try {
      const response = await axiosInstance.put('user/profile', {
        name: values.name,
        email: values.email,
        phone: getPhoneObject(values?.phone)
      });
      const newUser = {
        ...user?.user,
        name: values.name,
        email: values.email,
        phone: getPhoneObject(values?.phone)
      }
      if (response.status == 200) {
        showSuccess(response?.data?.message);
        Cookies.set(JSON.stringify(newUser))
        dispatch(setAuth(newUser))
      }
    } catch (error) {

    }
  };

  const handleCancel = () => {
    setShowEditProfile(false);
  };

  const handleLogout =()=>{
   Cookies.remove('user');
  showSuccess("Logout Successfully!");
  setTimeout(() => {
    window.location.href = '/login';
  }, 700); 
  }

  return (
    <>
      <div className="h-screen bg-white overflow-y-auto">
        {showEditProfile ? (
          // Edit Profile View
          <>
            {/* Header */}
            <div className="bg-blue-600 px-4 py-3 flex items-center justify-between">
              <button onClick={() => setShowEditProfile(false)} className="text-white">
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-white font-medium">Personal Information</h1>
              <button onClick={() => setShowEditProfile(false)} className="text-white">
                <X size={20} />
              </button>
            </div>

            {/* Profile Banner */}
            <div className="relative h-48 overflow-hidden">
              {/* Blurred Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center blur-sm scale-110"
                style={{
                  backgroundImage: `url(${user?.user?.profilePic})`
                }}
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40"></div>
              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center">
                <img
                  src={user?.user?.profilePic || "https://res.cloudinary.com/munkee/image/upload/v1689371378/instasize-website/learn/headshot-red-woman.webp"}
                  alt={user?.user?.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <h2 className="text-white font-medium mt-2">{user?.user?.name}</h2>
                <p className="text-white/90 text-sm">{user?.user?.email}</p>
              </div>
            </div>

            {/* Information Fields */}
            <div className="px-4 py-6">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
              >
                {({ isSubmitting, errors, touched, setFieldValue }) => (
                  <Form className="space-y-6">
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="text"
                        name="name"
                        id="name"
                        className={`w-full px-3 py-2 border rounded-lg bg-white focus:outline-none transition-colors ${errors.name && touched.name
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-gray-300 focus:border-blue-500'
                          }`}
                        placeholder="Enter your full name"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>

                    {/* Email Address */}
                    <div className="space-y-1">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        className={`w-full px-3 py-2 border rounded-lg bg-white focus:outline-none transition-colors ${errors.email && touched.email
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-gray-300 focus:border-blue-500'
                          }`}
                        placeholder="Enter your email address"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>

                    {/* Mobile Number */}
                    <div className="space-y-1">
                      <label htmlFor="mobile" className="text-sm font-medium text-gray-700">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <PhoneInput
                        inputComponent={TailwindPhoneInput}
                        international
                        name="phone"
                        defaultCountry="IN"
                        placeholder="Used for OTP login"
                        value={phone}
                        onChange={(e) => handleChange(e, setFieldValue)}
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Updating...' : 'Update Profile'}
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </>
        ) : (
          // Profile Menu View
          <>
            {!desktop && (
              <div className="bg-white p-4 flex items-center justify-between border-b border-gray-200">
                <h1 className="text-lg font-semibold">Profile</h1>
                <button className="p-2" onClick={() => navigate(-1)}>
                  <X size={20} />
                </button>
              </div>
            )}

            <div className="bg-[#F6F8FF] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={user?.user?.profilePic}
                  alt={user?.user?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-medium text-base text-[#09090B]">
                    {user?.user?.name}
                  </h2>
                  <p className="text-sm text-gray-500">{user?.user?.email}</p>
                </div>
              </div>
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium"
                onClick={() => setShowEditProfile(true)}
              >
                Edit Profile
              </button>
            </div>

            {/* MY ACCOUNT Section */}
            <div className="bg-white px-4 py-2">
              <h3 className="text-sm font-medium text-[#71717A] mb-1">
                MY ACCOUNT
              </h3>

              <div>
                <div className="flex items-center justify-between py-2 cursor-pointer" onClick={handleLogout}>
                  <div className="flex items-center gap-3" >
                    <div className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center">
                      <IoIosLogOut
                        className="text-gray-600 w-6 h-6" strokeWidth={"1.5px"} />
                    </div>
                    <span className="text-[var(--primary)]">Logout</span>
                  </div>
                  <ChevronRight className="text-gray-400 w-5 h-5" />
                </div>
                {/* <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center">
                      <User className="text-gray-600 w-6 h-6" strokeWidth={"1.5px"} />
                    </div>
                    <span className="text-[var(--primary)]">Account Information</span>
                  </div>
                  <ChevronRight className="text-gray-400 w-5 h-5" />
                </div> */}

                {/* <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center">
                      <MapPin className="text-gray-600 w-6 h-6" strokeWidth={"1.5px"} />
                    </div>
                    <span className="text-[var(--primary)]">Address Book</span>
                  </div>
                  <ChevronRight className="text-gray-400 w-5 h-5" />
                </div> */}

                {/* <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center">
                      <CreditCard className="text-gray-600 w-6 h-6" strokeWidth={"1.5px"} />
                    </div>
                    <span className="text-[var(--primary)]">Saved Debit Cards / Credit Cards</span>
                  </div>
                  <ChevronRight className="text-gray-400 w-5 h-5" />
                </div> */}

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3 cursor-pointer" onClick={()=>{setIsProfileOpen(false); navigate('/orders');}}>
                    <div className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center">
                      <ShoppingBag className="text-gray-600 w-6 h-6" strokeWidth={"1.5px"} />
                    </div>
                    <span className="text-[var(--primary)]">My Orders</span>
                  </div>
                  <ChevronRight className="text-gray-400 w-5 h-5" />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3" onClick={()=>{setIsProfileOpen(false); navigate('/wishlist')}}>
                    <div className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center">
                      <Heart className="text-gray-600 w-6 h-6" strokeWidth={"1.5px"} />
                    </div>
                    <span className="text-[var(--primary)]">My Wishlist</span>
                  </div>
                  <ChevronRight className="text-gray-400 w-5 h-5" />
                </div>
              </div>
            </div>

            {/* MY PREFERENCES Section */}
            <div className="bg-white px-4 py-2">
              <h3 className="text-sm font-medium text-[#71717A] mb-1">
                MY PREFERENCES
              </h3>

              <div>
                <div className="flex items-center justify-between py-2" onClick={() => setShowLanguagePopup(true)}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center">
                      <Languages className="text-gray-600 w-6 h-6" strokeWidth={"1.5px"} />
                    </div>
                    <span className="text-[var(--primary)]">Language</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">{user.language}</span>
                    <ChevronRight className="text-gray-400 w-5 h-5" />
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center">
                      <Flag className="text-gray-600 w-6 h-6" strokeWidth={"1.5px"} />
                    </div>
                    <span className="text-[var(--primary)]">Country</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center mr-2">
                      <img
                        src="/api/placeholder/16/16"
                        alt="India flag"
                        className="w-4 h-4 mr-1"
                      />
                      <span className="text-gray-500">{user.country}</span>
                    </div>
                    <ChevronRight className="text-gray-400 w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* HELP & SUPPORT Section */}
            {/* <div className="bg-white px-4 py-2">
              <h3 className="text-sm font-medium text-[#71717A] mb-1">
                HELP & SUPPORT
              </h3>

              <div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center">
                      <Headset className="text-gray-600 w-6 h-6" strokeWidth={"1.5px"} />
                    </div>
                    <span className="text-[var(--primary)]">Contact us</span>
                  </div>
                  <ChevronRight className="text-gray-400 w-5 h-5" />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center">
                      <MessagesSquare className="text-gray-600 w-6 h-6" strokeWidth={"1.5px"} />
                    </div>
                    <span className="text-[var(--primary)]">Frequently asked questions</span>
                  </div>
                  <ChevronRight className="text-gray-400 w-5 h-5" />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center">
                      <Star className="text-gray-600 w-6 h-6" strokeWidth={"1.5px"} />
                    </div>
                    <span className="text-[var(--primary)]">Rate our app</span>
                  </div>
                  <ChevronRight className="text-gray-400 w-5 h-5" />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center">
                      <UserRoundPlus className="text-gray-600 w-6 h-6" strokeWidth={"1.5px"} />
                    </div>
                    <span className="text-[var(--primary)]">Invite Friends</span>
                  </div>
                  <ChevronRight className="text-gray-400 w-5 h-5" />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center">
                      <Package className="text-gray-600 w-6 h-6" strokeWidth={"1.5px"} />
                    </div>
                    <span className="text-[var(--primary)]">Delivery Information</span>
                  </div>
                  <ChevronRight className="text-gray-400 w-5 h-5" />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center">
                      <Handshake className="text-gray-600 w-6 h-6" strokeWidth={"1.5px"} />
                    </div>
                    <span className="text-[var(--primary)]">Terms & Conditions</span>
                  </div>
                  <ChevronRight className="text-gray-400 w-5 h-5" />
                </div>
              </div>
            </div> */}
          </>
        )}

        {/* Language Selection Popup */}
        {showLanguagePopup && (
          <div className="absolute inset-0 bg-black/50 flex items-end justify-center z-50">
            <div className="bg-white rounded-t-2xl w-full">
              {/* Popup Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Language</h3>
                <button
                  onClick={() => setShowLanguagePopup(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Language Options */}
              <div className="p-4">
                {languageOptions.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2"
                    onClick={() => {
                      setUser(prev => ({ ...prev, language: option.name }));
                      setShowLanguagePopup(false);
                    }}
                  >
                    <span className="text-gray-900">{option.name}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${user.language === option.name
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300'
                      }`}>
                      {user.language === option.name && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
