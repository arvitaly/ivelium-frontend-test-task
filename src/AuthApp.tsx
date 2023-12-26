import { ApolloProvider } from "@apollo/client";
import { useContext, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import TokenContext from "./contexts/TokenContext";
import { createApolloClient } from "./util/apollo";
import { Layout, Menu } from "antd";
import { formatLink } from "./util/router";

const AuthApp = () => {
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate(formatLink("/login"));
    }
  }, [navigate, token]);
  const client = createApolloClient(token);

  return (
    <ApolloProvider client={client}>
      <Layout style={{ minHeight: "100%" }}>
        <Layout.Header
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Menu
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              flex: 1,
              minWidth: 0,
            }}
            theme="dark"
            mode="horizontal"
            items={[
              {
                key: "logout",
                label: <Link to={formatLink("/logout")}>Logout</Link>,
              },
            ]}
          />
        </Layout.Header>
        <Layout.Content style={{ width: "600px", margin: "30px auto" }}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </ApolloProvider>
  );
};

export default AuthApp;
