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
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      {!hideLayout && <Sidebar />}
      <Layout>
        {!hideLayout && <AppHeader />}
        <Content
          style={{ padding: "20px", maxWidth: "1500px", margin: "0 auto" }}
        >
          <Router />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
