import { Routes as Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home/Home";
import CustomerDetails from "./pages/Customer/customer-details";
import NewCustomer from "./pages/NewCustomer/new-customer";

export default function RoutesApp() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/customer/:customerId" element={<CustomerDetails />} />
                <Route path="/new-customer" element={<NewCustomer />} />
            </Routes>
        </Router>
    )
}