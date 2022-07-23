/* eslint-disable react/require-default-props */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import DefaultTabPanel from "@/components/MyClubList/DefaultTabPanel/DefaultTabPanel";
import MyClubListCard from "@/components/MyClubList/MyClubListCard/MyClubListCard";
import * as Api from "@/utils/api";
import * as Style from "./MyClubListTabStyle";

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
  const [makeClubs, setMakeClubs] = useState([]);
  const [acceptanceClubs, setAcceptanceClubs] = useState([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    Api.get("/clubs/user")
      .then((res) => {
        console.log("만든클럽목록", res.data);
        setMakeClubs(res.data.clubList.clubList);
      })
      .catch((err) => console.log(err));

    Api.get("/applications/acceptance/clubs")
      .then((res) => {
        console.log("가입한클럽목록", res.data);
        setAcceptanceClubs(res.data.myClubList);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
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
                만든 클럽
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
                가입한 클럽
              </span>
            } // eslint-disable-next-line react/jsx-props-no-spreading
            {...a11yProps(0)}
            sx={{ width: "50%", maxWidth: "none" }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {makeClubs.length === 0 && (
          <DefaultTabPanel
            text1='아직 내가 만든 클럽이 없어요!'
            text2='내 취향에 맞는 클럽을 만들고, 다른 클러비들과 가까워져 보세요!'
            make
          />
        )}
        {!(makeClubs.length === 0) && (
          <Style.ClubList>
            {makeClubs.map((makeClub) => (
              <MyClubListCard
                key={makeClub["id"]}
                club={makeClub}
                make='true'
                closedClub={makeClub["state"]}
              />
            ))}
          </Style.ClubList>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {acceptanceClubs.length === 0 && (
          <DefaultTabPanel
            text1='아직 내가 가입한 클럽이 없어요!'
            text2='내 취향에 맞는 클럽에 가입하고, 다른 클러비들과 가까워져 보세요!'
          />
        )}
        {!(acceptanceClubs.length === 0) && (
          <Style.ClubList>
            {acceptanceClubs.map((acceptanceClub) => (
              <MyClubListCard
                key={acceptanceClub["id"]}
                club={acceptanceClub}
                make='false'
                closedClub={acceptanceClub["state"]}
              />
            ))}
          </Style.ClubList>
        )}
      </TabPanel>
    </Box>
  );
}
