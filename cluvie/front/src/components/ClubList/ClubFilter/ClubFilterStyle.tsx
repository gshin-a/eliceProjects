import styled from "@emotion/styled/macro";

export const SelectBox = styled.div`
  display: flex;
`;

export const SelectButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  padding: 20px 13px 20px 20px;
  margin-right: 5px;
  cursor: pointer;
  border: 1px solid #ffc300;
  border-radius: 7px;
  background-color: white;
  font-size: 16px;
  font-family: inherit;
  &:hover {
    opacity: 1;
    background-color: #ffc300;
  }
  &.clicked {
    background-color: #ffc300;
  }
`;

export const DropDownBox = styled.div`
  position: relative;
`;

export const DropDownMenu = styled.div`
  width: 97%;
  box-sizing: border-box;
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #ffc300;
  border-radius: 7px;
  margin-top: 2px;
  padding: 10px;
  span {
    margin-left: 5px;
  }
`;