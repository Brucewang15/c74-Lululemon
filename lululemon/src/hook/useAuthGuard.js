import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useAuthGuard = () => {
  const navigate = useNavigate();
  const userId =
    useSelector((state) => state.authReducer.user)?.id ||
    JSON.parse(localStorage.getItem("userInfo"))?.id;

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [userId, navigate]);

  return userId;
};
