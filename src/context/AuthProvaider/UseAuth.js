import { useContext } from "react";
import { AuthContext } from "./Index";

export const UseAuth = () => {
  const context = useContext(AuthContext);
  return context;
};