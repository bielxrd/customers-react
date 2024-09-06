import { FormEvent } from "react";
import styled from "styled-components";
import { EmailRequest } from "../../../../types/types";
import { X } from "lucide-react";

interface FormEmailProps {
    emails: EmailRequest[];
    addEmail: (event: FormEvent<HTMLFormElement>) => void;
    removeEmail: (emailToRemove: string) => void;
}

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;

    .container-address {
        display: flex;
        flex-direction: column;
        ;
        margin-top: 16px;
        width: 310px;
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

export default function FormEmail({ emails, addEmail, removeEmail }: FormEmailProps) {
    return (
        <FormContainer>
            <h2>Cadastre seus emails!</h2>
            <form onSubmit={addEmail}>
                <Input type="email" name="email" placeholder="Digite o e-mail do cliente" />
                <Button type="submit">Cadastrar</Button>
            </form>


            {emails.length > 0 ? (
                <div className="container-address">
                    {emails.map((email, index) => (
                        <div style={{ display: 'flex', alignItems: 'center' }}><span key={index}>{email.email_address}</span><X size={16} className="remove-button" onClick={() => removeEmail(email.email_address)} /></div>
                    ))}
                </div>
            ) : (
                <span>Nenhum email cadastrado</span>
            )}

        </FormContainer>
    )
}