import React from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  ListItemText,
  makeStyles
} from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import getInitials from '../../utils/getInitials';
import ProductPopup from '../../components/ProductPopup/ProductPopup';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));


const useStyles = makeStyles((theme) => ({
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const  BasketPreview = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <ShoppingBasketIcon/>
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.basket.map((item) => {
            return(
                <ItemPopup {...item}/>
        )})}
      </StyledMenu>
      {/* <BasketPreviewList props={props}/> */}
    </div>
  );
}

const ItemPopup = (props) => {
  const [open, setOpen] = React.useState(false)
  const classes = useStyles();
  console.log(props)
  return(
    <>
    <MenuItem onClick={()=>{setOpen(true)}}>
          <Avatar
                className={classes.avatar}
                src={props.product.picture}
              >
                {getInitials(props.product.name)}
          </Avatar>
          <ListItemText primary={props.product.name} secondary={`${props.quantity} ${props.product.measure_unit} - ${Math.round(props.total_price * 100)/100}€`}/>
      </MenuItem>
    <ProductPopup {...props} setOpen={setOpen} open={open} />
    </>
  );
}

const mapStateToProps = (state) => {
    return {
        basket: state.orders.data
    }
}

export default connect(mapStateToProps)(BasketPreview);