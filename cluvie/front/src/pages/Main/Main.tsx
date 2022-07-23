import React, { useRef } from "react";

import MainBanner from "@/components/Main/MainBanner/MainBanner";
import MainClubList from "@/components/Main/MainClubList/MainClubList";

import { MainContainerBox } from "./MainStyle";

function Main() {
  return (
    <MainContainerBox>
      <MainBanner />
      <MainClubList />
    </MainContainerBox>
  );
}

export default Main;
