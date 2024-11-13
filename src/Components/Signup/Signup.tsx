import   { useState,useContext } from 'react';

import Logo from '../../assets/olx-logo.png';
import './Signup.css';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '../../Store/FirebaseContext';

export default function Signup() {

  

  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate()



  
  const hadleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    const auth = getAuth();
    createUserWithEmailAndPassword(auth,email,password)
    .then((result)=>{
      // const user = result.user;
      navigate('/');
    })
    console.log(username);
    console.log(email);
    console.log(password);
    console.log(phone);
    
    
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={hadleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            value={username}
            onChange={(e)=>{setUsername(e.target.value )}}
            type="text"
            id="fname"
            name="name"
            // defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            value={email}
            onChange={(e)=>{setEmail(e.target.value )}}
            type="email"
            id="fname"
            name="email"
            // defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            value={phone}
            onChange={(e)=>{setPhone(e.target.value )}}
            type="number"
            id="lname"
            name="phone"
            // defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            value={password}
            onChange={(e)=>{setPassword(e.target.value )}}
            type="password"
            id="lname"
            name="password"
            // defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
}
