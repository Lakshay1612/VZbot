import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import UserIdPage from "./UserIdPage";
import MainApp from "./MainApp";
import Loader from "./components/Loader"; // Create a Loader component

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true); // Show loader on route change
    const timer = setTimeout(() => setLoading(false), 500); // Simulate loading time

    return () => clearTimeout(timer); // Cleanup timeout
  }, [location]);

  return (
    <>
      {loading && <Loader />} {/* Show loader when transitioning */}
      <Routes>
        <Route path="/" element={<UserIdPage />} />
        <Route path="/app" element={<MainApp />} />
      </Routes>
    </>
  );
}

export default function RouterWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
