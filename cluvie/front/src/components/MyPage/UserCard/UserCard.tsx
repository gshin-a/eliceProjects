/* eslint-disable import/extensions */
import React, { useState, useEffect } from "react";
import { CardContent, IconButton, TextField, CardActions } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import CakeIcon from "@mui/icons-material/Cake";
import EmailIcon from "@mui/icons-material/Email";
import * as Api from "@/utils/api";
import * as Style from "./UserCardStyle";

interface User {
  nickname?: string;
  birthday?: number;
  email?: string;
  description?: string;
  sex?: string;
}

function UserCard() {
  // prettier-ignore
  const [userInfo, setUserInfo] = useState<User>({});
  // prettier-ignore
  const [patchNickname, setPatchNickname] = useState("")
  const [patchDescription, setPatchDescription] = useState("");
  const [editToggle, setEditToggle] = useState(false);

  const handleEditToggle = () => {
    setEditToggle((prev) => !prev);
  };

  const handleEdit = () => {
    setEditToggle(false);

    Api.patch("/users", {
      nickname: patchNickname,
      description: patchDescription,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setUserInfo({
      ...userInfo,
      nickname: patchNickname,
      description: patchDescription,
    });
  };

  const handleDescription = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPatchDescription(event.target.value);
  };

  const hadleNickname = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPatchNickname(event.target.value);
  };

  useEffect(() => {
    if (!patchNickname) {
      Api.get("/users")
        .then((res) => {
          console.log(res);
          setUserInfo(res.data.user);
          setPatchNickname(res.data.user.nickname);
          setPatchDescription(res.data.user.description);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  if (!userInfo.email) return null;

  return (
    <Style.WholeUserCard>
      <Style.FirstCardContent>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {!editToggle ? (
            <span style={{ fontSize: "24px", fontWeight: "bold" }}>
              {userInfo.nickname}
            </span>
          ) : (
            <TextField
              label='닉네임'
              size='small'
              defaultValue={userInfo.nickname}
              onChange={hadleNickname}
            />
          )}
          {userInfo.sex === "남성" && (
            <MaleIcon style={{ fontSize: "24px", color: "#ffc300" }} />
          )}
          {userInfo.sex === "여성" && (
            <FemaleIcon style={{ fontSize: "24px", color: "#ffc300" }} />
          )}
        </div>
        <IconButton onClick={handleEditToggle} style={{ margin: "0 0 0 auto" }}>
          <EditIcon style={{ fontSize: "24px" }} />
        </IconButton>
      </Style.FirstCardContent>
      <CardContent>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <CakeIcon />
          <span style={{ marginLeft: "5px" }}>{userInfo.birthday}</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <EmailIcon />
          <span style={{ marginLeft: "5px" }}>{userInfo.email}</span>
        </div>
      </CardContent>
      <CardContent>
        {!editToggle ? (
          <div>{userInfo.description}</div>
        ) : (
          <TextField
            label='자기소개'
            size='small'
            multiline
            maxRows={4}
            defaultValue={userInfo.description}
            onChange={handleDescription}
          />
        )}
      </CardContent>
      {editToggle && (
        <CardActions>
          <Style.UserEditButton onClick={handleEdit}>수정</Style.UserEditButton>
        </CardActions>
      )}
    </Style.WholeUserCard>
  );
}

export default UserCard;
