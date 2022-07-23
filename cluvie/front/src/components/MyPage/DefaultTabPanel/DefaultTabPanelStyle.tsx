import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export const LikesClubDiv = styled.div`
  text-align: center;
  margin-top: 100px;
`;

export const MyPageButton = styled(Button)`
  margin-top: 10px;
  color: white;
  font-size: 20px;
  background-color: #ffc300;
  &:hover {
    background-color: rgba(255, 195, 0, 0.6);
  }
`;

export const Text1 = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const Text2 = styled.div`
  font-size: 20px;
`;

export const MyLink = styled(Link)`
  text-decoration: none;
`;
