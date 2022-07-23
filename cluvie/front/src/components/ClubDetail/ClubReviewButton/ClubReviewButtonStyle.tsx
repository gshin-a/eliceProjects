import { Button, Box } from "@mui/material";
import styled from "@emotion/styled";

export const ReviewButton = styled(Button)`
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: black;
  background-color: rgba(226, 226, 226, 1);
  &:hover {
    background-color: rgba(226, 226, 226, 0.6);
  }
`;

export const ReviewBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: white;
  text-align: center;
  .rating {
    margin: 20px 0;
  }
  .review-textarea {
    width: 90%;
    height: 100px;
  }
`;
