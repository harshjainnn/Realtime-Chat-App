import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, User, Mail } from "lucide-react";
import defaultAvatar from "../assets/avatar.jpg";
import toast from "react-hot-toast";
const ProfilePage = () => {
  const { authUser, isUpdatingProfile, uploadProfile } = useAuthStore();
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("No file Selected");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      await uploadProfile({ profilePic: base64Image });
    };
  };
  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-8 space-y-8 w-full">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Profile</h1>
          </div>
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="relative">
              <img
                src={authUser.profilePic || defaultAvatar}
                className="size-32 rounded-full object-cover"
                alt=""
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleChange}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading... "
                : "Click the camera icon to update your phone"}
            </p>
            <div className="mt-4 space-y-6 w-2/3">
              <div className="space-y-1.5">
                <div className="relative w-full text-sm text-zinc-400 gap-2">
                  <input
                    defaultValue={authUser.fullName}
                    type="text"
                    className={`input input-bordered w-full pl-10 bg-transparent`}
                  />
                  <User className="w-4 h-4 absolute left-3 top-3 text-zinc-400 pointer-events-none" />
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-6 w-2/3">
              <div className="space-y-1.5">
                <div className="relative w-full text-sm text-zinc-400 gap-2">
                  <input
                    defaultValue={authUser.email}
                    type="text"
                    className={`input input-bordered w-full pl-10 bg-transparent`}
                  />
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-zinc-400 pointer-events-none" />
                </div>
              </div>
            </div>
            <div className="mt-6 w-full bg-base-300 rounded-xl p-6">
              <div className="text-center font-lg font-medium mb-4">
                Account Information
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                  <span>Member Since</span>
                  <span>{authUser.createdAt?.split("T")[0]}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Status</span>
                  <span className="text-green-500">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
