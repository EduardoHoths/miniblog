import { createContext, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ value, children }) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthValue(){
  return useContext(AuthContext)
}
