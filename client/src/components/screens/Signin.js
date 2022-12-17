import {React , useState,useContext} from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import {UserContext} from "../../App"
import M from "materialize-css";

function Signin() {
const {state,dispatch} = useContext(UserContext)
  const navigate = useNavigate();

  const [password,setPassword]=useState("");
  const [email,setEmail]=useState("");

const PostData =()=>{
  console.log( email + "&"+ password)
  if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
    M.toast({html: "invalid email" ,classes:"#d50000 red accent-4" });
  return;
  }
  fetch("/signin",{
    method:"post",
    headers:{
      "content-type":"application/json"
    },
    body:JSON.stringify({
      email,
      password
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    if(data.error){
      M.toast({html: data.error ,classes:"#d50000 red accent-4" });
      return;
    }else{
      localStorage.setItem("jwt",data.token);
      localStorage.setItem("user",JSON.stringify(data.user));
    dispatch({type :"USER",payload:data.user});
    M.toast({html: "signed in sucessfully" ,classes: "#43a047 green darken-1" })
    navigate("/");
    return;
    }
  }).catch((err)=>console.log(err));
}

  return (
  
      <div className='mycard'>
        <div className="card auth-card">
          <h2>Instaclone</h2>
          <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
          <button className="btn waves-effect waves-light"
          onClick={()=>PostData()}>
           SignIn
           </button>
           <h6>
            <Link to="/signup">Don't have an account ?</Link>
           </h6>
        </div>
      </div>
  )
}

export default Signin