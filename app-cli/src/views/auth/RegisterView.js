import React from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { withFormik} from 'formik';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from '../../components/Page';
import {register} from "../../redux/actions/register_actions";
import {RegisterForm} from './RegisterForm';

import { Navigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  phone: Yup.string().matches(phoneRegExp,'Must be a valid phone number').max(80).required('Phone number is required'),
  first_name: Yup.string().max(255).required('First name is required'),
  last_name: Yup.string().max(255).required('Last name is required'),
  password: Yup.string().max(255).required('password is required').min(8, "Must be at least 8 characters length"),
  policy: Yup.boolean().oneOf([true], 'This field must be checked')
})

const Form = withFormik({
    validationSchema: validationSchema,
    handleSubmit(values, {props}) {
        props.register(values)
    }
})(RegisterForm)


function mapStateToProps(state) {
  return {
    data: state.register.user,
    errors_api: state.register.error,
    loading: state.register.loading,
    registered: state.register.registered
  };
}
const mapDispatchToProps =  {
    register
}

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(Form);

const RegisterView = (props) => {
  const classes = useStyles();
  let registered = props.registered;
  return (
    <>
      {registered ? <Navigate to="/login"/> : 
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


export default connect(mapStateToProps)(RegisterView);

