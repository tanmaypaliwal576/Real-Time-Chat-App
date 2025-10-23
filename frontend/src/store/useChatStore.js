import { create } from "zustand";

export const useChatStore = create((set, get) => {
  allContacts: [];
  chats: [];
  messages: [];
  activetab: "chats";
  selectedUser: null;

  isUsersLoading: false;
  isMessagesLoading: false;
  isSoundEnabled: localStorage.getItem("isSoundEnabled") === true;

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  };

  setActiveTab: (tab) => set({ activetab: tab });
  setSelectedUser: (user) => set({ selectedUser: user });

  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      set({ isUsersLoading: false });
    }
  };

  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      set({ isUsersLoading: false });
    }
  };
});
