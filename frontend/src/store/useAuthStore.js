import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("error in authcheck");
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      // FIX 1: Changed GET to POST for sending signup data (password, email, etc.)
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });

      toast.success("Account Created Successfully");
    } catch (error) {
      // FIX 2: Added optional chaining (?.) to prevent crashing on network errors
      toast.error(
        error.response?.data?.message || "Signup failed. Check your network."
      );
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });

      toast.success("Logged In Successfully");
    } catch (error) {
      // FIX 2: Added optional chaining (?.) to prevent crashing on network errors
      toast.error(
        error.response?.data?.message || "Login failed. Check your network."
      );
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged Out Successfully");
    } catch (error) {
      console.log(error); // FIX 2: Added optional chaining (?.) to prevent crashing on network errors
      toast.error(
        error.response?.data?.message || "Logout failed. Check your network."
      );
    }
  },

  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile Updated Successfully");
    } catch (error) {
      // FIX 3: Updated to retrieve specific error message from server
      toast.error(error.response?.data?.message || "Profile update failed.");
    }
  },
}));
