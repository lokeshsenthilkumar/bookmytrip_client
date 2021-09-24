import axios from "axios";
import {useHistory} from 'react-router-dom';

export default function Logout() {
    const history = useHistory();
    axios.get('https://bookmytrippp.herokuapp.com/logout',{withCredentials: true})
    .then(()=>{
            console.log("Logged out");
            localStorage.removeItem('jwt');
            history.push("/login");
        }
    )
    
    return(
        <h1>logout</h1>
    );
}
