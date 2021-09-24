import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import React, { useState } from "react";
import {useHistory} from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
      BookMyTrip
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:`url(https://cdn.dribbble.com/users/15687/screenshots/7152202/media/db4c7999f7408ba02bde3137b423e181.png?compress=1&resize=1600x1200)` ,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signup() {

  const history = useHistory();

  const [credits, setCredits] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredits((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const [emailError,setEmailError] = useState("");
  const [passwordError,setPasswordError] = useState("");
  const [cpasswordError,setCPasswordError] = useState("");
  const [fullNameError,setFullNameError] = useState("");

  const handleClick = (event) => {
    event.preventDefault();

    if (event.target[4].value === event.target[6].value) {

        const pCredits = {
            fullName:event.target[0].value,
            email:event.target[2].value,
            confirmpassword:event.target[4].value,
            password:event.target[6].value,
            admin:false
        }

        axios.post('https://bookmytrippp.herokuapp.com/signup',pCredits,{withCredentials: true})
            .then(function(response){
                console.log("Responded");
                console.log(response);
                history.push('/user');
            })
            .catch(function(err){
                console.log("No response");
                const errors = err.response.data.errors;

                setFullNameError(errors.fullName);
                setEmailError(errors.email);
                setPasswordError(errors.password);
                setCPasswordError("");

            });
    } else {
      setPasswordError("");
      setCPasswordError("Passwords doesn't match");
    }
  };

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper} id="signupBox">
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleClick}>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Full Name"
            name="fullName"
            autoFocus
            onChange={handleChange}
            value={credits.fullName}
            />

            <Typography className="errortxt">{fullNameError}</Typography>
            
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={handleChange}
              value={credits.email}
            />

            <Typography className="errortxt">{emailError}</Typography>
            
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleChange}
              value={credits.password}
            />
            
            <Typography  className="errortxt">{passwordError}</Typography>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmpassword"
              label="Comfirm Password"
              type="password"
              id="confirmpassword"
              onChange={handleChange}
              value={credits.confirmpassword}
            />

            <Typography className="errortxt">{cpasswordError}</Typography>      

            <Button
              type="submit"
              fullWidth
              variant="contained"
              id="submitButton"
              color="primary"
              className={classes.submit}
            >
            Sign Up
            </Button>
            <Grid container>
              <Grid item>
                {"Already have an account? "}
                <Link href="/login" variant="body2" id="signinLink">
                  {"Signin"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
