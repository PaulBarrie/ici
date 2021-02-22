import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router';
import * as Yup from 'yup';
import { withFormik } from 'formik';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import {login} from "../../redux/actions/auth_actions";
import {LoginForm} from "./LoginForm"; 
import Page from '../../components/Page';
import {connect} from 'react-redux';
import { Navigate } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));


const Form = withFormik({
  validationSchema: validationSchema,
  handleSubmit(values, {props}) {
      const {identifier, password} = values;
      props.login(identifier, password); 
  }
})(LoginForm);



const mapDispatchToProps =  {
  login
}
function mapStateToPropsForm(state) {
  return {
      data: state.authentication.user,
      errors_api: state.authentication.error,
      loading: state.authentication.loading,
  };
}
const ConnectedForm = connect(mapStateToPropsForm, mapDispatchToProps)(Form);

const validationSchema = Yup.object().shape({
  identifier: Yup.string().max(255).required('Identifier is required'),
  password: Yup.string().max(255).required('Password is required')
});

const LoginView = (props) => {
  const classes = useStyles();
  let loggedIn = props.loggedIn;
  return (
    <>
      {loggedIn ? <Navigate to="/app/dashboard"/> : 
                        <Page
                          className={classes.root}
                          title="Register"
                        >
                          <Box
                            display="flex"
                            flexDirection="column"
                            height="100%"
                            justifyContent="center"
                          >
                            <Container maxWidth="sm">
                              <ConnectedForm/>
                            </Container>
                          </Box>
                        </Page>
    } 
    </>
  );
};

function mapStateToPropsView(state) {
  return {
    loggedIn: state.authentication.loggedIn
  };
}

export default connect(mapStateToPropsView)(LoginView);
