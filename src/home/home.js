import React, {ReactFragment, Fragment, useEffect, useState}from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Login } from './login';
import imgUrl from '../assets/images/login.jpg';
import './login.css';
import { useFetch } from '../hooks/useFetch';

const KEY = 'userdata'
function Home() {
  //console.log(useFetch({url:'http://localhost:8080/api/v1/menu'}));
  const imageStyle = { backgroundImage: `url(${imgUrl})`,
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                      };
   const [userLogin, setUserLOgin] = useState({
                        email:'bvernaza@gmail.com',
                        password:'123*/-456'
                    })
  
    useEffect(() => {
      //let data = 
      const userData = localStorage.getItem(KEY);
      if(userData==undefined){
        localStorage.setItem(KEY,JSON.stringify(userLogin))
      } 
      
    }, [])

  return (
  <Router>
      <Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-9 login-section-wrapper" style = {imageStyle}>

            </div>
            <div className="col-sm-3 login-section-wrapper">
                <Login/>
            </div>

          </div>
        </div>
        </Fragment>
    </Router>
  );
}

export default Home;
