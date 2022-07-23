import React from "react";
import * as Style from "./DefaultTabPanelStyle";

function DefaultTabPanel({ text1, text2 }: { text1: string, text2: string }) {
  return (
    <Style.LikesClubDiv>
      <Style.Text1>{text1}</Style.Text1>
      <Style.Text2>{text2}</Style.Text2>
      <Style.MyLink to='/clubList'>
        <Style.MyPageButton color='inherit'>
          다양한 클럽 둘러보기
        </Style.MyPageButton>
      </Style.MyLink>
    </Style.LikesClubDiv>
  );
}

export default DefaultTabPanel;
