import * as React from "react";
import { menuItem } from "../../mockData";
import "./sideBar.scss";
import { NavLink } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";
import SubtitlesOutlinedIcon from "@mui/icons-material/SubtitlesOutlined";
const SideBar = ({ children }) => {
  return (
    <>
      <div className="sidebar_main_container">
        <div className="sidebar_container">
          <NavLink className="list_link" to="/dashboard">
            <div className="sidebar_dashboard_icon">              
              <h1>Kanban Board</h1>
            </div>
          </NavLink>
         
              {menuItem.map((item, index) => {
                return (
                  <NavLink
                    key={index}
                    className="list_link"
                    to={item.path}
                    activeclassName="active"
                  >
                    <div className="sideBar_item">
                      <Typography className="icons">{item.icon}</Typography>
                      <Typography
                        sx={{
                          marginLeft: "10px",
                          fontWeight: "bold",
                          fontSize: 20,
                        }}
                      >
                        {item.name}
                      </Typography>
                    </div>
                  </NavLink>
                );
              })}
            
        </div>
        <div className="right_container">
          <div className="right">{children}</div>
        </div>
      </div>
    </>
  );
};
export default SideBar;
