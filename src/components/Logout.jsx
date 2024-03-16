import { useNavigate } from "react-router-dom";
import AuthCxt from "../context/AuthContext";

const Logout = () => {
  const { logout } = AuthCxt();
  const navigate = useNavigate();

  logout();
  navigate("/");

  return <>Logout</>;
};

export default Logout;