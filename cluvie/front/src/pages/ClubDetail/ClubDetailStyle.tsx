import styled from "@emotion/styled";
import { Card, Button, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const WholeBox = styled(Box)`
  position: relative;
  margin: 80px auto 0 auto;
  max-width: 1160px;
`;

export const WholeCard = styled(Card)`
  display: flex;
  box-shadow: none;
  border-radius: 0;
  & > img {
    width: 550px;
  }
`;

export const ContentBox = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 45%;
  padding-left: 5%;
`;

export const Title = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin: 30px 0 30px;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  height: 50px;
  overflow: hidden;
`;

export const Text1 = styled.div`
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 24px;
  font-weight: 550;
  max-height: 170px;
  overflow: hidden;
`;

export const Text2 = styled.div`
  margin-bottom: 20px;
  color: rgba(0, 0, 0);
  font-size: 16px;
`;

export const Text3 = styled.div`
  margin-bottom: 30px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
`;

export const ButtonBox = styled(Box)`
  display: flex;
  align-items: center;
  pl: 1;
  pb: 1;
  justify-content: center;
`;

export const MyButton1 = styled(Button)`
  width: 33.33%;
  margin: 0 2% 0 2%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: black;
  background-color: #ffc300;
  &:hover {
    background-color: rgba(255, 195, 0, 0.6);
  }
`;

export const MyDeleteButton = styled(Button)`
  width: 33.33%;
  margin: 0 2% 0 2%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: white;
  background-color: #716847;
  &:hover {
    background-color: rgba(113, 104, 71, 0.6);
  }
`;

export const MyButton2 = styled(Button)`
  width: 33.33%;
  margin: 0 2% 0 2%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: black;
  img {
    width: 24px;
  }
`;

export const MyFavoriteIcon = styled(FavoriteIcon)`
  color: #ff0000;
`;
