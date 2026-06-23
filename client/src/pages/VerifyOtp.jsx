import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { verifyOtp, clearError } from "../redux/authSlice";

const VerifyOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    otpPending,
    pendingEmail,
    isAuthenticated,
    loading,
    error,
  } = useSelector((state) => state.auth);

  const [otp, setOtp] = useState("");

  // handle redirect logic
  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Email verified successfully");
      navigate("/dashboard");
    } else if (!otpPending) {
      navigate("/signup");
    }
  }, [isAuthenticated, otpPending, navigate]);

  // show backend errors
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // submit otp
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        verifyOtp({
          email: pendingEmail,
          otp,
        })
      ).unwrap();
    } catch (err) {
      // redux handles error
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">

        <h2 className="text-2xl font-bold text-center mb-2">
          Verify Email
        </h2>

        <p className="text-center text-gray-600 mb-6">
          OTP sent to{" "}
          <span className="font-semibold">
            {pendingEmail}
          </span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            maxLength={6}
            inputMode="numeric"
            pattern="[0-9]*"
            value={otp}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setOtp(value);
            }}
            placeholder="Enter 6 digit OTP"
            required
            className="w-full border p-3 rounded text-center text-xl tracking-widest"
          />

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full bg-blue-600 text-white p-3 rounded disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;