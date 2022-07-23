import React from "react";
import { useNavigate } from "react-router-dom";

import { Club } from "@/utils/interface";

import { CardMedia } from "@mui/material";
import { StyledSpan } from "@/styles/text";

import { ClubCardContent, ClubCardInfos, HashCardContent, StyledSpan2 } from "@/components/ClubCard/ClubCardStyle";
import defaultImage from "@/asset/images/defaultImage.jpg";

import { MainWholeCard } from "./MainClubCardStyle";

interface Props {
  club: Club;
}

function MainClubCard({ club }: Props) {
  const navigate = useNavigate();

  const handleClickCard = (clubId: number | undefined) => {
    navigate(`/clubDetail/${clubId}`);
  };

  return (
    <MainWholeCard>
      <CardMedia
        component='img'
        height='250'
        src={club.picture || defaultImage}
        alt='Club Image'
        onClick={() => handleClickCard(club.id)}
      />
      <ClubCardContent onClick={() => handleClickCard(club.id)}>
        <h3>{club.name}</h3>
        <span>{club.intro}</span>
      </ClubCardContent>
      <HashCardContent>
        {/* 해시태그 받아서 표시 */}
        {club.hashtag1 ? (
          <StyledSpan>#{club.hashtag1}</StyledSpan>
        ) : (
          <StyledSpan2>#해시태그없음</StyledSpan2>
        )}
        {club.hashtag2 && <StyledSpan>#{club.hashtag2}</StyledSpan>}
      </HashCardContent>
      <ClubCardInfos>
        <div>
          {!!club.online && <StyledSpan>온라인</StyledSpan>}
          {!!club.offline && <StyledSpan>오프라인</StyledSpan>}
        </div>
      </ClubCardInfos>
    </MainWholeCard>
  );
}

export default MainClubCard;
