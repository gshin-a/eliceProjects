import styled from "@emotion/styled";
import { Card, CardContent, Button } from "@mui/material";

export const WholeUserCard = styled(Card)`
  width: 250px;
  height: 280px;
  overflow: auto;
  position: fixed;
`;

export const FirstCardContent = styled(CardContent)`
  display: flex;
  flex-direction: row;
`;

export const UserEditButton = styled(Button)`
  height: 35px;
  min-width: 50px;
  margin: 0 auto 8px auto;
  color: white;
  font-size: 16px;
  background-color: #ffc300;
  &:hover {
    background-color: rgba(255, 195, 0, 0.6);
  }
`;
