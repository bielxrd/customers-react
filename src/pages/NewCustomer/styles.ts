import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #FFF;
    box-shadow: 0px 2px 0px 0px #9FABCF4D;
    width: calc(98% - 32px);
    margin-left: 16px;
    margin-top: 16px;
    border-radius: 8px;
    padding: 16px;
`

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;

    span {
        margin-bottom: 8px;
    }
`

export const Input = styled.input`
    width: 178px;
    height: 36px;
    outline: none;
    border-radius: 8px;
    border: 1px solid var(--security-neutral-300, #7B8AB5);
    text-indent: 16px;
    margin-bottom: 32px;
`

export const Button = styled.button`
    width: 120px;
    cursor: pointer;
    border: none;
    border-radius: 8px;
    color: #f1f5f9;
    background-color: #020617;
    height: 36px;
`

export const ButtonBack = styled.button`
    width: 80px;
    cursor: pointer;
    border: none;
    border-radius: 8px;
    color: #f1f5f9;
    background-color: #020617;
    height: 24px;
    margin-left: 32px;
    margin-top: 16px;
`