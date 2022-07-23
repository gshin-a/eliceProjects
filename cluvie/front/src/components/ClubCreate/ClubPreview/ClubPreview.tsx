/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React from "react";
import { CardContent } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ClubDetailTab from "@/components/ClubDetail/ClubDetailTab";
import * as Interface from "@/utils/interface";
import defaultImage from "@/asset/images/defaultImage.jpg";
import * as Style from "./ClubPreviewStyle";

function ClubPreview({ newClub }: { newClub: Interface.Club }) {
  return (
    <div>
      <Style.WholeBox>
        <Style.WholeCard>
          <img
            // eslint-disable-next-line global-require
            src={newClub.picture || defaultImage}
            alt='클럽썸네일이미지'
          />
          <Style.ContentBox>
            <CardContent>
              <Style.Title>{newClub.name}</Style.Title>
              <Style.Text1>{newClub.intro}</Style.Text1>
              <Style.Text2>
                본 클럽은 {newClub.online ? "온라인" : ""}
                {newClub.online && newClub.offline ? "/" : ""}
                {newClub.offline ? "오프라인" : ""}
                {newClub.online || newClub.offline ? "으로 진행됩니다." : ""}
                {!(newClub.online || newClub.offline)
                  ? "진행 방식이 아직 정해지지 않았습니다."
                  : ""}
              </Style.Text2>
              <Style.Text2>
                모집 마감까지 {newClub.head_count}자리 남았어요! (현재 0명 /
                최대 {newClub.head_count}명)
              </Style.Text2>
              <Style.Text3>
                *클럽 사정에 따라 모집이 조기 마감될 수 있습니다.
              </Style.Text3>
            </CardContent>
            <Style.ButtonBox>
              <Style.MyButton1 color='inherit'>신청하기</Style.MyButton1>
              <Style.MyButton2 color='inherit'>
                <FavoriteBorderOutlinedIcon />
                &nbsp;찜하기
              </Style.MyButton2>
              <Style.MyButton2 color='inherit'>
                <img
                  // eslint-disable-next-line global-require
                  src={require("@/asset/images/kakao-talk.png")}
                  alt='kakao-talk'
                />
                &nbsp;공유하기
              </Style.MyButton2>
            </Style.ButtonBox>
          </Style.ContentBox>
        </Style.WholeCard>
        <ClubDetailTab club={newClub} preview />
      </Style.WholeBox>
    </div>
  );
}

export default ClubPreview;
