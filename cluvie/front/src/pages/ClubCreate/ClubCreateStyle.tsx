import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";
import ReactQuill from "react-quill";

export const CoverDiv = styled.div`
  width: 100%,
  height: 100%,
  z-index: 999
  `;

export const WholeBox = styled(Box)`
  position: relative;
  margin: 80px auto 0 auto;
  max-width: 1160px;
`;

export const Title = styled.div`
  color: black;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 60px;
`;

export const ClubReactQuill =
  styled(ReactQuill) <
  { duplicated: number } >
  `
  .ql-editor {
    min-height: 500px;
    padding: 15px;
  }
  .ql-toolbar:first-of-type {
    display: ${(props) => (props.duplicated ? "none" : "block")};
  }
`;

export const ButtonBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0 0 75%;
`;

export const BackLink = styled(Link)`
  width: 33.33%;
  margin: 0 2% 0 2%;
  text-decoration: none;
  color: black;
`;

export const MyButton1 = styled(Button)`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: black;
  background-color: rgba(226, 226, 226, 1);
  &:hover {
    background-color: rgba(226, 226, 226, 0.6);
  }
`;

export const MyButton2 = styled(Button)`
  width: 33.33%;
  margin: 0 2% 0 2%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: black;
  background-color: #ffc300;
  &:hover {
    background-color: rgba(255, 195, 0, 0.6);
  }
`;

export const MyButton3 = styled(Button)`
  width: 33.33%;
  margin: 0 2% 0 2%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: white;
  background-color: rgba(0, 0, 0, 1);
  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

export const DetailInfoDiv = styled.div`
  font-weight: 600;
  margin-bottom: 5px;
`;
