import { FormEvent, useCallback, useState } from "react"
import { AddressRequest, EmailRequest } from "../../types/types";
import * as S from './styles';
import FormEmail from "./components/FormEmail/FormEmail";
import FormAddress from "./components/FormAddress/FormAddress";
import { useCustomer } from "../../hook/useCustomer";
import { useNavigate } from "react-router-dom";

export default function NewCustomer() {
    const { createCustomer, error, setError, loadingCreateCustomer } = useCustomer();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [emailsAddress, setEmailsAddress] = useState<EmailRequest[]>([]);
    const [addresses, setAddresses] = useState<AddressRequest[]>([]);

    function addAddress(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const street = data.get("street")?.toString();
        const city = data.get("city")?.toString();
        const state = data.get("state")?.toString();

        if (!street || !city || !state) {
            return;
        }

        setAddresses([...addresses, { street, city, state }]);

        event.currentTarget.reset();
    }

    function removeAddress(addressToRemove: AddressRequest) {
        const newAddressList = addresses.filter(
            (address) =>
                address.street !== addressToRemove.street ||
                address.city !== addressToRemove.city ||
                address.state !== addressToRemove.state
        );

        setAddresses(newAddressList);
    }

    function addEmail(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const email = data.get("email")?.toString();

        if (!email) {
            return;
        }

        if (emailsAddress.includes({ email_address: email })) {
            return;
        }

        setEmailsAddress([...emailsAddress, { email_address: email }]);

        event.currentTarget.reset();
    }

    function removeEmail(emailToRemove: string) {
        const newEmailList = emailsAddress.filter(
            (email) => email.email_address !== emailToRemove
        );

        setEmailsAddress(newEmailList);
    }

    const handleCreateCustomer = useCallback(async () => {
        await createCustomer({ name, phone, addresses, emails: emailsAddress });
        if (error === '') {
            setName('');
            setPhone('');
            setEmailsAddress([]);
            setAddresses([]);
            navigate('/')
        }
    }, [addresses, createCustomer, emailsAddress, error, name, navigate, phone])

    return (
        <>
            {loadingCreateCustomer ? (
                <span>Carregando...</span>
            ) : (
                <>
                    <S.ButtonBack onClick={() => {
                        setName('');
                        setPhone('');
                        setEmailsAddress([]);
                        setAddresses([]);
                        setError('');
                        navigate('/')
                    }}>Voltar</S.ButtonBack>

                    <S.Container>
                        <h1>Cadastrar novo cliente</h1>
                        <S.InputContainer>
                            <span>Informe o nome</span>
                            <S.Input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nome" />

                            <span>Informe o telefone</span>
                            <S.Input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="(00) 00000-0000" />
                        </S.InputContainer>

                        <FormEmail emails={emailsAddress} addEmail={addEmail} removeEmail={removeEmail} />

                        <FormAddress addAddress={addAddress} addresses={addresses} removeAddress={removeAddress} />

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginTop: '32px',
                            gap: '8px'
                        }}>
                            <S.Button onClick={() => handleCreateCustomer()}>Cadastrar</S.Button>
                            {error && <span>{error}</span>}
                        </div>
                    </S.Container>
                </>
            )}
        </>
    )
}