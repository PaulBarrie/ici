import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
    Box,
    Button,
    Grid,
    Link,
    TextField,
    Typography,
  } from '@material-ui/core';

import FacebookIcon from '../../icons/Facebook';
import GoogleIcon from '../../icons/Google';

export const LoginForm = (props) =>{
    const {handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          setSubmitting,
          touched,
          values,
          errors } = props;
      useEffect(() => {
          if(!props.loading) {
            for (let key in props.errors_api) {
            console.log(key)
            console.log(props.errors_api[key])
            if (props.errors_api[key] != "") {
              console.log(props.errors_api[key])
              switch (key) {
                case "identifier":
                  props.setErrors({identifier: props.errors_api[key]});
                  break;
                case "password":
                  props.setErrors({password: props.errors_api[key]});
              }
            }
          }
        setSubmitting(false);
      }
        
      }, [props.loading])
      return (
        <form onSubmit={handleSubmit}>
        <Box mb={3}>
          <Typography
            color="textPrimary"
            variant="h2"
          >
            Sign in
          </Typography>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="body2"
          >
            Sign in on the internal platform
          </Typography>
        </Box>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
            md={6}
          >
            <Button
              color="primary"
              fullWidth
              startIcon={<FacebookIcon />}
              onClick={handleSubmit}
              size="large"
              variant="contained"
            >
              Login with Facebook
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <Button
              fullWidth
              startIcon={<GoogleIcon />}
              onClick={handleSubmit}
              size="large"
              variant="contained"
            >
              Login with Google
            </Button>
          </Grid>
        </Grid>
        <Box
          mt={3}
          mb={1}
        >
          <Typography
            align="center"
            color="textSecondary"
            variant="body1"
          >
            or login with email address
          </Typography>
        </Box>
        <TextField
          error={Boolean(touched.identifier && errors.identifier)}
          fullWidth
          helperText={touched.identifier && errors.identifier}
          label="Email or phone number"
          margin="normal"
          name="identifier"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.identifier}
          variant="outlined"
        />
        <TextField
          error={Boolean(touched.password && errors.password)}
          fullWidth
          helperText={touched.password && errors.password}
          label="Password"
          margin="normal"
          name="password"
          onBlur={handleBlur}
          onChange={handleChange}
          type="password"
          value={values.password}
          variant="outlined"
        />
        <Box my={2}>
          <Button
            color="primary"
            disabled={isSubmitting}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Sign in now
          </Button>
        </Box>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          Don&apos;t have an account?
          {' '}
          <Link
            component={RouterLink}
            to="/register"
            variant="h6"
          >
            Sign up
          </Link>
        </Typography>
      </form>
      );
}
