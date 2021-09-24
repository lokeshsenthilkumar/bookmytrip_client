import React, {useState,useEffect} from 'react'
import axios from 'axios';
import { useParams, useHistory} from "react-router-dom";
import jwt_decode from 'jwt-decode';

import 'date-fns';

import {Container,Paper,Box,Typography,Grid,TextField,IconButton,Button} from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {makeStyles} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme)=>({
    root:{
        "width": "100vw",
        "height": "100vh",
        "max-width": "100%",
        backgroundColor:theme.palette.grey[300],
        paddingTop:theme.spacing(5),
    },
    inputGroup:{
        "marginBottom":theme.spacing(1)
    }
}));



export default function BookTrain() {

    const history = useHistory();

    var params = useParams();

    const url = 'https://bookmytrippp.herokuapp.com/getTrain/'+params.trainno;  
    const [res,setRes] = useState(null);
    const [totalPrice,setTotalPrice] = useState(0);
    const [trainName,setTrainName] = useState("");

    useEffect( () => {
        console.log(url);
        axios.get(url,{withCredentials: true})
        .then((response) =>{
            console.log(response);
            setRes(response.data[0]);
            setTotalPrice(response.data[0].price);
            setTrainName(response.data[0].trainName);
        })
    },[]);
    
    console.log(res);
    const classes = useStyles();
    
    const userTemplate = {name:"",gender:"",age:""};
    const [users,setusers] = useState([userTemplate]);
    
    const addUsers = ()=>{
        setusers([...users,userTemplate]);
        setTotalPrice(parseInt(totalPrice)+parseInt(res.price));
    }

    const handleChange = (e,index) => {
        const updatedUsers = users.map((user,i)=> index==i ?
        Object.assign(user,{[e.target.name]:e.target.value}) 
        : user
        )
        setusers(updatedUsers);
    };


    const handleSubmit = (event)=>{

        const jwt = localStorage.getItem('jwt');

        let decoded = jwt_decode(jwt);

        const email = decoded.user.email;

        axios.post('https://bookmytrippp.herokuapp.com/addBooking',{email:email,trainName:trainName,dot:selectedDate,passengers:users,totalPrice:totalPrice})
        .then(function(response){
            console.log("Responded");
        })
        .catch(function(err){
            console.log("No response");
        });

        // alert("Booking Sucessfull")
        // history.push("/user");

    }

    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    const handleDelete = (index) => {
        const filteredUsers = [...users];
        filteredUsers.splice(index, 1);
        setusers(filteredUsers);
        setTotalPrice(parseInt(totalPrice)-parseInt(res.price));
    }

    return (
       <Container className={classes.root}>
           <Paper component={Box} p={4}>
                {res && <div style={{fontFamily:"QuickSand"}}>
                    <h4>Train No: {res.trainNo}</h4>
                    <h4>Train Name: {res.trainName}</h4>
                    <h4>Price per ticket: {res.price}₹</h4>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Date of travel"
                                format="MM/dd/yyyy"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                style={{marginBottom:"10px"}}
                            />
                            </MuiPickersUtilsProvider>
                    </div>
                }

                <br />
                <h4>Passengers:</h4>
                {
                    users.map((user,index) =>(
                        <Grid container spacing={4} className={classes.inputGroup} key={index}>
                            <Grid item md={3} >
                                <TextField
                                label="Name"
                                placeholder="Enter Name"
                                variant="filled"
                                fullWidth
                                onChange={e => handleChange(e,index)}
                                name="name"
                                value={user.name}
                                />
                            </Grid>

                            <FormControl variant="filled" className={classes.formControl} style={{margin:"15px",width:"150px"}}>
                                <InputLabel htmlFor="filled-age-native-simple">Gender</InputLabel>
                                <Select
                                native
                                value={user.gender}
                                onChange={e => handleChange(e,index)}
                                inputProps={{
                                    name: 'gender',
                                    id: 'filled-age-native-simple',
                                }}
                                >
                                <option aria-label="None" value="" />
                                <option value={"Male"}>Male</option>
                                <option value={"Female"}>Female</option>
                                <option value={"Others"}>Others</option>
                                </Select>
                            </FormControl>
                            
                            <Grid item md={3} >
                                <TextField
                                label="Age"
                                placeholder="Enter Age"
                                variant="filled"
                                fullWidth
                                onChange={e => handleChange(e,index)}
                                name="age"
                                type="number"
                                value={user.age}
                                />
                            </Grid>
                            
                            <IconButton style={{height:"45px",marginTop:"20px"}}>
                                <DeleteIcon color="secondary" onClick={()=> handleDelete(index)}/>
                            </IconButton>
                        </Grid>
                    ))
                }
                <Button variant="contained" color="primary" onClick={addUsers}>Add</Button> <br /> <br />
                {res && <Typography variant="h5">Total Price : {totalPrice}₹</Typography>}
                <Button color="primary" variant="contained" onClick={handleSubmit} style={{margin: '0 auto', display: "flex"}}>Submit</Button>
           </Paper>
       </Container>
        
    )
}