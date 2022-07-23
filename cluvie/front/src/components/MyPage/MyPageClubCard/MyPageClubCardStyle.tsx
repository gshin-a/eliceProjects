/* eslint-disable import/extensions */
import styled from "@emotion/styled/macro";
import { Card, CardContent, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { StyledSpan } from "@/styles/text";

export const WholeCardDiv = styled.div`
  width: 33.33%;
`;

export const WholeCard = styled(Card)`
  margin: 16px;
  height: 400px;
`;

export const ClubCardContent1 = styled(CardContent)`
  display: flex;
  flex-direction: column;
  h3 {
    font-size: 22px;
    margin-bottom: 10px;
    overflow: hidden;
    height: 30px;
  }
  span {
    color: #5b5b5b;
    height: 45px;
    overflow: hidden;
  }
`;

export const ClubCardContent2 = styled(CardContent)`
  padding: 0 16px;
  height: 23px;
  overflow: hidden;
`;

export const ClubCardInfos = styled(CardContent)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -5px;
  ${StyledSpan} {
    background-color: #d3d3d3;
    border: 3px solid #d3d3d3;
  }
`;

export const ClubCardFavoriteIcon = styled(FavoriteIcon)`
  color: #f07167;
  font-size: 25px;
`;

export const MyIconButton = styled(IconButton)`
  margin: 8px 0px;
  padding: 0;
`;

export const StyledSpan2 = styled.span`
  color: white;
  font-size: 14px;
  background-color: #716847;
  border: 3px solid #716847;
  border-radius: 10px;
  margin-right: 5px;
  padding: 0 5px;
`;

export const StyledSpan3 = styled.span`
  color: white;
  font-size: 14px;
  background-color: black;
  border: 3px solid black;
  border-radius: 10px;
  margin-right: 5px;
  padding: 0 5px;
`;
