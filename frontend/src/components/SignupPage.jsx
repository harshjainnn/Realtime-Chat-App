import {
  MessageSquare,
  User,
  Mail,
  EyeOff,
  Eye,
  Lock,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore.js";
function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [warn, setWarnings] = useState("");
  const [length, setLength] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
    const pw = e.target.value;
    var regularExpression = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    setLength("");
    setWarnings("");
    if (pw.length < 6 || pw.length > 16) {
      setLength("The password must be 6-16 characters long.");
    }
    if (!regularExpression.test(pw)) {
      setWarnings(
        "The password must contain a letter, a number, a symbol and atleast 1 uppercase character"
      );
    }
  };
  const { signup, isSigningUp } = useAuthStore();
  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full Name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!formData.password.trim()) return toast.error("Password is required");
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const val = validateForm();
    if (val === true) {
      signup(formData);
    }
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/*Left Side*/}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="group flex flex-col items-center gap-2">
              <div className="size-12 rounded-xl bg-white/10 flex items-center justify-center transition-colors group-hover:bg-white/20 ">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="font-bold mt-2">
                Get started with your free account
              </p>
            </div>
          </div>
          {/*form*/}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control space-y-2">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative space-y-3">
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10 bg-transparent`}
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
                <div className="absolute inset-y-0 left-0 pl-3 pb-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40"></User>
                </div>
              </div>
            </div>
            <div className="form-control space-y-2">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative space-y-3">
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10 bg-transparent`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                />
                <div className="absolute inset-y-0 left-0 pl-3 pb-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-white/50"></Mail>
                </div>
              </div>
            </div>
            <div className="form-control space-y-2">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative space-y-3">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10 bg-transparent`}
                  placeholder="*************"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-white/50" />
                  ) : (
                    <Eye className="size-5 text-white/50" />
                  )}
                </button>
                <div className="absolute inset-y-0 left-0 pl-3 pb-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-white/50"></Lock>
                </div>
              </div>
            </div>
            {length && <div style={{ color: "red" }}>{length}</div>}
            {warn && <div style={{ color: "red" }}>{warn}</div>}
            <button
              disabled={isSigningUp}
              type="submit"
              className="btn btn-primary w-full"
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading....
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          <div className="text-center">
            <h1 className="text-center">Already an User?</h1>
            <Link to="/login" className="link link-primary">
              Sign In
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col grid-row-1 justify-center items-center gap-2">
        <div className="flex flex-row grid-cols-3 justify-center items-center gap-2">
          <div className="skeleton h-28 w-28"></div>
          <div className="skeleton h-28 w-28"></div>
          <div className="skeleton h-28 w-28"></div>
        </div>
        <div className="flex flex-row grid-cols-3 justify-center items-center gap-2">
          <div className="skeleton h-28 w-28"></div>
          <div className="skeleton h-28 w-28"></div>
          <div className="skeleton h-28 w-28"></div>
        </div>
        <div className="flex flex-row grid-cols-3 justify-center items-center gap-2">
          <div className="skeleton h-28 w-28"></div>
          <div className="skeleton h-28 w-28"></div>
          <div className="skeleton h-28 w-28"></div>
        </div>
        <div className="mt-4">
          <h1 className="text-3xl font-bold">Welcome To Slack</h1>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
