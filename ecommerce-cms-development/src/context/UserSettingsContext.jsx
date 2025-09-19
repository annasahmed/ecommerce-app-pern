// 🟢 userSettingsContext.tsx
import React, { createContext, useContext } from "react";

export const UserSettingsContext = createContext({
  logo: "",
  logoDark: "",
  isMultiLingual: false,
  isMultiBranch: false,
  isInventory: true,
});

export const UserSettingsProvider = ({ children }) => {
  // 🔹 Ideally fetch this from API or env in real app
  const userSettings = {
    logo: "https://res.cloudinary.com/drju2eij9/image/upload/v1746712700/ecomStore-logo-final-removebg-preview_ievymx.png",
    logoDark:
      "https://res.cloudinary.com/drju2eij9/image/upload/v1746712700/ecomStore-logo-final-removebg-preview_ievymx.png",
    isMultiLingual: true,
    isMultiBranch: false,
    isInventory: true,
  };

  return (
    <UserSettingsContext.Provider value={userSettings}>
      {children}
    </UserSettingsContext.Provider>
  );
};

export const useUserSettings = () => useContext(UserSettingsContext);
