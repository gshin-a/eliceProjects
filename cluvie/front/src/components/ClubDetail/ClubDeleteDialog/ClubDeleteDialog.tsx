/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogTitle, DialogActions } from "@mui/material";
import * as Api from "@/utils/api";

type ClubDeleteDialogProps = {
  // eslint-disable-next-line react/require-default-props
  clubId?: number,
  openDelete: boolean,
  handleCloseDelete: React.MouseEventHandler<HTMLButtonElement>,
};

function ClubDeleteDialog({
  clubId,
  openDelete,
  handleCloseDelete,
}: ClubDeleteDialogProps) {
  const navigate = useNavigate();
  const handleDelete = () => {
    console.log(clubId);
    Api.delete("/clubs", clubId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    navigate("/clubList");
  };

  return (
    <Dialog
      open={openDelete}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>삭제하시겠습니까?</DialogTitle>
      <DialogActions>
        <Button color='inherit' onClick={handleCloseDelete}>
          취소하기
        </Button>
        <Button color='warning' onClick={handleDelete} autoFocus>
          삭제하기
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ClubDeleteDialog;
