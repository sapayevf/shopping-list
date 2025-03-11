import { Layout } from "antd";
import { useLocation } from "react-router-dom";
import Router from "./router/router";
import AppHeader from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";

const { Content } = Layout;

const App = () => {
  const location = useLocation();
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <Layout
      style={{
        minHeight: hideLayout ? "100vh" : "100%",
        background: "#f0f2f5",
        overflow: "hidden",
      }}
    >
      {!hideLayout && <Sidebar />}
      <Layout style={{ }}>
        {!hideLayout && <AppHeader />}
        <Content
          style={{
            padding: hideLayout ? "0" : "20px",
            maxWidth: "1500px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Router />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
