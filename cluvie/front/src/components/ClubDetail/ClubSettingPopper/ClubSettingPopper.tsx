/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import * as React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ClubDeleteDialog from "@/components/ClubDetail/ClubDeleteDialog/ClubDeleteDialog";
import * as Interface from "@/utils/interface";
import SettingLink from "./ClubSettingPopperStyle";

export default function SimplePopper({ club }: { club: Interface.Club }) {
  // prettier-ignore
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openDelete, setOpenDelete] = React.useState(false);

  const open = Boolean(anchorEl);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    handleClose();
    handleOpenDelete();
  };

  return (
    <div>
      <Button
        id='basic-button'
        color='inherit'
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup='true'
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <SettingsIcon />
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <SettingLink to='/clubUpdate' state={{ club }}>
          <MenuItem onClick={handleClose}>수정</MenuItem>
        </SettingLink>
        <MenuItem onClick={handleDelete}>삭제</MenuItem>
      </Menu>
      <ClubDeleteDialog
        clubId={club.id}
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
      />
    </div>
  );
}
