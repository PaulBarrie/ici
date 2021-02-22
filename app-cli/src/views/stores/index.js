import React, {useState, useEffect} from "react";
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import {connect} from 'react-redux';
import {getSellersAround} from "../../redux/actions/seller_actions";
import { CSSTransition } from "react-transition-group";
import StoreCard from "./StoreCard/StoreCard";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';

import {
    IconButton,
    makeStyles,
  } from '@material-ui/core';

import {SliderForm} from "./FormMap"; 
import Page from '../../components/Page';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      height: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    }
  }));
  


const MapStores = (props) => {
    const [position, setPosition] = useState();
    const [range, setRange] = useState(29);
    const [sellers, setSellers] = useState();
    const [showStoreCard, setShowStoreCard] = useState(false);
    const [sellerTarget, setSellerTarget] = useState(undefined);
    const classes = useStyles();

    const back = () => {setShowStoreCard(false);}

    useEffect(() => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(loc) {
        const pos = [loc.coords.latitude, loc.coords.longitude];
        setPosition(pos);
        });
      }
    }, [])
    useEffect(() => {
        if(position) {
          props.getSellersAround(position, (range + 2) * 1_000);
          setSellers(props.sellers)
        }
    }, [position, range]);


    if (position && sellers) {
      if (showStoreCard)  {
        return (
          <CSSTransition
          in={setShowStoreCard}
          timeout={2000}
          classNames="fade"
          unmountOnExit
          appear
          // onEntered={}
          // onExit={this.listSwitch}
          >
            <StoreCard seller={sellerTarget} back={back}/>
          </CSSTransition>
        );
      } else {
        return ( 
          <Page className={classes.root} title="Stores">
              <div className="slider-form">
                <h4> Up to (km)</h4>
              <SliderForm 
              valueLabelDisplay="auto" min={0} max={120} defaultValue={range}
              onChange={(e, val) => {setRange(val)}}
              />
                
              </div>                
              

          <div>
            <MapContainer center={position} zoom={12} scrollWheelZoom={true} placeholder={<SliderForm valueLabelDisplay="auto" aria-label="Up to" defaultValue={20} />}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Display sellers */}
                {props.sellers.map((seller) => {
                  return(
                    <Marker position={seller.address.location}>
                      <Popup>
                        <center>
                        <h1> {seller.name}</h1>
                        <h3> <EmailIcon color="primary"/>  {seller.email} </h3> 
                        <h3> <PhoneIcon color="primary"/>  {seller.phone} </h3> 
                        <IconButton
                        color="inherit"
                        onClick={() => {setSellerTarget(seller); setShowStoreCard(true)}}
                        >
                          <MoreHorizIcon color="primary"/>
                        </IconButton>
                        </center>
                      </Popup>
                    </Marker>
                  );
                })
              }
            </MapContainer>
          </div>
          </Page>
      );
      }
    } else {
        return null;
    }
}


const mapDispatchToProps =  {
  getSellersAround
}
const mapStateToProps = (state) => {
  return {
    sellers: state.sellers_around.data
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MapStores);