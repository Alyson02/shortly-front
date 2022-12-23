import styled from "styled-components";

const Button = styled.button`
    width: 182px;
    height: 60px;
    border-radius: 12px;
    background: #5D9040;
    color: #ffffff;
    border: 0px;
    cursor: pointer;
    position: relative;
    &:active{
        top: 1px;
    }
`;
export default Button;