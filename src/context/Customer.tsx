import { createContext, ReactNode, useCallback, useState } from "react";
import { AddressResponse, CustomerDetails, CustomerListResponse, CustomerRequest, CustomerResponse, EmailResponse, Pagination } from "../types/types";
import { api } from "../service/api";
import { AxiosError } from "axios";

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
    createCustomer(customer: CustomerRequest): Promise<void>;
    error: string;
    setError: (error: string) => void;
    loadingCreateCustomer: boolean;
}

const CustomerContext = createContext<CustomerContextData>({} as CustomerContextData);

const CustomerProvider = ({ children }: { children: ReactNode }) => {
    const [customerListData, setCustomerListData] = useState<CustomerListState>({} as CustomerListState);
    const [customerDetailsData, setCustomerDetailsData] = useState<CustomerDetailsState>({} as CustomerDetailsState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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

    const createCustomer = useCallback(async (customer: CustomerRequest) => {
        setLoading(true);
        try {
            const response = await api.post(`/api/customer`, {
                name: customer.name,
                phone: customer.phone,
                addresses: customer.addresses,
                emails: customer.emails
            });

            if (response.status === 200) {
                getCustomers(1, 5);
                setError('');
            }
        } catch (error) {
            const asyncError = async () => {
                if (error instanceof AxiosError) {
                    setError(error.response?.data);
                } else {
                    setError('Erro ao criar cliente');
                }
            }

            await asyncError();
        } finally {
            setLoading(false);
        }
    }, [getCustomers]);

    return (
        <CustomerContext.Provider value={{
            customers: customerListData.customerList,
            customer: customerDetailsData.customerDetails,
            getCustomers,
            get: getById,
            createCustomer,
            error,
            setError,
            loadingCreateCustomer: loading
        }}>
            {children}
        </CustomerContext.Provider>
    );
};

export { CustomerProvider, CustomerContext };