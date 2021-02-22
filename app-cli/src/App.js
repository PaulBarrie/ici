import 'react-perfect-scrollbar/dist/css/styles.css';
import React, {useEffect} from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import './mixins/chartjs';
import {connect} from 'react-redux'; 
import theme from './theme';
import routes from './routes';
import {getBasket} from './redux/actions/order_actions';

const App = () => {
  const routing = useRoutes(routes());
  
  return (
        <ThemeProvider theme={theme}>
          <GlobalStyles />
            {routing}
        </ThemeProvider>  
          );
};



function mapStateToProps(state) {
  const {users, authentication , register, sellers_around, products, orders} = state;
  return {
      register,
      authentication,
      users,
      sellers_around,
      products,
      orders
  };
}



const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
