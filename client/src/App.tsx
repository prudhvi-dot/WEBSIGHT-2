import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Meeting from "./pages/Meeting";
import Upcoming from "./pages/Upcoming";
import Previous from "./pages/Previous";
import Recordings from "./pages/Recordings";
import ProtectedRoute from "./middlewares/ProtectedRoutes";
import Signin from "./components/Signin";
import StreamVideoProvider from "../providers/StreamClientProvider";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/sign-in" element={<Signin />} />

        {/* Protect these routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<StreamVideoProvider />}>
            <Route path="/" element={<Home />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/previous" element={<Previous />} />
            <Route path="/recordings" element={<Recordings />} />
            <Route path="/meeting/:id" element={<Meeting />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
