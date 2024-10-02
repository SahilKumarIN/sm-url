import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/home";
import Auth from "./Pages/auth";
import Dashboard from "./Pages/Dashboard";
import Redirect from "./Pages/Redirect";
import Link from "./Pages/Link";
import AuthCheck from "./auth";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/dashboard"
          element={
            <AuthCheck>
              <Dashboard />
            </AuthCheck>
          }
        />
        <Route path="/:id" element={<Redirect />} />
        <Route
          path="/dashboard/urls/:urlId"
          element={
            <AuthCheck>
              <Link />
            </AuthCheck>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
