import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {productSeller} from '../../../redux/actions/product_actions';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import {
    IconButton,
    Avatar,
  } from '@material-ui/core';
  import { Pagination } from '@material-ui/lab';

import ProductList from './ProductList';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import LocationOnIcon from '@material-ui/icons/LocationOn';



const StoreCard = (props) => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState();
  const [nbProducts, setNbProducts] = useState(12);
  useEffect(() =>{
    console.log("Change page");
    props.productSeller(props.seller.id, page, 12);
  }
  , [page])
  useEffect(() => {
    if (props.products) {
      setProducts(props.products.products);
      setNbProducts(props.products.nb_products);
    }
  }, [props.products])
  if (products) {
    return  (
      <div className="container">
        <div className="store-card">
            <div className="back-button">
              <IconButton
              color="inherit"
              onClick={props.back}
              >
              <ArrowBackOutlinedIcon color="inherit"/>
              </IconButton>
            </div>
              
                <Avatar
                  src={'/static/images/avatars/avatar_6.png'}
                  style={{ height: '100px', width: '100px', margin: '0 auto'}}
                />
              <div className="store-details">
                <h1> {props.seller.name} </h1>
                <h5> <EmailIcon color="primary"/>  {props.seller.email} 
                      <PhoneIcon color  ="primary"/>  {props.seller.phone} 
                </h5>
                <h5> <LocationOnIcon color="primary"/> 
                {props.seller.address.street_nb} {props.seller.address.street_name}, {props.seller.address.post_code} {props.seller.address.city} 
                </h5>
              </div>
              <div className="product-list">
                <ProductList products={products}/>
              </div>
              <div className="product-pagination">
                <Pagination
                  color="primary"
                  page={page}
                  onChange={(e, page) => { e.preventDefault(); setPage(page)}}
                  count={Math.floor(props.products.nb_products / 12)}
                  size="small"
                />
              </div>
              
        </div>
        
    </div>
  )} else {
    return null;
  }
}

const mapDispatchToProps =  {
  productSeller
}
const mapStateToProps = (state) => {
  return {
    products: state.products.data
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(StoreCard);