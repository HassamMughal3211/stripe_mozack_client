import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import {
  brandName,
  lightBackground,
  navbar,
} from "../../Assets/Theme/ThemeColors";
// import PopOver from "../Popover/PopOver";
import { Popover } from "antd";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import PersonAdd from '@mui/icons-material/PersonAdd';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';



const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = useSelector((state) => state.user.data);
  const open = Boolean(anchorEl);
  console.log("username", user.data.user.username);
  const username = user.data.user.username;
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Grid
      container
      sx={12}
      style={{
        height: "6vh",
        color: "white",
        width: "100vw",
        background: `${lightBackground}`,
      }}
    >
      <Grid
        md={3}
        xs={6}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">{brandName}</Typography>
      </Grid>
      <Grid md={8} xs={0}></Grid>
      <Grid md={1} xs={6}>
        <span
        // style={{
        //   height: "100%",
        //   width: "100%",
        //   display: "flex",
        //   justifyContent: "center",
        //   alignItems: "center",
        // }}
        >
          {/* <PopOver name={username} /> */}
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>{username[0]}</Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem>
              <Avatar /> {username}
            </MenuItem>
            <MenuItem onClick={() => { localStorage.clear(); window.location.reload() }}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </span>
      </Grid>
    </Grid>
  );
};

export default Navbar;
