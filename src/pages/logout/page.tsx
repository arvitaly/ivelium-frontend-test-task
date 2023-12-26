import { useContext, useEffect } from "react";
import { TOKEN_STORAGE_NAME } from "../../constants";
import { useNavigate } from "react-router-dom";
import { formatLink } from "../../util/router";
import TokenContext from "../../contexts/TokenContext";

const LogoutPage = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(TokenContext);

  useEffect(() => {
    setToken("");
    localStorage.removeItem(TOKEN_STORAGE_NAME);
    navigate(formatLink("/login"));
  }, [navigate, setToken]);
  return null;
};

export default LogoutPage;
