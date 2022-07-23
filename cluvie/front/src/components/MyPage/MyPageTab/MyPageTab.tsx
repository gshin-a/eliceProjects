/* eslint-disable react/require-default-props */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import DefaultTabPanel from "@/components/MyPage/DefaultTabPanel/DefaultTabPanel";
import MyPageClubCard from "@/components/MyPage/MyPageClubCard/MyPageClubCard";
import * as Api from "@/utils/api";
import * as Style from "./MyPageTabStyle";

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

export default function BasicTabs() {
  const [value, setValue] = useState(0);
  const [likesClubs, setLikesClubs] = useState([]);
  const [applicantsClubs, setApplicantsClubs] = useState([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    Api.get("/likes/clubs")
      .then((res) => {
        console.log("찜하기목록", res.data.likeClubList);
        setLikesClubs(res.data.likeClubList);
      })
      .catch((err) => console.log(err));

    Api.get("/applications/clubs")
      .then((res) => {
        console.log("신청목록", res.data.applyingClubList);
        setApplicantsClubs(res.data.applyingClubList);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box sx={{ width: "100%", marginLeft: "300px" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          textColor='inherit'
          value={value}
          onChange={handleChange}
          sx={{ width: "100%" }}
          TabIndicatorProps={{
            style: { background: "#FFC300", height: "3px" },
          }}
          aria-label='basic tabs example'
        >
          <Tab
            label={
              <span
                style={{
                  color: value === 0 ? "#FFC300" : "rgba(0, 0, 0, 0.6)",
                  fontSize: value === 0 ? "24px" : "20px",
                  fontWeight: value === 0 ? "bold" : "normal",
                }}
              >
                찜한 클럽
              </span>
            }
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...a11yProps(0)}
            sx={{ width: "50%", maxWidth: "none" }}
          />
          <Tab
            label={
              <span
                style={{
                  color: value === 1 ? "#FFC300" : "rgba(0, 0, 0, 0.6)",
                  fontSize: value === 1 ? "24px" : "20px",
                  fontWeight: value === 1 ? "bold" : "normal",
                }}
              >
                신청한 클럽
              </span>
            } // eslint-disable-next-line react/jsx-props-no-spreading
            {...a11yProps(0)}
            sx={{ width: "50%", maxWidth: "none" }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {likesClubs.length === 0 && (
          <DefaultTabPanel
            text1='아직 내가 찜한 클럽이 없어요!'
            text2='내 취향에 맞는 클럽을 찜하고, 다른 클러비들과 가까워져 보세요!'
          />
        )}
        {!(likesClubs.length === 0) && (
          <Style.ClubList>
            {likesClubs.map((likesClub) => (
              <MyPageClubCard
                key={likesClub["club_id"]}
                club={likesClub}
                like
              />
            ))}
          </Style.ClubList>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {applicantsClubs.length === 0 && (
          <DefaultTabPanel
            text1='아직 내가 신청한 클럽이 없어요!'
            text2='내 취향에 맞는 클럽에 가입하고, 다른 클러비들과 가까워져 보세요!'
          />
        )}
        {!(applicantsClubs.length === 0) && (
          <Style.ClubList>
            {applicantsClubs.map((applicantsClub) => (
              <MyPageClubCard
                key={applicantsClub["club_id"]}
                club={applicantsClub}
              />
            ))}
          </Style.ClubList>
        )}
      </TabPanel>
    </Box>
  );
}
