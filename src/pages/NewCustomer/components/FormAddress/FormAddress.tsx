import { FormEvent } from "react";
import styled from "styled-components";
import { AddressRequest } from "../../../../types/types";
import { X } from "lucide-react";

interface FormAddressProps {
    addresses: AddressRequest[];
    addAddress: (event: FormEvent<HTMLFormElement>) => void;
    removeAddress: (addressToRemove: AddressRequest) => void;
}

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;

    .container-address {
        display: flex;
        flex-direction: column;
        margin-top: 16px;
        width: 550px;
        padding-left: 8px;
        padding-bottom: 16px;
        border: 1px solid var(--security-neutral-300, #7B8AB5);
        span {
            font-size: 14px;
            display: flex;
            align-items: center;
        }
    }

    .remove-button {
        margin-left: 2px;
        align-self: center;
    }
`

const Input = styled.input`
    width: 178px;
    height: 36px;
    outline: none;
    border-radius: 8px;
    border: 1px solid var(--security-neutral-300, #7B8AB5);
    text-indent: 8px;
    margin-bottom: 32px;
    margin-right: 16px;
    box-sizing: border-box;
`

const Button = styled.button`
    width: 140px;
    cursor: pointer;
    border: none;
    border-radius: 8px;
    color: #f1f5f9;
    background-color: #020617;
    height: 36px;
`

export default function FormAddress({ addresses, addAddress, removeAddress }: FormAddressProps) {
    return (
        <FormContainer>
            <h2>Cadastre seus endereços!</h2>
            <form onSubmit={addAddress}>
                <Input type="text" name="street" placeholder="Rua" />
                <Input type="text" name="city" placeholder="Cidade" />
                <Input type="text" name="state" placeholder="Estado" />
                <Button type="submit">Cadastrar</Button>
            </form>

            {addresses.length > 0 ? (
                <div className="container-address">
                    {addresses.map((address, index) => (
                        <div style={{ display: 'flex', alignItems: 'center' }} key={index}>
                            <span>{`${address.street}, ${address.city}, ${address.state}`}</span>
                            <X size={16} className="remove-button" onClick={() => removeAddress(address)} />
                        </div>
                    ))}
                </div>
            ) : (
                <span>Nenhum endereço cadastrado</span>
            )}
        </FormContainer>
    )
}