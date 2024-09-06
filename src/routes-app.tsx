import { Routes as Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home/Home";
import CustomerDetails from "./pages/Customer/customer-details";

export default function RoutesApp() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/customer/:customerId" element={<CustomerDetails />} />
            </Routes>
        </Router>
    )
}