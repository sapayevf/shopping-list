import { Layout } from "antd";
import { useLocation } from "react-router-dom";
import Router from "./router/router";
import AppHeader from "./components/Header/AppHeader";
import Sidebar from "./components/Sidebar/Sidebar";

const { Content } = Layout;

const App = () => {
  const location = useLocation();
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "#f0f2f5",
        display: "flex",
        flexDirection: "row", 
      }}
    >
      {!hideLayout && <Sidebar />}

      <Layout
        style={{
          flex: 1, 
          display: "flex",
          flexDirection: "column", 
        }}
      >
        {!hideLayout && <AppHeader />}
        <Content
          style={{
            padding: hideLayout ? "0" : "20px",
            maxWidth: "1500px",
            height : "100%"
          }}
        >
          <Router />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
