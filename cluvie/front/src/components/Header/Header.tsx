import * as React from "react";
import { useRecoilValue } from "recoil";

import { Box, Button, Toolbar, IconButton, Menu } from "@mui/material";
import * as Style from "./HeaderStyle";

import { isSignInUser } from "@/utils/recoil";

function Header() {
  // prettier-ignore
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isSignIn =  useRecoilValue<boolean>(isSignInUser);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Style.HeaderAppBar position='fixed'>
        <Toolbar>
          <Style.LogoIconButton edge='start' color='inherit' aria-label='menu'>
            <Style.LogoLink to='/'>CLUVIE</Style.LogoLink>
          </Style.LogoIconButton>
          <Style.ClubListDiv>
            <Button color='inherit'>
              <Style.TextLink to='/clublist' style={{fontSize: 18}}>모든 클럽 보기</Style.TextLink>
            </Button>
          </Style.ClubListDiv>
          {isSignIn ? (
            <div>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <Style.MyAccountCircle />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 17,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                keepMounted
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Style.MyMenuItem onClick={handleClose}>
                  <Style.TextLink to='/myClublist'>
                    내 클럽 리스트
                  </Style.TextLink>
                </Style.MyMenuItem>
                <Style.MyMenuItem onClick={handleClose}>
                  <Style.TextLink to='/myPage'>마이페이지</Style.TextLink>
                </Style.MyMenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <Button color='inherit'>
                <Style.TextLink to='/signIn' style={{fontSize: 18}}>로그인</Style.TextLink>
              </Button>
            </div>
          )}
        </Toolbar>
      </Style.HeaderAppBar>
    </Box>
  );
}

export default Header;
