/* eslint-disable import/extensions */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CardMedia } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import defaultImage from "@/asset/images/defaultImage.jpg";
import { StyledSpan } from "@/styles/text";
import * as Interface from "@/utils/interface";
import * as Api from "@/utils/api";
import ClubDeleteJoinDialog from "@/components/ClubDetail/ClubDeleteJoinDialog/ClubDeleteJoinDialog";
import * as Style from "./MyPageClubCardStyle";
import { StyledSpan2 } from "@/components/ClubCard/ClubCardStyle";

function MyPageClubCard({
  club,
  like,
}: {
  club: Interface.Club,
  // eslint-disable-next-line react/require-default-props
  like?: boolean,
}) {
  const [openDeleteJoin, setOpenDeleteJoin] = useState(false);
  const [applicantsButton, setApplicantsButton] = useState(false);
  const [likesButton, setLikesButton] = useState(false);
  const handleToggleDeleteJoin = () => setOpenDeleteJoin((prev) => !prev);
  const handleDeleteLikes = () => {
    console.log("클럽", club);
    Api.delete("/likes", club.club_id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setLikesButton((prev) => !prev);
  };
  const handlePostLikes = () => {
    Api.post("/likes", { club_id: club.club_id })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setLikesButton((prev) => !prev);
  };

  return (
    <Style.WholeCardDiv>
      <Style.WholeCard>
        <Link to={`/clubDetail/${club.club_id}`}>
          <CardMedia
            component='img'
            height='200'
            src={club.picture || defaultImage}
            alt='Club Image'
          />
        </Link>
        <Style.ClubCardContent1>
          {/* 제목, 소개 받아서 표시 */}
          <h3>{club.name}</h3>
          <span>{club.intro}</span>
        </Style.ClubCardContent1>
        <Style.ClubCardContent2>
          {/* 해시태그 받아서 표시 */}
          {club.hashtag1 ? (
            <StyledSpan>#{club.hashtag1}</StyledSpan>
          ) : (
            <StyledSpan2>#해시태그없음</StyledSpan2>
          )}
          {club.hashtag2 && <StyledSpan>#{club.hashtag2}</StyledSpan>}
        </Style.ClubCardContent2>
        <Style.ClubCardInfos>
          {/* 온오프라인 받아서 표시 / 좋아요 적용 */}
          <div>
            {club.offline ? <StyledSpan>오프라인</StyledSpan> : ""}
            {club.online ? <StyledSpan>온라인</StyledSpan> : ""}
          </div>
          {like && !likesButton && (
            <Style.MyIconButton
              aria-label='favorite'
              onClick={handleDeleteLikes}
            >
              <Style.ClubCardFavoriteIcon />
            </Style.MyIconButton>
          )}
          {like && likesButton && (
            <Style.MyIconButton aria-label='favorite' onClick={handlePostLikes}>
              <FavoriteBorderIcon />
            </Style.MyIconButton>
          )}
          {!like && !applicantsButton && (
            <Style.MyIconButton
              aria-label='favorite'
              onClick={handleToggleDeleteJoin}
            >
              <Style.StyledSpan2>수락대기중</Style.StyledSpan2>
            </Style.MyIconButton>
          )}
          {!like && applicantsButton && (
            <Style.MyIconButton aria-label='favorite'>
              <Style.StyledSpan3>신청취소중</Style.StyledSpan3>
            </Style.MyIconButton>
          )}
          <ClubDeleteJoinDialog
            clubId={club.club_id}
            openDeleteJoin={openDeleteJoin}
            handleToggleDeleteJoin={handleToggleDeleteJoin}
            setApplicantsButton={setApplicantsButton}
          />
        </Style.ClubCardInfos>
      </Style.WholeCard>
    </Style.WholeCardDiv>
  );
}

export default MyPageClubCard;
