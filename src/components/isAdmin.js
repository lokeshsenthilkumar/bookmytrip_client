import jwt_decode from 'jwt-decode';

const isAdmin = ()=>{

    const jwt = localStorage.getItem('jwt');

    let decoded = jwt_decode(jwt);

    let isAdmin = decoded.user.admin;

    console.log(isAdmin);

    return isAdmin;
}

export default isAdmin;




