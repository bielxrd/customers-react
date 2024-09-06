export interface CustomerResponse {
    id: string,
    name: string,
    phone: string
}

export interface Pagination {
    totalItems: number,
    totalPages: number,
    pageSize: number,
    pageNumber: number
}

export interface CustomerListResponse {
    customers: CustomerResponse[],
    pagination: Pagination;
}

export interface EmailResponse {
    email_id: string,
    email_address: string
}

export interface AddressResponse {
    address_id: string,
    street: string,
    city: string,
    state: string
}

export interface CustomerDetails {
    customer: CustomerResponse,
    email: EmailResponse,
    address: AddressResponse
}

// REQUESTS

export type EmailRequest = Omit<EmailResponse, 'email_id'>;

export type AddressRequest = Omit<AddressResponse, 'address_id'>;

export interface CustomerRequest {
    name: string,
    phone: string,
    addresses: AddressRequest[],
    emails: EmailRequest[]
}