import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "@/utils/constant";

const AdminAuth = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/profile/view`,
          { withCredentials: true } // 🍪 cookies sent automatically
        );

        if (res.data?.user?.role?.toLowerCase() === "admin") {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Admin check failed", error);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  if (loading) return <p>Checking admin access...</p>;

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminAuth;
