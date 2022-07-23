import React from "react";
import { Button, Dialog, DialogTitle, DialogActions } from "@mui/material";
import DeleteJoinButton from "./ClubDeleteJoinDialogStyle";
import * as Api from "@/utils/api";

type ClubDeleteJoinDialogProps = {
  // eslint-disable-next-line react/require-default-props
  clubId?: number,
  openDeleteJoin: boolean,
  handleToggleDeleteJoin: React.MouseEventHandler<HTMLButtonElement>,
  setApplicantsButton: React.Dispatch<React.SetStateAction<boolean>>,
};

function ClubDeleteJoinDialog({
  clubId,
  openDeleteJoin,
  handleToggleDeleteJoin,
  setApplicantsButton,
}: ClubDeleteJoinDialogProps) {
  const handleDeleteJoin = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    Api.delete("/applications", clubId)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    handleToggleDeleteJoin(event);
    setApplicantsButton((prev) => !prev);
  };
  return (
    <Dialog
      open={openDeleteJoin}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        신청 취소를 하시겠습니까?
      </DialogTitle>
      <DialogActions>
        <Button color='inherit' onClick={handleToggleDeleteJoin}>
          취소하기
        </Button>
        <DeleteJoinButton color='inherit' onClick={handleDeleteJoin} autoFocus>
          신청취소
        </DeleteJoinButton>
      </DialogActions>
    </Dialog>
  );
}

export default ClubDeleteJoinDialog;
