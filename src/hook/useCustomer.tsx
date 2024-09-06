import { useContext } from "react";
import { CustomerContext, CustomerContextData } from "../context/Customer";

function useCustomer(): CustomerContextData {
    const context = useContext(CustomerContext);

    if (!context) {
        throw new Error("useCustomer must be used within an OwnerProvider");
    }

    return context;
}

export { useCustomer };