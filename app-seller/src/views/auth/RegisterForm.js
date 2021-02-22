import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
    Box,
    Button,
    Checkbox,
    FormHelperText,
    Link,
    TextField,
    Typography,
  } from '@material-ui/core';


export const RegisterForm = (props) =>{
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
            if (props.errors_api[key] != "") {
              switch (key) {
                case "email":
                  props.setErrors({email: props.errors_api[key]});
                  break;
                case "phone":
                  props.setErrors({phone: props.errors_api[key]});
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
            Create new account
          </Typography>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="body2"
          >
            Use your email to create new account
          </Typography>
        </Box>

        <TextField
          error={Boolean(touched.name && errors.name)}
          fullWidth
          helperText={touched.name && errors.name}
          label="Company's name"
          margin="normal"
          name="name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.name}
          variant="outlined"
        />
        <TextField
          error={Boolean(touched.email && errors.email)}
          fullWidth
          helperText={touched.email && errors.email}
          label="Email Address"
          margin="normal"
          name="email"
          onBlur={handleBlur}
          onChange={handleChange}
          type="email"
          value={values.email}
          variant="outlined"
        />
        <TextField
          error={Boolean(touched.phone && errors.phone)}
          fullWidth
          helperText={touched.phone && errors.phone}
          label="Phone number"
          margin="normal"
          name="phone"
          onBlur={handleBlur}
          onChange={handleChange}
          type="tel"
          pattern="^[0-9]*"
          value={values.phone}
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
        <Box
          alignItems="center"
          display="flex"
          ml={-1}
        >
          <Checkbox
            checked={values.policy}
            name="policy"
            onChange={handleChange}
          />
          <Typography
            color="textSecondary"
            variant="body1"
          >
            I have read the
            {' '}
            <Link
              color="primary"
              component={RouterLink}
              to="#"
              underline="always"
              variant="h6"
            >
              Terms and Conditions
            </Link>
          </Typography>
        </Box>
        {Boolean(touched.policy && errors.policy) && (
          <FormHelperText error>
            {errors.policy}
          </FormHelperText>
        )}
        <Box my={2}>
          <Button
            color="primary"
            disabled={isSubmitting}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Sign up now
          </Button>
        </Box>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          Have an account?
          {' '}
          <Link
            component={RouterLink}
            to="/login"
            variant="h6"
          >
            Sign in
          </Link>
        </Typography>
      </form>
      );
}


    