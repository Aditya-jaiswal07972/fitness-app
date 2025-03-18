import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OTPVerification = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    if (!email) return toast.error("Please enter your email");

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:9000/generate-otp", { email });
      toast.success(res.data);
      setOtpSent(true);
    } catch (error) {
      toast.error(error.response?.data || "Error sending OTP");
    }
    setLoading(false);
  };

  const verifyOtp = async () => {
    if (!otp) return toast.error("Please enter OTP");

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:9000/verify-otp", { email, otp });
      toast.success(res.data);
    } catch (error) {
      toast.error(error.response?.data || "Error verifying OTP");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-row items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-96">
        <h3 className="text-2xl font-bold text-center mb-4">OTP Verification</h3>

        {!otpSent ? (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
            />
            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-200"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
            />
            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition duration-200"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OTPVerification;
