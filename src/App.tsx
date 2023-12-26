import { useState } from "react";
import "./App.css";

import { Outlet } from "react-router-dom";
import TokenContext from "./contexts/TokenContext";
import { TOKEN_STORAGE_NAME } from "./constants";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem(TOKEN_STORAGE_NAME) || ""
  );

  return (
    <TokenContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      <Outlet />
    </TokenContext.Provider>
  );
};

export default App;
