import React, { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CardMedia, IconButton } from "@mui/material";

import { Club } from "@/utils/interface";
import * as Api from "@/utils/api";

import defaultImage from "@/asset/images/defaultImage.jpg";
import { StyledSpan } from "@/styles/text";

import {
  WholeCard,
  ClubCardContent,
  ClubCardInfos,
  ClubCardFavoriteIcon,
  ClubCardFavoriteBorderIcon,
  HashCardContent,
  StyledSpan2
} from "./ClubCardStyle";

interface Props {
  club: Club;
}

const ClubCard = forwardRef<HTMLDivElement, Props>(
  ({ club }, ref) => {
    const navigate = useNavigate();
    const [likesButton, setLikesButton] = useState(!!club.user_id);

    const handleClickCard = (clubId: number | undefined) => {
      navigate(`/clubDetail/${clubId}`);
    }

    const handleLikeButton = () => {
      setLikesButton((prev) => !prev);
      if (club.user_id) {
        // 좋아요 표시되어 있는 경우 -> 해제
        Api.delete("/likes", club.id)
          .then((res) => {
            console.log(res)
          })
          .catch((err) => console.error(err))
        return;
      }
      // 좋아요 표시 없는 경우 -> 설정
      Api.post("/likes", { club_id: club.id })
        .then((res) => console.log(res))
        .catch((err) => console.error(err))
    }

    return <WholeCard ref={ref} clubstate={club.state}>
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
        {club.hashtag1 ? <StyledSpan>#{club.hashtag1}</StyledSpan>:<StyledSpan2>#해시태그없음</StyledSpan2>}
        {club.hashtag2 && <StyledSpan>#{club.hashtag2}</StyledSpan>}
      </HashCardContent>
      <ClubCardInfos>
        <div>
          {!!club.online && <StyledSpan>온라인</StyledSpan>}
          {!!club.offline && <StyledSpan>오프라인</StyledSpan>}
        </div>
        {
          club.user_id !== undefined && (
          <IconButton aria-label='favorite' onClick={handleLikeButton}>
            { likesButton ? <ClubCardFavoriteIcon /> : <ClubCardFavoriteBorderIcon /> }
          </IconButton>)
        }
      </ClubCardInfos>
    </WholeCard>
  }
);

export default ClubCard;
