/* eslint-disable import/extensions */
import React from "react";
import MyClubListTab from "@/components/MyClubList/MyClubListTab/MyClubListTab";
import * as Style from "./MyClubListStyle";

function MyClubList() {
  return (
    <Style.WholeBox>
      <Style.Title>내 클럽 리스트</Style.Title>
      <MyClubListTab />
    </Style.WholeBox>
  );
}

export default MyClubList;
