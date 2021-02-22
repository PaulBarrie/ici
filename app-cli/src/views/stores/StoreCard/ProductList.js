import React, {useState} from 'react';
import {connect} from 'react-redux';
import {addToBasket} from '../../../redux/actions/order_actions';
import {
    Avatar,
    Typography,
    Grid,
    List,
    ListItem,
    ButtonBase,
    makeStyles,
    Divider,
    TextField,
    Button
  } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: 10
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    rowLayout: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center' // To be vertically aligned
      },
  }));

const ProductList = (props) => {
    const classes = useStyles();
    const [orders, setOrders] = useState({});
    return (
        <div className={classes.root}>
        <List className={classes.root}>
            {props.products.map((product) => {
                return (
                    <ListItem alignItems="flex-start" divider={true}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <ButtonBase className={classes.image}>
                                <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                     {product.name}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                    {product.category.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                    {product.description}
                                    </Typography>
                                </Grid>
                                <div className="basket-form">
                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            label="Quantity"
                                            min={0}
                                            name="phone"
                                            onChange={(e) => {
                                                let new_orders = orders;
                                                new_orders[product.id] = e.target.value;
                                                setOrders(new_orders)
                                                }}
                                            type="number"
                                            InputProps={{ inputProps: { min: 0} }}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Button
                                    color="primary"
                                    size="medium"
                                    onClick={() =>{
                                        if (orders[product.id] > 0) {
                                            props.addToBasket(product.id, orders[product.id])}}
                                        }
                                    >
                                        <AddCircleIcon fontSize="large"/>
                                    </Button>
                                </div>
                                </Grid>
                                <Grid item>
                                <Typography variant="subtitle1">
                                    {(Number(product.price_ht) + (1 * Number(product.tax_rate))).toFixed(2)
                                    + "€" + (product.measure_unit == "unit"? "": "/" +
                                    product.measure_unit)}
                                </Typography>
                                </Grid>
                            </Grid>
                            </Grid>
                            <Divider variant="inset" component="div" />
                        </ListItem>
                        
                );
            })}
            </List>
        </div>
    );
}

const mapDispatchToProps =  {
    addToBasket
}

export default connect(null, mapDispatchToProps)(ProductList);
