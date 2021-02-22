import React from 'react';
import Popup from 'reactjs-popup';
import {
    Avatar,
    Button,
    Typography,
    Box
  } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import "./ProductPopup.css";

const ProductPopup = (props) => {
    console.log("props");
    return(
        <Popup open={props.open} position="right center">
            <Typography
            component="div"
            variant="body1"
            style={{ height: 100, width: '100%', position: 'relative' }}
            >
            <Box
                bgcolor="grey.700"
                color="white"
                p={2}
                position="absolute"
                top={40}
                left="100%"
                zIndex="tooltip"
            >
                <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                color="inherit"
                size="small"
                onClick={() =>{setOpen(false);}}
                >
                    <CloseIcon size="small" color="primary"/>
                </Button>
            </Box>
                <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                color="inherit"
                size="small"
                onClick={() =>{console.log("click")}}
                >
                <DeleteIcon size="small" color="primary"/>
                </Button>
        </Typography>
        </Popup>
    );
};

export default ProductPopup;