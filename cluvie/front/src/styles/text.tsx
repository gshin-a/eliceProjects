import styled from "@emotion/styled/macro";

const StyledSpan = styled.span`
  color: #141414;
  font-size: 14px;
  font-weight: 600;
  background-color: #ffe047;
  border: 3px solid #ffe047;
  border-radius: 10px;
  margin-right: 5px;
  padding: 0 5px;
`;

const SelectedSpan = styled(StyledSpan)`
  background-color: #716847;
  border-color: #716847;
  color: white;
  font-weight: 400;
  padding: 5px 10px;
  cursor: pointer;
`;

const StyledLabel = styled.label`
  font-weight: 600;
  display: block;
  margin-bottom: 5px;
`;

export { StyledSpan, SelectedSpan, StyledLabel };
