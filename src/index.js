import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        components: {
          Table: {
            colorBgContainer: "rgba(185, 189, 192, 0.25)",
            headerBg: "#3f8ef6",
            rowHoverBg: "rgb(166, 166, 166, 0.25)",
            lineHeight: "1",
            headerColor: "#f0f8ff",
            colorText: "#f0f8ff",
          },
        },
        token: {
          colorPrimary: "#004AAD",
          colorLink: "#00bfff",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
