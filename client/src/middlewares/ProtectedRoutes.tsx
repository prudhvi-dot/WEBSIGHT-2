import { useUser } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    navigate("/sign-in");
  }

  return <Outlet />;
};

export default ProtectedRoute;
