
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
import jwt_decode from "jwt-decode";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
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
    backgroundImage:
      "url(https://cdn.dribbble.com/users/4835348/screenshots/14318809/media/2cb26d74c93f12a3451d6dbf79dc3d48.png?compress=1&resize=1600x1200)",
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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  
  const history = useHistory();

  const [credits, setCredits] = useState({
    email: "",
    password: "",
  });

  const [error,setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCredits((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleClick = (event) => {
    event.preventDefault();

    const pCredits = {
      email: event.target[0].value,
      password: event.target[2].value,
    };

    //console.log(pCredits);
    
    axios.post('https://bookmytrippp.herokuapp.com/login',pCredits,{withCredentials: true})
    .then(response =>{
        console.log(response);

        if(response.data.err){
          setError("Invalid Credentials");
        }

        localStorage.setItem('jwt', response.data.token);

        let decoded = jwt_decode(response.data.token);
        console.log(decoded.user);

        if(decoded.user.admin){
          history.push("/admin");
        }
        else
        {
          if(!response.data.err){
            history.push("/user");
          }
        }
    })
    .catch(err =>{
        console.log(err);
    });
  };

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper} id="loginBox">
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            style={{ fontFamily: "Quicksand" }}
            noValidate
            onSubmit={handleClick}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
              value={credits.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              value={credits.password}
            />

            <Typography class="errortxt">{error}</Typography>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              id="submitButton"
              className={classes.submit}
            >
            Sign In
            </Button>

            <Grid container>
              <Grid item>
                {"Don't have an account? "}
                <Link href="/signup" variant="body2" id="signupLink">
                  {"Sign Up"}
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