import React from "react";
import { Navigate } from "react-router-dom";

interface IGuardRoute {
  children: JSX.Element;
}

const GuardRoute = ({ children }: IGuardRoute) => {
  if (localStorage.getItem("token")?.length) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" replace />;
  }
};
export default GuardRoute;
