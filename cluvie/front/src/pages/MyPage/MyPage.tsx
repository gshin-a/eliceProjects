/* eslint-disable import/extensions */
import React from "react";
import UserCard from "@/components/MyPage/UserCard/UserCard";
import MyPageTab from "@/components/MyPage/MyPageTab/MyPageTab";
import * as Style from "./MyPageStyle";

function MyPage() {
  return (
    <Style.WholeBox>
      <Style.Title>마이페이지</Style.Title>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <UserCard />
        <MyPageTab />
      </div>
    </Style.WholeBox>
  );
}

export default MyPage;
