import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export const client = new ApolloClient({
	uri: "http://localhost:4000" || process.env.SERVER_URL,
	cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);
