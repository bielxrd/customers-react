import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
`

export const CustomerContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 470px;
    gap: 16px;
    background-color: #FFF;
    padding: 16px;
    box-shadow: 0px 2px 0px 0px #9FABCF4D;
    margin-bottom: 24px;
    border-radius: 8px;

`

export const CustomerRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
        width: 150px;
    }
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