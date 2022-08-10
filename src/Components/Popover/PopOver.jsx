import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Popover, Button } from "antd";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authAction";


const text = <span>ADMIN</span>;
// const dispatch = useDispatch();
// const logoutF = () =>{
//   logout(dispatch);
// }

const content = (
  <div >
    {/* <p onClick={() => {localStorage.clear(); window.location.reload()} }>logout</p> */}
    <Link
      to="/signin"
    //  style={{textDecoration :'none' , cursor:'pointer'}}
    >logout
    </Link>
  </div >
);

const buttonWidth = "70px";

export default ({ name }) => (
  // console.log(first)
  <div className="demo">
    <div style={{ clear: "both", whiteSpace: "nowrap" }}>
      <Popover
        placement="bottomRight"
        title={'text'}
        // content={content}
        trigger="click"
      >
        <span style={{ cursor: "pointer", width: "100px" }}>
          <Typography style={{ color: "white" }}
          >
            {name}<KeyboardArrowDownIcon />
          </Typography>
        </span>
      </Popover>
    </div>
  </div>
);
