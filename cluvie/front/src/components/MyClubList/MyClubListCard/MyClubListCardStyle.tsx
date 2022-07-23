/* eslint-disable import/extensions */
import styled from "@emotion/styled/macro";
import { Card, CardContent, IconButton, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { StyledSpan } from "@/styles/text";

export const WholeCardDiv = styled.div`
  width: 33.33%;
`;

export const WholeCard = styled(Card)`
  margin: 25px 25px 0 25px;
  height: 400px;
  border-radius: 4px 4px 0px 0px;
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
  font-size: 28px;
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

export const StyledSpan4 = styled.span`
  color: white;
  font-size: 14px;
  background-color: #ffc300;
  border: 3px solid #ffc300;
  border-radius: 10px;
  margin-right: 5px;
  padding: 0 5px;
`;

export const OnOffDiv = styled.div`
  padding: 8px 0px;
`;

export const AccordionDiv = styled.div`
  margin: 0px 25px 25px 25px;
`;

export const ApplicantsButton1 = styled(Button)`
  height: 25px;
  margin: 0 5px;
  color: white;
  font-size: 12px;
  background-color: #ffc300;
  &:hover {
    background-color: rgba(255, 195, 0, 0.6);
  }
`;

export const ApplicantsButton2 = styled(Button)`
  height: 25px;
  margin: 0 5px;
  color: white;
  font-size: 12px;
  background-color: #ff0000;
  &:hover {
    background-color: rgba(255, 0, 0, 0.6);
  }
`;

export const ApplicantsButton3 = styled(Button)`
  height: 25px;
  margin: 0 5px;
`;
