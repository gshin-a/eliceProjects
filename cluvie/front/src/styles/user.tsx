import { Link } from "react-router-dom";

import styled from "@emotion/styled";

const UserButton =
  styled.button <
  { social?: string } >
  `
  width: 100%;
  height: 50px;
  margin-bottom: 15px;
  cursor: pointer;
  border: 0;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-family: inherit;
  img {
    margin-right: 10px;
  }
  background-color: ${(props) =>
    props.social === "google" ? "#ffffff" : "#f8e318"};
    box-shadow: 1px 1px 5px 1px #d3d3d3;
`;

const FormButton =
  styled(UserButton) <
  { isFormValid: boolean } >
  `
cursor: ${(props) => (props.isFormValid ? "cursor" : "auto")};
background-color: ${(props) => (props.isFormValid ? "#FFC300" : "#FFE047")};
&:hover {
  opacity: ${(props) => (props.isFormValid ? "0.6" : "1")};
}
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;

  .icon {
    position: absolute;
    top: 0;
    right: 2%;
    margin-top: 9px;
    width: 25px;
    height: 25px;
  }
  .icon-ok {
    color: #00a424;
    opacity: 0.7;
  }
  .icon-no {
    color: #ff0000;
    opacity: 0.7;
  }
`;

const UserInputDiv = styled.div`
  position: relative;
  width: 400px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #716847;
  display: block;
  margin-top: 5px;
  &:hover {
    opacity: 0.6;
  }
`;

export { InputBox, UserButton, FormButton, UserInputDiv, StyledLink };
