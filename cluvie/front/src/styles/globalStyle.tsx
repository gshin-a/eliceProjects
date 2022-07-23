import React from "react";
import { Global, css } from "@emotion/react";

const style = css`
  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css");

  .ql-editor {
    overflow-y: hidden;
    padding: 0;
  }

  html {
    font-size: 16px;
  }

  body {
    margin: 0;
    margin-top: 20px;
   
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
      Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
      "Noto Sans KR", "Malgun Gothic", sans-serif;

    button {
      &:hover {
        opacity: 0.6;
      }
    }
    
    .hidden {
      visibility: hidden;
    }
  }
`;

function GlobalStyle() {
  return <Global styles={style} />;
}

export default GlobalStyle;
