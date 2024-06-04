/* eslint-disable react/prop-types */
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
// import Private from "./pages/Private";
// import Activate from "./pages/Activate";
// import ResetPassword from "./pages/ResetPassword";
// import ForgetPassword from "./pages/ForgetPassword";
import Navbar from "./components/Navbar";
import AddEvent from "./pages/AddEvent";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import { isAuthenticated } from "./utils/auth";
import Auth from "./pages/Auth";
import EditEvent from "./components/EditEvent";

const ProtectedRoute = ({ element, ...rest }) => {
   return isAuthenticated() ? element : <Navigate to="/login" replace state={{ from: rest.location?.pathname || "/" }} />;
};

function App() {
   return (
      <div className="primary-font ">
         <Router>
            <Navbar />

            <Routes>
               <Route path="/auth" element={<Auth />} />
               <Route path="/add-event" element={<AddEvent />} />
               <Route path="/edit-event/:id" element={<EditEvent />} />
               <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
               <Route path="/not-found" element={<NotFound />} />
               <Route path="/" element={<Home />} />
               <Route path="/" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
               <Route path="*" element={<Navigate to="/not-found" />} />
            </Routes>

            <Footer />
         </Router>
      </div>
   );
}

export default App;
