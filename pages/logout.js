import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

export default function Logout() {
  const location = useRouter();
  useEffect(() => {
    localStorage.removeItem("user");
    const cookie = new Cookies();
    cookie.remove("token");
    location.push({ pathname: "/login" });
    toast.info("Logged Out!", {
      position: "top-center",
      hideProgressBar: true,
    });
  });

  return null;
}
