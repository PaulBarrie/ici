import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import './mixins/chartjs';
import {connect} from 'react-redux'; 
import theme from './theme';
import routes from './routes';


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
  const {users, authentication , register} = state;
  return {
      register,
      authentication,
      users,
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
