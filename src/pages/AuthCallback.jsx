import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const error = searchParams.get("error");

    if (error) {
      toast.error("Google sign-in failed. Please try again.");
      navigate("/login");
      return;
    }

    if (token) {
      // Store credentials in localStorage (same as normal login)
      localStorage.setItem("token", token);
      localStorage.setItem("userName", name || "");
      localStorage.setItem("userEmail", email || "");
      toast.success("Login Success");
      navigate("/dashboard");
    } else {
      toast.error("Authentication failed. No token received.");
      navigate("/login");
    }
  }, [searchParams, navigate]);

  return (
    <div className="flex w-full flex-col items-center justify-center min-h-screen bg-gray-950 text-gray-300">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
      <p className="mt-4 text-gray-400">Signing you in...</p>
    </div>
  );
}
