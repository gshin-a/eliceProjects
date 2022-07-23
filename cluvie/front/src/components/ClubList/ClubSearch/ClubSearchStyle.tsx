import styled from "@emotion/styled/macro";

export const SearchBox = styled.div`
  width: 300px;
  height: 42px;
  position: relative;

  .icon {
    position: absolute;
    top: 0;
    right: 4%;
    margin-top: 7px;
    font-size: 28px;
    cursor: pointer;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 42px;
  box-sizing: border-box;
  margin-bottom: 8px;
  border-radius: 7px;
  outline: none;
  padding-left: 15px;
  border: 0;
  background-color: rgba(255, 224, 71, 0.7);
  // box-shadow: 3px 3px 5px #f1f1f1;
`;