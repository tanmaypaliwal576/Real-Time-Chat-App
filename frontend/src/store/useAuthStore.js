import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "https://huddle-app-7muc.onrender.com";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
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

      get().connectSocket();
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

      get().connectSocket();
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
      get().disconnectSocket();
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

      // ✅ FIX: Extract the updated user data from the response
      const updatedUser = res.data;

      // ✅ FIX: Update the global authUser state with the new data
      set({ authUser: updatedUser });

      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile update failed.");
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      withCredentials: true,
    });

    socket.connect();

    set({ socket });

    // listen for online users event
    socket.on("getOnlineUsers", (userIds) => {
      // 🟢 FIX: Update the 'onlineUsers' state property with the new 'userIds' array.
      // This solves the ReferenceError because 'onlineUsers' is now used as a key, not an undefined variable.
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
