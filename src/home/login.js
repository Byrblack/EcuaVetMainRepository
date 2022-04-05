import React, { Component, ReactFragment, Fragment, useState, useEffect } from "react";
import {BrowserRouter, Route, Switch, Redirect, useHistory} from 'react-router-dom'
import { useFetch } from '../hooks/useFetch';

const KEY = 'userdata';

export function Login(){
    const history = useHistory();
    //const fetch = useFetch({url:'http://localhost:8080/api/v1/menu'});
  

   const [userLogin, setUserLOgin] = useState({
       email:'',
       password:''
   })

  const handleLogin = () =>{
    let data =  localStorage.getItem(KEY);
    let userData = null;
    

    if(data){
        userData = JSON.parse(data);
    }
    
    if(userData && userData.email == userLogin.email && userData.password == userLogin.password){
        //console.log(fetch({url:'http://localhost:8080/api/v1/menu'}));

        history.push("/principalLayout");    
       
    }else{
        alert('login error')

    }
   };

   const handleChange = (e) => {
    const { name, value } = e.target
    setUserLOgin({...userLogin, [name]: value })
  }

      return (
            <form className='login100-form login100-font-style '>
                <Fragment>
                    <span className='login100-form-title'>Sign In</span>

                    <div className="form-group">
                        <label>Email address</label>
                        <input name="email" value={userLogin.email} onChange={handleChange} type="email" className="form-control" placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input name="password" type="password"  value={userLogin.password} onChange={handleChange} className="form-control" placeholder="Enter password" />
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    
                    <div className="form-group">
                    <button  onClick={handleLogin} className="btn btn-primary btn-block login100-form-btn">LOGIN</button>
                        <p className="forgot-password text-right">
                            Forgot <a href="#">password?</a>
                        </p>
                    </div>

                    
                </Fragment>
            </form>
        );
    }
