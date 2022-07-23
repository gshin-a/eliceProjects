/* eslint-disable import/extensions */
import React from "react";
import { Button, Dialog, DialogTitle, DialogActions } from "@mui/material";
import DeleteJoinButton from "./CloseApplicantsDialogStyle";
import * as Api from "@/utils/api";

type ClubDeleteJoinDialogProps = {
  // eslint-disable-next-line react/require-default-props
  clubId?: number,
  openCloseApplicants: boolean,
  handleToggleCloseApplicants: React.MouseEventHandler<HTMLButtonElement>,
  setCloseApplicantsButton: React.Dispatch<React.SetStateAction<boolean>>,
};

function CloseApplicantsDialog({
  clubId,
  openCloseApplicants,
  handleToggleCloseApplicants,
  setCloseApplicantsButton,
}: ClubDeleteJoinDialogProps) {
  const handleCloseApplicants = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    Api.patch("/clubs/close", { club_id: clubId })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    handleToggleCloseApplicants(event);
    setCloseApplicantsButton((prev) => !prev);
  };
  return (
    <Dialog
      open={openCloseApplicants}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        모집을 마감하시겠습니까?
      </DialogTitle>
      <DialogActions>
        <Button color='inherit' onClick={handleToggleCloseApplicants}>
          취소하기
        </Button>
        <DeleteJoinButton
          color='inherit'
          onClick={handleCloseApplicants}
          autoFocus
        >
          모집마감
        </DeleteJoinButton>
      </DialogActions>
    </Dialog>
  );
}

export default CloseApplicantsDialog;
