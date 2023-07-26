import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";

import PostsList from "./components/posts/list/PostsList";
import UsersList from "./components/users/list/UsersList";
import Navigation from "./components/navigation/Navigation";

import "./App.css";

function App() {
  return (
    <>
      <Layout>
        <Navigation />

        <Layout className="container">
          <Routes>
            <Route path="/" element={<UsersList />} />
            <Route path="/posts/:userId" element={<PostsList />} />
          </Routes>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
