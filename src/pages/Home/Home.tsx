import { useCallback, useEffect, useState } from "react";
import { useCustomer } from "../../hook/useCustomer";
import { useNavigate } from "react-router-dom";
import * as S from './styles';
import { Plus } from "lucide-react";

export default function Home() {
    const { customers, getCustomers, get } = useCustomer();
    const [loading, setLoading] = useState(false);
    const [pageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const navigate = useNavigate();

    const handleGetCustomers = useCallback(async (pageNumber: number, pageSize: number) => {
        try {
            setLoading(true);
            await getCustomers(pageNumber, pageSize);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }, [getCustomers, setLoading]);

    const handleGetCustomerDetails = useCallback(async (id: string) => {
        await get(id);
        navigate(`/customer/${id}`);
    }, [get, navigate]);

    useEffect(() => {
        handleGetCustomers(pageNumber, pageSize);
    }, [handleGetCustomers, pageNumber, pageSize]);

    const handleLoadMore = () => {
        setPageSize(pageSize + 5);
    }

    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <S.Container>
                    <div style={{
                        width: '470px',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <h2>Customers</h2>

                        <S.Button style={{
                            width: '36px',
                        }}>
                            <Plus size={24} />
                        </S.Button>
                    </div>
                    <S.CustomerContainer>
                        {customers?.customers.length === 0 && (
                            <S.CustomerRow>
                                <span>Nenhum cliente encontrado</span>
                            </S.CustomerRow>
                        )}
                        {customers?.customers.map((customer) => (
                            <S.CustomerRow>
                                <span>{customer.name}</span>
                                <span>{customer.phone}</span>
                                <S.Button onClick={() => handleGetCustomerDetails(customer.id)}>Ver detalhes</S.Button>
                            </S.CustomerRow>
                        ))}
                    </S.CustomerContainer>
                    <S.Button onClick={() => handleLoadMore()}>
                        Carregar mais
                    </S.Button>
                </S.Container>
            )}
        </>
    );
}