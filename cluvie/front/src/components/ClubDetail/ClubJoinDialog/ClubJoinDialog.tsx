import React from "react";
import { Button, Dialog, DialogTitle, DialogActions } from "@mui/material";
import JoinButton from "./ClubJoinDialogStyle";
import * as Api from "@/utils/api";

type ClubJoinDialogProps = {
  // eslint-disable-next-line react/require-default-props
  clubId?: number,
  openJoin: boolean,
  handleToggleJoin: React.MouseEventHandler<HTMLButtonElement>,
  setApplicantsButton: React.Dispatch<React.SetStateAction<boolean>>,
};

function ClubJoinDialog({
  clubId,
  openJoin,
  handleToggleJoin,
  setApplicantsButton,
}: ClubJoinDialogProps) {
  const handlePostJoin = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    Api.post("/applications", { club_id: clubId })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    handleToggleJoin(event);
    setApplicantsButton((prev) => !prev);
  };

  return (
    <Dialog
      open={openJoin}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>신청하시겠습니까?</DialogTitle>
      <DialogActions>
        <Button color='inherit' onClick={handleToggleJoin}>
          취소하기
        </Button>
        <JoinButton color='inherit' onClick={handlePostJoin} autoFocus>
          신청하기
        </JoinButton>
      </DialogActions>
    </Dialog>
  );
}

export default ClubJoinDialog;
