import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import App from "./App";

import combinedReducer from "./Store/reducers";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const store = createStore(combinedReducer, applyMiddleware(thunk));

root.render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
