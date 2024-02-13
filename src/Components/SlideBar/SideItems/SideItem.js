import React from "react";
import "./SideItem.css";
import { NavLink } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';


function SideItem({ Icon, HasBadge, BadgeText, Name, HasLink, link , close }) {

  const buttonHandler = ({ isActive }) => {
    return {
      background: isActive ? "var(--five-color)" : "",
      color: isActive ? "#fff" : "gray",
      borderLeft: isActive ? "1px solid var(--second-color)" : "",
    };
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -23,
      top: 8,
      border: `1px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  return (
    <>
      {HasLink == true ? (
        <NavLink to={link ? link : "/"} style={buttonHandler} className={close ? 'close sideitem' : 'sideitem'}>
          <Icon className="icon" />
          {HasBadge == true ? 
            <StyledBadge badgeContent={BadgeText} color="success">
              <span>{Name}</span>
            </StyledBadge>
           : 
            <span>{Name}</span>
          }
        </NavLink>
      ) : (
        <NavLink style={buttonHandler} className={close ? 'close sideitem' : 'sideitem'}>
          <Icon className="icon" />
          {HasBadge == true ? 
            <StyledBadge badgeContent={BadgeText} color="success">
              <span>{Name}</span>
            </StyledBadge>
           : 
            <span>{Name}</span>
          }
        </NavLink>
      )}
   
    </>
  );
}

export default SideItem;
