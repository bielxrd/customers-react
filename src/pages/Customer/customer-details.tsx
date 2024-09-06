import { useParams } from "react-router-dom";
import { useCustomer } from "../../hook/useCustomer";
import { useNavigate } from "react-router-dom";
import * as S from './styles';
import { useEffect } from "react";

export default function CustomerDetails() {
    const { customerId } = useParams();
    const { get, customer } = useCustomer();
    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate("/");
    }

    useEffect(() => {
        const fetchCustomer = async () => {
            if (customerId) {
                await get(customerId);
            }
        };

        fetchCustomer();
    }, [customerId, get])

    return (
        <>
            <S.Button onClick={() => navigateToHome()}>
                voltar
            </S.Button>
            <S.Container>
                <h1>Customer Details</h1>
                {customer ? (
                    <S.CustomerContainer>
                        <h2>Cliente</h2>
                        <S.CostumerSession>
                            <p>Name: {customer.customer.name}</p>
                            <p>Phone: {customer.customer.phone}</p>
                        </S.CostumerSession>
                        <p>Email principal: {customer.email.email_address}</p>
                        <S.AddressSession>
                            <p>Endereço principal: {customer.address.street}</p>
                            <p>Cidade: {customer.address.city}</p>
                            <p>Estado: {customer.address.state}</p>
                        </S.AddressSession>
                    </S.CustomerContainer>
                ) : (
                    <p>Loading details...</p>
                )}
            </S.Container>
        </>
    )
}