/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { CardContent } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ClubDetailTab from "@/components/ClubDetail/ClubDetailTab";
import ClubSettingPopper from "@/components/ClubDetail/ClubSettingPopper/ClubSettingPopper";
import ClubChatButton from "@/components/ClubDetail/ClubChatButton/ClubChatButton";
import ClubJoinDialog from "@/components/ClubDetail/ClubJoinDialog/ClubJoinDialog";
import ClubDeleteJoinDialog from "@/components/ClubDetail/ClubDeleteJoinDialog/ClubDeleteJoinDialog";
import defaultImage from "@/asset/images/defaultImage.jpg";
import * as Api from "@/utils/api";
import * as Interface from "@/utils/interface";
import { isSignInUser } from "@/utils/recoil";
import * as Style from "./ClubDetailStyle";

interface Applicants {
  id: number;
  nickname: string;
  status: number;
}

function ClubDetail() {
  const params = useParams();
  // prettier-ignore
  const isSignIn =  useRecoilValue<boolean>(isSignInUser);
  const [openJoin, setOpenJoin] = useState(false);
  const [openDeleteJoin, setOpenDeleteJoin] = useState(false);
  const [likesButton, setLikesButton] = useState(false);
  const [applicantsButton, setApplicantsButton] = useState(false);
  const [isManager, setIsmanager] = useState(0);
  const [applicantsNum, setApplicantsNum] = useState(0);
  const [restNum, setRestNum] = useState(0);
  const [isAccept, setIsAccept] = useState(false);
  // prettier-ignore
  const [club, setClub] = useState<Interface.Club>({
    id: -100,
    name: '이름을 입력해주세요',
    intro: '한줄소개를 입력해주세요',
    description: '상세정보를 입력해주세요',
    head_count: 100,
    duration: 6,
    state: 0,
    manager: 4,
  });
  const handleToggleJoin = () => setOpenJoin((prev) => !prev);
  const handleToggleDeleteJoin = () => setOpenDeleteJoin((prev) => !prev);

  const handleDeleteLikes = () => {
    setLikesButton((prev) => !prev);

    Api.delete("/likes", club.id)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
        setLikesButton((prev) => !prev);
      });
  };

  const handlePostLikes = () => {
    setLikesButton((prev) => !prev);

    Api.post("/likes", { club_id: club.id })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
        setLikesButton((prev) => !prev);
      });
  };

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO);
    }
  }, []);

  useEffect(() => {
    if (isSignIn) {
      Api.get("clubs/user")
        .then((res) => {
          setIsmanager(
            res.data.clubList.clubList.filter(
              (curClub: Interface.Club) => curClub.id === club.id
            ).length
          );
        })
        .catch((err) => console.log(err));
    }
  }, [club]);

  useEffect(() => {
    if (club.id === -100) {
      Api.get(`/clubs/${params.id}`)
        .then((res) => {
          console.log(res);
          setClub(res.data.club);
        })
        .catch((err) => console.log(err));
    }
  }, [params]);

  useEffect(() => {
    if (isSignIn) {
      Api.get("/likes/clubs")
        .then((res) => {
          setLikesButton(
            Boolean(
              res.data.likeClubList.find(
                (likeclub: { club_id: number | undefined }) =>
                  likeclub.club_id === club.id
              )
            )
          );
        })
        .catch((err) => console.log(err));

      Api.get("/applications/clubs")
        .then((res) => {
          setApplicantsButton(
            Boolean(
              res.data.applyingClubList.find(
                (applicantClub: { club_id: number | undefined }) =>
                  applicantClub.club_id === club.id
              )
            )
          );
        })
        .catch((err) => console.log(err));
    }
  }, [club]);

  useEffect(() => {
    if (isSignIn) {
      Api.get("/applications/acceptance/clubs")
        .then((res) => {
          setIsAccept(
            res.data.myClubList.filter(
              (curClub: Interface.Club) => curClub.id === club.id
            ).length
          );
        })
        .catch((err) => console.log(err));
    }
  }, [club]);

  useEffect(() => {
    if (isSignIn) {
      Api.get(`/applications/${club.id}/users`)
        .then((res) => {
          if (Array.isArray(res.data.applicants)) {
            setApplicantsNum(
              res.data.applicants.filter(
                (applicants: Applicants) => applicants["status"] === 1
              ).length
            );
          }
        })
        .catch((err) => console.log(err));
    }
  }, [club]);

  useEffect(() => {
    if (isSignIn)
      setRestNum(
        club.head_count ? club.head_count - applicantsNum : applicantsNum
      );
  }, [club, applicantsNum]);

  const sendKakaoMessage = () => {
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: club.name,
        description: club.intro,
        imageUrl: club.picture || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        link: {
          webUrl: window.location.href,
          mobileWebUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: "사이트로 이동",
          link: {
            webUrl: window.location.href,
            mobileWebUrl: window.location.href,
          },
        },
      ],
    });
  };

  if (club.id === -100) {
    return null;
  }

  return (
    <div>
      {/* <Header /> */}
      <Style.WholeBox>
        <Style.WholeCard>
          <img
            // eslint-disable-next-line global-require
            src={club.picture || defaultImage}
            alt='클럽썸네일이미지'
          />
          <Style.ContentBox>
            <CardContent>
              <Style.Title>
                {club.name}
                {isManager !== 0 ? <ClubSettingPopper club={club} /> : ""}
              </Style.Title>
              <Style.Text1>{club.intro}</Style.Text1>
              <Style.Text2>
                본 클럽은 {club.online ? "온라인" : ""}
                {club.online && club.offline ? "/" : ""}
                {club.offline ? "오프라인" : ""}
                {club.online || club.offline ? "으로 진행됩니다." : ""}
                {!(club.online || club.offline)
                  ? "진행 방식이 아직 정해지지 않았습니다."
                  : ""}
              </Style.Text2>
              {!club.state && (
                <Style.Text2>
                  {isSignIn
                    ? `모집 마감까지 ${restNum}자리 남았어요! (현재 ${applicantsNum}명 / 최대 ${club.head_count}명)`
                    : `최대 ${club.head_count}명까지 참여할 수 있는 클럽입니다.`}
                </Style.Text2>
              )}
              {club.state ? (
                <Style.Text2>모집이 마감된 클럽입니다.</Style.Text2>
              ) : (
                ""
              )}
              {!club.state && (
                <Style.Text3>
                  *클럽 사정에 따라 모집이 조기 마감될 수 있습니다.
                </Style.Text3>
              )}
            </CardContent>
            <Style.ButtonBox>
              {!isAccept && !club.state && !applicantsButton && isSignIn ? (
                <Style.MyButton1 color='inherit' onClick={handleToggleJoin}>
                  신청하기
                </Style.MyButton1>
              ) : (
                ""
              )}
              {!isAccept && !club.state && applicantsButton && isSignIn ? (
                <Style.MyDeleteButton
                  color='inherit'
                  onClick={handleToggleDeleteJoin}
                >
                  신청취소
                </Style.MyDeleteButton>
              ) : (
                ""
              )}
              {isAccept ? (
                <Style.MyDeleteButton color='inherit' disabled>
                  신청수락
                </Style.MyDeleteButton>
              ) : (
                ""
              )}
              {!club.state && !isSignIn ? (
                <Style.MyButton1
                  color='inherit'
                  onClick={() => alert("로그인이 필요한 서비스입니다.")}
                >
                  신청하기
                </Style.MyButton1>
              ) : (
                ""
              )}
              {!isAccept && club.state ? (
                <Style.MyButton1 color='inherit' disabled>
                  모집마감
                </Style.MyButton1>
              ) : (
                ""
              )}
              <ClubJoinDialog
                clubId={club.id}
                openJoin={openJoin}
                handleToggleJoin={handleToggleJoin}
                setApplicantsButton={setApplicantsButton}
              />
              <ClubDeleteJoinDialog
                clubId={club.id}
                openDeleteJoin={openDeleteJoin}
                handleToggleDeleteJoin={handleToggleDeleteJoin}
                setApplicantsButton={setApplicantsButton}
              />
              {likesButton && isSignIn ? (
                <Style.MyButton2 color='inherit' onClick={handleDeleteLikes}>
                  <Style.MyFavoriteIcon />
                  &nbsp;찜해제
                </Style.MyButton2>
              ) : (
                ""
              )}
              {!likesButton && isSignIn ? (
                <Style.MyButton2 color='inherit' onClick={handlePostLikes}>
                  <FavoriteBorderOutlinedIcon />
                  &nbsp;찜하기
                </Style.MyButton2>
              ) : (
                ""
              )}
              {!isSignIn ? (
                <Style.MyButton2
                  color='inherit'
                  onClick={() => alert("로그인이 필요한 서비스입니다.")}
                >
                  <FavoriteBorderOutlinedIcon />
                  &nbsp;찜하기
                </Style.MyButton2>
              ) : (
                ""
              )}
              <Style.MyButton2 color='inherit' onClick={sendKakaoMessage}>
                <img
                  // eslint-disable-next-line global-require
                  src={require("../../asset/images/kakao-talk.png")}
                  alt='kakao-talk'
                />
                &nbsp;공유하기
              </Style.MyButton2>
            </Style.ButtonBox>
          </Style.ContentBox>
        </Style.WholeCard>
        <ClubDetailTab club={club} isSignIn={isSignIn} />
        <ClubChatButton />
      </Style.WholeBox>
    </div>
  );
}

export default ClubDetail;
