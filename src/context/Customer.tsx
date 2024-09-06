import { createContext, ReactNode, useCallback, useState } from "react";
import { AddressResponse, CustomerDetails, CustomerListResponse, CustomerResponse, EmailResponse, Pagination } from "../types/Customer";
import { api } from "../service/api";

interface CustomerListState {
    customerList: CustomerListResponse;
}

interface CustomerDetailsState {
    customerDetails: CustomerDetails;
}

export interface CustomerContextData {
    customers: CustomerListResponse;
    customer: CustomerDetails;
    getCustomers(pageNumber: number, pageSize: number): Promise<void>;
    get(id: string): Promise<void>;
}

const CustomerContext = createContext<CustomerContextData>({} as CustomerContextData);

const CustomerProvider = ({ children }: { children: ReactNode }) => {
    const [customerListData, setCustomerListData] = useState<CustomerListState>({} as CustomerListState);
    const [customerDetailsData, setCustomerDetailsData] = useState<CustomerDetailsState>({} as CustomerDetailsState);

    const getCustomers = useCallback(async (pageNumber: number, pageSize: number) => {
        const response = await api.get(`/api/customer?pageNumber=${pageNumber}&pageSize=${pageSize}`);

        const data = response.data;

        const customers: CustomerResponse[] = data.data.map((customer: CustomerResponse) => ({
            id: customer.id,
            name: customer.name,
            phone: customer.phone
        }));

        const pagination: Pagination = {
            totalItems: data.totalItems,
            totalPages: data.totalPages,
            pageSize: data.pageSize,
            pageNumber: data.pageNumber
        };

        setCustomerListData({ customerList: { customers, pagination } });
    }, []);

    const getById = useCallback(async (id: string) => {
        const response = await api.get(`/api/customer/${id}`);

        const data = response.data;

        const customer: CustomerResponse = {
            id: data.id,
            name: data.name,
            phone: data.phone
        };

        const email: EmailResponse = {
            email_id: data.email.id,
            email_address: data.email.emailAddress
        };

        const address: AddressResponse = {
            address_id: data.address.id,
            street: data.address.street,
            city: data.address.city,
            state: data.address.state
        };

        setCustomerDetailsData({ customerDetails: { customer, email, address } });
    }, [])

    return (
        <CustomerContext.Provider value={{
            customers: customerListData.customerList,
            customer: customerDetailsData.customerDetails,
            getCustomers,
            get: getById
        }}>
            {children}
        </CustomerContext.Provider>
    );
};

export { CustomerProvider, CustomerContext };