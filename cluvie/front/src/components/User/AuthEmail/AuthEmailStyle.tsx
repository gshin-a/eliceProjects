import styled from "@emotion/styled/macro";
import { StyledInput } from "@/styles/containers";

const AuthEmailBox = styled.div`
  position: relative;
  width: 100%;
  height: 130px;
  background-color: rgba(211, 211, 211, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
  border-radius: 7px; 
  padding-left: 8%;
  box-sizing: border-box;
  margin-bottom: 20px;
`;

const AuthEmailLabel = styled.label`
  font-size: 13px;
  font-weight: 600;
`;

const AuthEmailInput = styled(StyledInput)`
  width: 90%;
  padding: 20px;
  font-size: 16px;
`;

const AuthEmailCheckButton = styled.button<{disabled: boolean}>`
  position: absolute;
  right: 15%;
  font-weight: 500;
  color: white;  
  width: 50px;
  height: 30px;
  border-radius: 7px;
  border: 0;
  ${(props) => (props.disabled) ? 
    `background-color: #d3d3d3;
    cursor: auto;
    opacity: 0.6` 
    : 
    `background-color: #ffc300;
    cursor: pointer;`
  }
`;

export { AuthEmailBox, AuthEmailLabel, AuthEmailInput, AuthEmailCheckButton };