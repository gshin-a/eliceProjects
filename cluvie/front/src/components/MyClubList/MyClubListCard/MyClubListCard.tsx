/* eslint-disable import/extensions */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CardMedia,
  AccordionSummary,
  AccordionDetails,
  Accordion,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GradeIcon from "@mui/icons-material/Grade";
import defaultImage from "@/asset/images/defaultImage.jpg";
import { StyledSpan } from "@/styles/text";
import * as Interface from "@/utils/interface";
import * as Api from "@/utils/api";
import CloseApplicantsDialog from "@/components/MyClubList/CloseApplicantsDialog/CloseApplicantsDialog";
import * as Style from "./MyClubListCardStyle";
import { StyledSpan2 } from "@/components/ClubCard/ClubCardStyle";

function MyClubListCard({
  club,
  make,
  closedClub,
}: {
  club: Interface.Club,
  // eslint-disable-next-line react/require-default-props
  make: string,
  closedClub: number,
}) {
  const [openCloseApplicants, setOpenCloseApplicants] = useState(false);
  const [closeApplicantsButton, setCloseApplicantsButton] = useState(false);
  const [accordionClick, setAccordionClick] = useState(false);
  const [applicantsList, setApplicantsList] = useState([]);
  const [acceptanceButtonLoading, setAcceptanceButtonLoading] = useState([]);
  const [clubManager, setClubManager] = useState("");

  const handleToggleCloseApplicants = () =>
    setOpenCloseApplicants((prev) => !prev);

  const handleClickAccordion = () => {
    setAccordionClick((prev) => !prev);
  };

  const handleClickAcceptance = (applicantsUserId: number) => {
    console.log("applicantsUserId 수락처리", applicantsUserId);

    Api.patch("/applications/acceptance", {
      club_id: club.id,
      user_id: applicantsUserId,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleClickRefuse = (applicantsUserId: number) => {
    console.log("applicantsUserId 수락취소처리", applicantsUserId);

    Api.patch("/applications/refuse", {
      club_id: club.id,
      user_id: applicantsUserId,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (accordionClick || closeApplicantsButton) {
      Api.get(`/applications/${club.id}/users`)
        .then((res) => {
          console.log("모임에 신청한 사람", res.data.applicants);
          setApplicantsList(res.data.applicants);
        })
        .catch((err) => console.log(err));

      setAcceptanceButtonLoading([]);
    }
  }, [accordionClick, closeApplicantsButton]);

  useEffect(() => {
    if (club.manager) {
      Api.get(`/users/${club.manager}/nickname`)
        .then((res) => setClubManager(res.data.userNickname))
        .catch((err) => console.log(err));
    }
  }, [club]);

  return (
    <Style.WholeCardDiv>
      <Style.WholeCard>
        <Link to={`/clubDetail/${club.id}`}>
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
          <Style.OnOffDiv>
            {club.offline ? <StyledSpan>오프라인</StyledSpan> : ""}
            {club.online ? <StyledSpan>온라인</StyledSpan> : ""}
          </Style.OnOffDiv>
          {!closedClub && make === "true" && !closeApplicantsButton && (
            <Style.MyIconButton
              aria-label='favorite'
              onClick={handleToggleCloseApplicants}
            >
              <Style.StyledSpan2>모집마감하기</Style.StyledSpan2>
            </Style.MyIconButton>
          )}
          {!closedClub && make === "true" && closeApplicantsButton && (
            <Style.MyIconButton aria-label='favorite' disabled>
              <Style.StyledSpan4>모집완료</Style.StyledSpan4>
            </Style.MyIconButton>
          )}

          {closedClub ? (
            <Style.MyIconButton aria-label='favorite' disabled>
              <Style.StyledSpan4>모집완료</Style.StyledSpan4>
            </Style.MyIconButton>
          ) : (
            ""
          )}
          <CloseApplicantsDialog
            clubId={club.id}
            openCloseApplicants={openCloseApplicants}
            handleToggleCloseApplicants={handleToggleCloseApplicants}
            setCloseApplicantsButton={setCloseApplicantsButton}
          />
        </Style.ClubCardInfos>
      </Style.WholeCard>
      {!closedClub && make === "true" && !closeApplicantsButton && (
        <Style.AccordionDiv>
          <Accordion style={{ borderRadius: "0px 0px 4px 4px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
              onClick={handleClickAccordion}
            >
              <div style={{ fontWeight: "bold" }}>신청자 목록</div>
            </AccordionSummary>
            <AccordionDetails>
              {applicantsList.length === 0 && (
                <div>아직 신청자가 없습니다.</div>
              )}
              {!(applicantsList.length === 0) &&
                applicantsList.map((applicants) => (
                  <div
                    key={applicants["id"]}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                      justifyContent: "space-between",
                    }}
                  >
                    {applicants["nickname"]}
                    {!acceptanceButtonLoading.includes(applicants["id"]) &&
                    !applicants["status"] ? (
                      <Style.ApplicantsButton1
                        onClick={() => {
                          console.log('applicants["id"]', applicants["id"]);
                          handleClickAcceptance(applicants["id"]);
                          setAcceptanceButtonLoading([
                            ...acceptanceButtonLoading,
                            applicants["id"],
                          ]);
                        }}
                      >
                        수락하기
                      </Style.ApplicantsButton1>
                    ) : (
                      ""
                    )}
                    {!acceptanceButtonLoading.includes(applicants["id"]) &&
                    applicants["status"] ? (
                      <Style.ApplicantsButton2
                        onClick={() => {
                          handleClickRefuse(applicants["id"]);
                          setAcceptanceButtonLoading([
                            ...acceptanceButtonLoading,
                            applicants["id"],
                          ]);
                        }}
                      >
                        수락취소
                      </Style.ApplicantsButton2>
                    ) : (
                      ""
                    )}
                    {acceptanceButtonLoading.includes(applicants["id"]) &&
                    !applicants["status"] ? (
                      <Style.ApplicantsButton2
                        onClick={() => {
                          handleClickRefuse(applicants["id"]);
                          setAcceptanceButtonLoading([]);
                        }}
                      >
                        수락취소
                      </Style.ApplicantsButton2>
                    ) : (
                      ""
                    )}
                    {acceptanceButtonLoading.includes(applicants["id"]) &&
                    applicants["status"] ? (
                      <Style.ApplicantsButton1
                        onClick={() => {
                          console.log('applicants["id"]', applicants["id"]);
                          handleClickAcceptance(applicants["id"]);
                          setAcceptanceButtonLoading([]);
                        }}
                      >
                        수락하기
                      </Style.ApplicantsButton1>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
            </AccordionDetails>
          </Accordion>
        </Style.AccordionDiv>
      )}
      {closedClub || closeApplicantsButton ? (
        <Style.AccordionDiv>
          <Accordion style={{ borderRadius: "0px 0px 4px 4px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
              onClick={handleClickAccordion}
            >
              <div style={{ fontWeight: "bold" }}>클럽원 목록</div>
            </AccordionSummary>
            <AccordionDetails>
              {applicantsList.filter((applicants) => applicants["status"] === 1)
                .length === 0 &&
                make === "true" && <div>클럽원이 없습니다.</div>}
              {make !== "true" && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  {clubManager}
                  <GradeIcon style={{ fontSize: "16px", color: "#ffc300" }} />
                </div>
              )}
              {!(
                applicantsList.filter(
                  (applicants) => applicants["status"] === 1
                ).length === 0
              ) &&
                applicantsList
                  .filter((applicants) => applicants["status"] === 1)
                  .map((applicants) => (
                    <div key={applicants["id"]}>{applicants["nickname"]}</div>
                  ))}
            </AccordionDetails>
          </Accordion>
        </Style.AccordionDiv>
      ) : (
        ""
      )}
    </Style.WholeCardDiv>
  );
}

export default MyClubListCard;
