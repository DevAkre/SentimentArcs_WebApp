import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {StoreProvider} from "../contexts/StoreContext";

export const ProtectedOutlet = () => {
  const { user } = useAuth();
  return user? <StoreProvider><Outlet/></StoreProvider> : <Navigate to="/login" />;
};