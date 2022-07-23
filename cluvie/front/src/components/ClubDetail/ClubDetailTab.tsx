/* eslint-disable react/require-default-props */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, Rating } from "@mui/material";
// import styled from "@emotion/styled";
import ClubReview from "@/components/ClubDetail/ClubReview/ClubReview";
import ClubReviewButton from "@/components/ClubDetail/ClubReviewButton/ClubReviewButton";
import ClubBasicInfo from "@/components/ClubDetail/ClubBasicInfo/ClubBasicInfo";
import * as Interface from "@/utils/interface";
import * as Api from "@/utils/api";

interface TabPanelProps {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({
  club,
  preview,
  isSignIn = false,
}: {
  club: Interface.Club,
  preview?: boolean,
  isSignIn?: boolean,
}) {
  const [value, setValue] = useState(0);
  const [reviewList, setReviewList] = useState([]);
  const [rating, setRating] = useState();
  const [isAcceptClub, setIsAcceptClub] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!preview) {
      Api.get(`/clubs/${club.id}/review`)
        .then((res) => {
          console.log(res.data)
          setReviewList(res.data.reviews)
        })
        .catch((err) => console.log(err));

      Api.get(`/clubs/${club.id}/rating`)
        .then((res) => {
          console.log("rating", res.data)
          setRating(res.data.rating)
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (isSignIn && !preview) {
      Api.get("/applications/acceptance/clubs")
        .then((res) => {
          setIsAcceptClub(
            res.data.myClubList.filter(
              (curClub: Interface.Club) => curClub.id === club.id
            ).length
          );
        })
        .catch((err) => console.log(err));
    }
  }, [club]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          textColor='inherit'
          value={value}
          onChange={handleChange}
          sx={{ width: "100%", paddingTop: "50px" }}
          TabIndicatorProps={{
            style: { background: "#FFC300" },
          }}
          aria-label='basic tabs example'
        >
          <Tab
            label={
              <span
                style={{
                  color: value === 0 ? "#FFC300" : "rgba(0, 0, 0, 0.6)",
                  fontSize: value === 0 ? "20px" : "16px",
                }}
              >
                기본 정보
              </span>
            }
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...a11yProps(0)}
            sx={{ width: "33.33%", maxWidth: "none" }}
          />
          <Tab
            label={
              <span
                style={{
                  color: value === 1 ? "#FFC300" : "rgba(0, 0, 0, 0.6)",
                  fontSize: value === 1 ? "20px" : "16px",
                }}
              >
                상세 정보
              </span>
            } // eslint-disable-next-line react/jsx-props-no-spreading
            {...a11yProps(0)}
            sx={{ width: "33.33%", maxWidth: "none" }}
          />
          <Tab
            label={
              <span
                style={{
                  color: value === 2 ? "#FFC300" : "rgba(0, 0, 0, 0.6)",
                  fontSize: value === 2 ? "20px" : "16px",
                }}
              >
                참여 후기
              </span>
            } // eslint-disable-next-line react/jsx-props-no-spreading
            {...a11yProps(0)}
            sx={{ width: "33.33%", maxWidth: "none" }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ClubBasicInfo club={club} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {club.description && (
          // eslint-disable-next-line react/no-danger
          <div dangerouslySetInnerHTML={{ __html: club.description }} />
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {preview && <div>아직 참여 후기가 없습니다.</div>}
        {!preview && (
          <div>
            <div
              style={{
                margin: "30px 0 50px 0",
                padding: "46px",
                background: "rgba(0, 0, 0, 0.03)",
                textAlign: "center",
              }}
            >
              <Rating value={Number(rating)} precision={0.1} readOnly />
              <div style={{ fontSize: "36px" }}>{rating || "0"}점</div>
              <div style={{ fontSize: "13px", color: "rgba(0, 0, 0, 0.6)" }}>
                (총 {reviewList.length}개의 후기)
              </div>
            </div>
            {club.id && club.state && isAcceptClub ? (
              <ClubReviewButton clubId={club.id} />
            ) : (
              ""
            )}
            {reviewList.length === 0 && (
              <div style={{ marginTop: "50px" }}>
                아직 참여 후기가 없습니다.
              </div>
            )}
            {!(reviewList.length === 0) &&
              reviewList.map((review) => (
                <ClubReview key={review["id"]} review={review} />
              ))}
          </div>
        )}
      </TabPanel>
    </Box>
  );
}
