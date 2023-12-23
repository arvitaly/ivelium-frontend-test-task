import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./App.css";
import { Input } from "antd";
import { useMemo, useState } from "react";
import Search from "./Search";

const App = () => {
  const [token, setToken] = useState(import.meta.env.VITE_GITHUB_TOKEN);

  const client = useMemo(
    () =>
      new ApolloClient({
        uri: "https://api.github.com/graphql",
        cache: new InMemoryCache(),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    [token]
  );

  return (
    <ApolloProvider client={client}>
      <div className="App">
        Token:
        <Input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <Search />
      </div>
    </ApolloProvider>
  );
};

export default App;
