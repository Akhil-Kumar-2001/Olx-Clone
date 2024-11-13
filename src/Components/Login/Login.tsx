
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/olxLogo.png';
import './Login.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import toast from 'react-hot-toast';

function Login() {
  const auth = getAuth()
  const [formData,setFormData]=useState({
    name:"",
    password:""
  });
  const navigate=useNavigate();
  const handleLogin = (e:React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault();
      signInWithEmailAndPassword(auth,formData.name,formData.password).then((userCredentials)=>{
        toast.success("Login success");
        navigate('/');
      }).catch((err)=>{
        console.log(err);
      })
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={formData.name}
            onChange={(e)=>setFormData({...formData,name:e.target.value})}
            // defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={formData.password}
            onChange={(e)=>setFormData({...formData,password:e.target.value})}
            // defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to='/signup'>Signup</Link>
      </div>
    </div>
  );
}

export default Login;
