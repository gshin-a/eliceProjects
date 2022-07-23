import styled from "@emotion/styled";
import { Button } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

export const ChatButton = styled(Button)`
  position: fixed;
  right: 50px;
  bottom: 30px;
  z-index: 1100;
  border-radius: 50%;
  background-color: #ffc300;
  width: 70px;
  height: 70px;
  &:hover {
    background-color: rgba(255, 195, 0, 0.6);
  }
`;

export const MyChatIcon = styled(ChatIcon)`
  font-size: 40px;
  color: white;
`;
