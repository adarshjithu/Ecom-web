import React, { useEffect, useState } from "react";
import { FaDollarSign, FaBox, FaTruck, FaShoppingCart, FaCube, FaCheckCircle, FaStar, FaCamera } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "@/api/axiosintercepter";
import { formatDate } from "@/helpers/dateHelper";
import InvoiceModal from "@/components/desktop/InvoiceModal";
import CancelOrderModal from "@/components/desktop/orders/CancelOrderModal";
import { showSuccess } from "@/helpers/notification_helper";
import ReorderModal from "@/components/desktop/orders/ReOrderModal";
import { ClipLoader } from "react-spinners";
import OrderSkeleton from "@/components/skeletons/OrderSkeleton";
import { useNavigate } from "react-router-dom";

// Validation schema for review form
const reviewValidationSchema = Yup.object().shape({
  rating: Yup.number()
    .min(1, "Please select a rating")
    .max(5, "Rating cannot exceed 5")
    .required("Rating is required"),
  reviewText: Yup.string()
    .min(10, "Review must be at least 10 characters")
    .max(500, "Review cannot exceed 500 characters")
    .required("Review text is required"),
  reviewTitle: Yup.string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title cannot exceed 100 characters")
    .required("Review title is required"),
  photo: Yup.mixed()
    .nullable()
    .test("fileSize", "File size must be less than 5MB", (value) => {
      if (!value) return true; // Photo is optional
      return value.size <= 5 * 1024 * 1024; // 5MB limit
    })
    .test("fileType", "Only image and video files are allowed", (value) => {
      if (!value) return true; // Photo is optional
      const allowedTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4", "video/avi"];
      return allowedTypes.includes(value.type);
    })
});

const statusColors = {
  placed: "text-blue-600 border-blue-300 bg-blue-50",
  shipped: "text-blue-400 border-blue-200 bg-blue-50",
  "Out for delivery": "text-blue-500 border-blue-200 bg-blue-50",
  cancelled: "text-red-500 border-red-200 bg-red-50",
  delivered: "text-green-600 border-green-200 bg-green-50",
  Failed: "text-indigo-600 border-indigo-200 bg-indigo-50",
  Returned: "text-red-600 border-red-200 bg-red-50"
};

const tabList = [
  "Order details",
  "Track Order",
  "Product Review",
  "Download Invoice",
  "Cancel Order",
  "Reorder Again"
];

const trackOrderData = {
  orderId: "#481293",
  items: 4,
  amount: "AED 273.65",
  estimatedDelivery: "Jul 24, 2025 at 3PM",
  status: "Processing",
  steps: [
    {
      date: "Jul 16",
      time: "3:56 PM",
      title: "Order Confirmed",
      desc: "The order has been successfully confirmed by our system",
      status: "done"
    },
    {
      date: "Jul 16",
      time: "3:56 PM",
      title: "Order Paid",
      desc: "Your payment has been received",
      status: "done"
    },
    {
      date: "Jul 16",
      time: "3:56 PM",
      title: "Order Packed",
      desc: "All items from your order were packed",
      status: "done"
    },
    {
      date: "Jul 17",
      time: "3:56 PM",
      title: "Package Shipped",
      desc: "Your package has been sent from our store to DHL Dubai, Karama Centre",
      status: "current",
      link: true
    },
    {
      date: "Jul 18",
      time: "3:56 PM",
      title: "Receive Order",
      desc: "Your order has been received by DHL Dubai",
      status: "upcoming"
    },
    {
      date: "Jul 19",
      time: "3:56 PM",
      title: "Out for Delivery",
      desc: "The order has been successfully confirmed by our system",
      status: "upcoming"
    },
    {
      date: "Jul 20",
      time: "3:56 PM",
      title: "Delivered",
      desc: "The order has been successfully confirmed by our system",
      status: "upcoming"
    }
  ]
};

const progressSteps = [
  { label: "Placed", icon: <FaDollarSign /> },
  // { label: "Processing", icon: <FaBox /> },
  { label: "Shipped", icon: <FaTruck /> },
  { label: "Delivered", icon: <FaShoppingCart /> },
  { label: "Cancelled", icon: <FaCube /> }
];

const OrderPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(0);
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState();
  const [showInvoice, setshowInvoice] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showReOrderModal, setShowReOrderModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Review form state
  const [uploadedPhoto, setUploadedPhoto] = useState(null);

  // Initial values for Formik
  const initialReviewValues = {
    rating: 0,
    reviewText: "",
    reviewTitle: "",
    images: []
  };

  // Handle review submission
  const handleReviewSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();

      formData.append("comment", values?.reviewText);
      formData.append("title", values?.reviewTitle);
      formData.append("rating", values?.rating);
      formData.append("product", selectedProduct?.productId?._id);

      // append multiple files
      if (values?.photos && values.photos.length > 0) {
        values.photos.forEach((file) => {
          formData.append("images", file);
        });
      }

      const response = await axiosInstance.post("/user/reviews", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response) {
        showSuccess("Review added successfully");
        setSelectedProduct(null);
        setSubmitting(false);
        resetForm();
        setUploadedFiles([]);
      }
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
  };


  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('user/orders');
      setOrders(response?.data?.data);
      setSelectedOrder(response?.data?.data[0]?._id);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchOrderDetails = async () => {
    try {
      const response = await axiosInstance.get(`user/orders/${selectedOrder}`);
      if (response) {
        setOrderDetails(response.data.data);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [])

  useEffect(() => {
    if (selectedOrder) {
      fetchOrderDetails();
    }
  }, [selectedOrder]);

  const handleTabClick = (tab, idx) => {
    setActiveTab(idx)
    if (tab == "Download Invoice") {
      setshowInvoice(true)
    }
    if (tab == "Cancel Order") {
      setShowCancelModal(true)
    }
    if (tab == "Reorder Again") {
      setShowReOrderModal(true);
    }
  };

  const handleCancelModal = () => {
    setShowCancelModal(false);
  }

  const onClose = () => {
    setshowInvoice(false)
  }

  const handleCancelSubmit = async (reason) => {
    try {
      const response = await axiosInstance.patch(`user/orders/cancel/${selectedOrder}`, {
        "reason": reason
      });
      setShowCancelModal(false)
      showSuccess("Order Cancelled!")
    } catch (error) {
      console.log(error);
    }
  }

  const handleReOrder = async () => {
    try {
      const response = await axiosInstance.post(`user/orders/reorder/${selectedOrder}`);
      if (response) {
        showSuccess(response?.data?.message);
        setShowReOrderModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const currentStatusIndex = progressSteps.findIndex(
    (step) => step.label.toLowerCase() === orderDetails?.orderStatus?.toLowerCase()
  );

  return (
    <>
      {loading && <OrderSkeleton />}
      {(orders?.length > 0 && !loading) && <div className="bg-[#fafbfc] min-h-screen py-4 md:py-8">
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 mb-6 gap-2">
            <span className="cursor-pointer" onClick={() => navigate('/')}>Home</span>
            <span className="mx-1">&gt;</span>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">My Orders</span>
          </div>
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tabList.map((tab, idx) => {
              if (tab === "Cancel Order" && orders?.filter(item => item?._id == selectedOrder)?.[0]?.orderStatus?.toLowerCase() == "cancelled") return null;
              return (<button
                key={tab}
                className={`px-4 py-2 rounded font-medium border whitespace-nowrap ${activeTab === idx ? "bg-blue-700 text-white" : "bg-white text-gray-800"
                  }`}
                onClick={() => handleTabClick(tab, idx)}
              >
                {tab}
              </button>)
            })
            }
          </div>
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
            {/* Order History */}
            <div className="w-full lg:w-80 bg-white rounded-xl border p-4 flex-shrink-0 mb-0">
              <div className="font-semibold text-base md:text-lg mb-4">Order history</div>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {loading ? (
                  <OrderSkeleton />
                ) : (
                  orders.map((order, idx) => (
                    <div
                      key={idx}
                      className={`rounded-lg border p-4 cursor-pointer ${selectedOrder == order?._id
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 bg-white"
                        }`}
                      onClick={() => setSelectedOrder(order?._id)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold">{order?.orderNumber}</span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full border whitespace-nowrap ${statusColors[order?.orderStatus?.toLowerCase()]
                            }`}
                        >
                          {order?.orderStatus?.toLowerCase()}
                        </span>
                      </div>
                      <div className="text-gray-700 font-medium">AED {order?.totalAmount}</div>
                      <div className="text-xs text-gray-500">{order?.items} items</div>
                      <div className="text-xs text-gray-400">
                        Ordered on {formatDate(order?.createdAt)}
                      </div>
                    </div>
                  ))
                )}
                {orders?.length <= 0 && <div className="min-h-[600px] flex justify-center items-center"><h2 className="text-3xl">No Orders found</h2></div>}
              </div>
            </div>
            {/* Main Content (Order Details, Payment, Delivery, Track Order) */}
            <div className="flex-1 flex flex-col gap-4 md:gap-6 ">
              {activeTab === 1 ? (
                <div className="bg-white rounded-xl border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-semibold text-base md:text-lg">Order {orderDetails?.orderNumber}</span>
                      <span className="text-gray-500 text-xs md:text-sm ml-2">({orderDetails?.items?.length} items)</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full border text-blue-600 border-blue-300 bg-blue-50">
                      {orderDetails?.orderStatus}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-6 mb-8">
                    <div>
                      <div className="text-xs text-gray-500">Order</div>
                      <div className="font-semibold text-gray-800">Paid</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Amount</div>
                      <div className="font-semibold text-gray-800">AED {orderDetails?.totalAmount}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">date</div>
                      <div className="font-semibold text-gray-800">{formatDate(orderDetails?.createdAt)}</div>
                    </div>
                  </div>
                  {/* Progress Bar - responsive */}
                  <div className="relative flex items-center justify-between w-full mb-6" style={{ height: '48px' }}>
                    {/* Horizontal line behind steps */}
                    <div
                      className="absolute left-0 right-0"
                      style={{
                        top: '10px', // default for md+
                        height: '4px',
                        zIndex: 0,
                        display: 'flex'
                      }}
                    >
                      {progressSteps.map((_, idx) => {
                        if (idx === progressSteps.length - 1) return null;
                        const stepIndex = progressSteps.findIndex(s => s.label?.toLowerCase() === orderDetails?.orderStatus?.toLowerCase());
                        const isCompleted = idx < stepIndex;
                        return (
                          <div
                            key={idx}
                            style={{
                              flex: 1,
                              height: '4px',
                              background: isCompleted ? '#000' : '#e5e7eb'
                            }}
                          />
                        );
                      })}
                    </div>
                    {progressSteps.map((step, idx) => {
                      const stepIndex = progressSteps.findIndex(s => s.label?.toLowerCase() === orderDetails?.orderStatus?.toLowerCase());
                      const isCompleted = idx < stepIndex;
                      const isCurrent = idx === stepIndex;
                      const circleBg = isCompleted ? "bg-black" : isCurrent ? "bg-blue-800" : "bg-gray-300";
                      const iconColor = isCompleted || isCurrent ? "text-white" : "text-gray-500";
                      const labelColor = isCurrent ? "text-blue-800 font-semibold" : "text-black";
                      return (
                        <div key={step.label} className="relative flex flex-col items-center z-10 flex-1">
                          <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center ${circleBg} relative`}>
                            <span className={`text-lg md:text-2xl ${iconColor}`}>{step.icon}</span>
                            {isCompleted && (
                              <FaCheckCircle className="absolute -top-2 -right-2 text-green-500 bg-white rounded-full" size={16} style={{ fontSize: '16px' }} />
                            )}
                          </div>
                          <span className={`mt-2 text-xs md:text-base ${labelColor}`}>{step.label}</span>
                        </div>
                      );
                    })}
                  </div>
                  {/* Track Details Timeline */}
                  <div>
                    <div className="font-semibold mb-2">Track Details</div>
                    <div>
                      {progressSteps?.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-4 mb-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-3 h-3 rounded-full ${idx < currentStatusIndex ? "bg-green-500" : idx == currentStatusIndex ? "bg-blue-600" : "bg-gray-300"}`}></div>
                            {idx < trackOrderData.steps.length - 1 && (
                              <div className={`w-1 h-8 ${idx < currentStatusIndex ? "bg-green-500" : "bg-gray-200"}`}></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              {/* <span className="text-xs text-gray-500">{step.date}</span> */}
                              <span className="font-semibold text-sm">{step?.label}</span>
                              {/* {step.link && (
                              <a href="#" className="text-blue-600 underline text-xs ml-2">View Details</a>
                            )} */}
                            </div>
                            {/* <div className="text-xs text-gray-500">{step.desc}</div> */}
                          </div>
                          {/* <div className="text-xs text-gray-400">{step.time}</div> */}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : activeTab === 2 ? (
                // Product Review Section
                <div className="bg-white rounded-xl border p-4">
                  <div className="font-semibold text-base md:text-lg mb-4">
                    Product Reviews
                  </div>

                  {/* List all items from order */}
                  <div className="space-y-3">
                    {orderDetails?.items.map((item) => (
                      <div
                        key={item.productId._id}
                        className="flex items-center justify-between border rounded-xl p-3 bg-white shadow-sm"
                      >
                        {/* Left: Thumbnail */}
                        <div className="flex items-center gap-3">
                          <img
                            src={item.productId.thumbnail}
                            alt={item.productId.name}
                            className="h-12 w-12 object-contain rounded-md border"
                          />
                          <div className="text-sm  font-medium text-gray-800 leading-snug max-w-xs">
                            <p>{item.productId.name}</p>
                            <p className="text-gray-400" style={{ fontSize: '13px' }}>Qty: {item?.quantity}</p>
                            <p className="text-gray-400" style={{ fontSize: '13px' }}>AED {item?.price?.toFixed(2)}</p>
                          </div>
                        </div>

                        {/* Right: Button */}
                        <button
                          className="px-4 py-2 text-sm text-gray-700 border rounded-lg hover:bg-gray-100 transition"
                          onClick={() => setSelectedProduct(item)}
                        >
                          Write a review
                        </button>
                      </div>
                    ))}
                  </div>


                  {/* Modal for Review Form */}
                  {selectedProduct && (
                    <div className="fixed inset-0 z-50 flex px-2 md:px-0 items-center justify-center bg-black/50">
                      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl p-6 relative">
                        {/* Close Button */}
                        <button
                          onClick={() => setSelectedProduct(null)}
                          className="absolute top-3 right-3 text-gray-500 hover:text-black"
                        >
                          ✕
                        </button>

                        <div className="flex items-center gap-3 mb-6">
                          <img
                            src={selectedProduct.productId.thumbnail}
                            alt={selectedProduct.productId.name}
                            className="h-16 w-16 object-contain rounded-lg border"
                          />
                          <div>
                            <div className="font-medium text-gray-900">
                              {selectedProduct.productId.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              Qty: {selectedProduct.quantity}
                            </div>
                          </div>
                        </div>

                        <Formik
                          initialValues={initialReviewValues}
                          validationSchema={reviewValidationSchema}
                          onSubmit={handleReviewSubmit}
                        >
                          {({
                            values,
                            errors,
                            touched,
                            setFieldValue,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                          }) => (
                            <Form className="space-y-6">
                              {/* Rating */}
                              <div>
                                <div className="font-semibold text-sm mb-3">
                                  How was the item?{" "}
                                  <span className="text-red-500">*</span>
                                </div>
                                <div className="flex gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                      key={star}
                                      type="button"
                                      className={`text-2xl transition-colors ${star <= values.rating
                                        ? "text-yellow-400"
                                        : "text-gray-300 hover:text-yellow-400"
                                        }`}
                                      onClick={() => setFieldValue("rating", star)}
                                    >
                                      <FaStar />
                                    </button>
                                  ))}
                                </div>
                                {errors.rating && touched.rating && (
                                  <div className="text-red-500 text-xs mt-1">
                                    {errors.rating}
                                  </div>
                                )}
                              </div>

                              {/* Review Text */}
                              <div>
                                <div className="font-semibold text-sm mb-3">
                                  Write a review <span className="text-red-500">*</span>
                                </div>
                                <Field
                                  as="textarea"
                                  name="reviewText"
                                  className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="What other customers should know?"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {errors.reviewText && touched.reviewText && (
                                  <div className="text-red-500 text-xs mt-1">
                                    {errors.reviewText}
                                  </div>
                                )}
                              </div>

                              {/* Photo/Video Upload */}
                              <div>
                                <div className="font-semibold text-sm mb-3">
                                  Share a video or photo
                                </div>
                                <div
                                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer"
                                  onClick={() => {
                                    const input = document.createElement("input");
                                    input.type = "file";
                                    input.accept = "image/*,video/*";
                                    input.multiple = true; // allow multiple
                                    input.onchange = (e) => {
                                      const files = Array.from(e.target.files);
                                      if (files.length > 0) {
                                        setFieldValue("photos", files); // set in Formik
                                        setUploadedFiles(files.map((file) => URL.createObjectURL(file)));
                                      }
                                    };
                                    input.click();
                                  }}
                                >
                                  {uploadedFiles.length > 0 ? (
                                    <div className="grid grid-cols-3 gap-2">
                                      {uploadedFiles.map((fileUrl, idx) => (
                                        <div key={idx} className="relative">
                                          <img
                                            src={fileUrl}
                                            alt="Uploaded"
                                            className="mx-auto max-h-32 rounded object-cover"
                                          />
                                        </div>
                                      ))}
                                      <div className="col-span-3 text-green-600 text-sm mt-2">
                                        {uploadedFiles.length} file(s) uploaded!
                                      </div>
                                    </div>
                                  ) : (
                                    <>
                                      <FaCamera className="mx-auto text-3xl text-gray-400 mb-2" />
                                      <div className="text-gray-500 text-sm">
                                        Click to upload photos or videos
                                      </div>
                                    </>
                                  )}
                                </div>

                              </div>

                              {/* Title */}
                              <div>
                                <div className="font-semibold text-sm mb-3">
                                  Title your review{" "}
                                  <span className="text-red-500">*</span>
                                </div>
                                <Field
                                  type="text"
                                  name="reviewTitle"
                                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                  placeholder="What's most important to know!"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {errors.reviewTitle && touched.reviewTitle && (
                                  <div className="text-red-500 text-xs mt-1">
                                    {errors.reviewTitle}
                                  </div>
                                )}
                              </div>

                              {/* Submit */}
                              <div className="flex justify-end">
                                <button
                                  type="submit"
                                  style={{ minWidth: '100px' }}
                                  className="bg-blue-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800 disabled:bg-gray-400"
                                  disabled={
                                    isSubmitting ||
                                    !values.rating ||
                                    !values.reviewTitle.trim() ||
                                    !values.reviewText.trim()
                                  }
                                >
                                  {isSubmitting ? <ClipLoader size={20} /> : "Submit"}
                                </button>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* Order Details Card */}
                  <div className="bg-white rounded-xl border p-4">
                    <div className="font-semibold text-base md:text-lg mb-2">Order {orderDetails?.orderNumber} <span className="text-gray-500 text-xs md:text-sm">({orderDetails?.items?.length} items)</span></div>
                    <div className="divide-y">
                      {orderDetails?.items?.map((item, idx) => (
                        <div key={idx} className="flex items-center py-3 gap-3">
                          <img src={item?.productId?.thumbnail} alt="product" className="w-14 h-14 rounded object-cover border" />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 truncate text-sm">{item?.productId?.name}</div>
                            <div className="text-xs text-gray-500 truncate">{item.desc}</div>
                            <div className="text-xs text-gray-400">{item?.quantity} item</div>
                          </div>
                          <div className="font-semibold text-gray-800 text-right min-w-fit">AED {item?.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Payment Details Card */}
                  <div className="bg-white rounded-xl border p-4">
                    <div className="font-semibold mb-2">Payment Details</div>
                    <div className="flex justify-between text-sm mb-1"><span>Subtotal- 2 items</span><span>AED {orderDetails?.subTotal?.toFixed(2)}</span></div>
                    <div className="flex justify-between text-sm mb-1"><span>TAX</span><span>AED {orderDetails?.tax?.toFixed(2) || '0.00'}</span></div>
                    <div className="flex justify-between text-sm mb-1"><span>Discount</span><span>AED {orderDetails?.discount?.toFixed(2)}</span></div>
                    <div className="flex justify-between text-sm mb-1"><span>Shipping</span><span>AED {orderDetails?.shippingFee?.toFixed(2)}</span></div>
                    <div className="flex justify-between text-base font-semibold border-t pt-2 mt-2"><span>Total</span><span>AED {orderDetails?.totalAmount?.toFixed(2)}</span></div>
                  </div>
                  {/* Delivery Details Card */}
                  <div className="bg-white rounded-xl border p-4">
                    <div className="font-semibold mb-2">Delivery Details</div>
                    <div className="flex justify-between text-sm mb-1"><span className="text-gray-500">Shipping Address:</span><span className="text-gray-800 text-right">{orderDetails?.shippingAddress?.apartment + ',' + orderDetails?.shippingAddress?.building + ',' + orderDetails?.shippingAddress?.street + ',' + orderDetails?.shippingAddress?.city + ',' + orderDetails?.shippingAddress?.area + ',' + orderDetails?.shippingAddress?.emirate}</span></div>
                    <div className="flex justify-between text-sm mb-1"><span className="text-gray-500">Phone Number:</span><span className="text-gray-800 text-right">{orderDetails?.shippingAddress?.phone}</span></div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {showCancelModal && <CancelOrderModal onSubmit={handleCancelSubmit} onClose={handleCancelModal} />}
        <InvoiceModal show={showInvoice} onClose={onClose} order={orderDetails} />
        {showReOrderModal && <ReorderModal onClose={() => setShowReOrderModal(false)} onConfirm={handleReOrder} />}
      </div>}
    </>
  );
};

export default OrderPage; 