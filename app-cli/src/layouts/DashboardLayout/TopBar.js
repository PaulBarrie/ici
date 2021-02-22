import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from '../../components/Logo';
import {logout} from "../../redux/actions/auth_actions"; 
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import BasketPreview from './BasketPreview';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  ...props
}) => {
  const classes = useStyles();
  const [notifications] = useState([]);
  const navigate = useNavigate();
  function handleClick(e) {
    e.preventDefault();
    props.logout()
    navigate("/login")
  }
  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...props}
    >
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <BasketPreview/>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon priops={props} />
            </Badge>
          </IconButton>
          <IconButton color="inherit"  onClick={handleClick}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

const mapDispatchToProps = {
  logout
}

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default connect(null, mapDispatchToProps)(TopBar);