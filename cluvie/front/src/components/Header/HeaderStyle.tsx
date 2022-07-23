import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { AppBar, IconButton, MenuItem } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

export const HeaderAppBar = styled(AppBar)`
  box-shadow: none;
  background-color: rgba(255, 255, 255, 0.8);
`;

export const LogoIconButton = styled(IconButton)`
  margin-left: 1%;
`;

export const LogoLink = styled(Link)`
  font-size: 30px;
  color: #ffc300;
  font-weight: bold;
  text-decoration: none;
`;

export const TextLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-family: Pretendard;
  font-size: 16px;
`;

export const ClubListDiv = styled.div`
  font-size: 16px;
  margin-left: 2%;
  width: 84%;
  & > Button {
    color: rgba(0, 0, 0, 0.8);
    font-weight: 550;
  }
`;

export const MyAccountCircle = styled(AccountCircle)`
  color: #716847;
  font-size: 34px;
`;

export const MyMenuItem = styled(MenuItem)`
  justify-content: center;
`;
