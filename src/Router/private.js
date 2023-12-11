import { useContext } from "react";
import { AuthContext } from "../Context/Authentication";
import { Navigate } from "react-router-dom";

export default function Private({ children }) {
  const { Logged, loading } = useContext(AuthContext);

  if (loading) {
    return <div></div>;
  }
  if (!Logged) {
    return <Navigate to="/" />;
  }

  return children;
}
