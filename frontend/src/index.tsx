import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./features/contexts/UserContext";
import { FriendContextProvider } from "./features/contexts/FriendContext";
import { NotificationContextProvider } from "./features/contexts/NotificationContext";
import {
  ChallengeContextProvider,
} from "./features/contexts/ChallengeContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  //Desactivate Strict Mode during Developpement to avoid multiple logs
  /*  <React.StrictMode> */
  <BrowserRouter>
    <UserContextProvider>
      <FriendContextProvider>
        <NotificationContextProvider>
          <ChallengeContextProvider>
            <App />
          </ChallengeContextProvider>
        </NotificationContextProvider>
      </FriendContextProvider>
    </UserContextProvider>
  </BrowserRouter>
  /*   </React.StrictMode> */
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
