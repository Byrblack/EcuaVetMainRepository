import React ,{useState, useEffect } from 'react';
import {useHistory, Link } from 'react-router-dom'
import './menu.css';
import '../assets/css/sb-admin-2.css'
import '../assets/js/sb-admin-2.js'
import { v4 as uuidv4 } from 'uuid';
import { useFetch } from '../hooks/useFetch';
import {ItemMenu} from '../components/itemMenu'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fontIcons from "@fortawesome/free-solid-svg-icons";
import { right } from '../../node_modules/@popperjs/core';

const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center',
  };
const dataMenuInitial = {
    id:null,
    idpadre:null,
    rutamenu:null,
    descripcion:null,
    dominio:null,
    estado:null,
    fechacreacion:null
}
  
function Menu(props) {
    const history = useHistory();
    const [dataMenu, setDataMenu] = useState([dataMenuInitial]);
    const [listItems, setlistItems] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [idMain, setIdMain] = useState(0);
    let iData = [];



    useEffect(() => {
      const fetchData = async () => {
        const res = await fetch('http://localhost:8080/api/v1/menu',);
        const json = await res.json();

        if(json && json.length > 0 && dataMenu && dataMenu.length == 1){
            iData =json.filter(x=>x.id>0); 
            let newArr = [...dataMenu];
            newArr=iData;
            setDataMenu(newArr);
            drawMenu(iData);
        }
        
      };
      fetchData();
    },[]);

    let drawMenu = (json) =>{
        
            const listItemss = json.map((item) =>{
                return item;
            });
            
            setlistItems(listItemss);
    }

  


    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <hr className="sidebar-divider my-0"/>
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3"><FontAwesomeIcon icon={fontIcons.faPaw} size="lg" className="mr-2 ml-1"  /><b>VETERINFTEC</b></div>
            </a>
           <hr className="sidebar-divider my-0"/> 
            <li className="nav-item">
               
                {
                    listItems.filter(x=>x.idpadre==0).map((item)=>{ 
                        
                       return(
                                <>
                                <hr className="sidebar-divider my-0"/>
                                     <a className="nav-link" href="#" data-toggle="collapse" data-target="#collapseTwo"
                                        aria-expanded="true" aria-controls="collapseTwo"  onClick={() =>{setIsActive(!isActive); setIdMain(idMain!=item.id? item.id:0);}}>
                                        <FontAwesomeIcon icon={fontIcons.faList} className="mr-2 ml-2" />
                                        <b>{item.descripcion}</b><b style={{float:right}}>{idMain==item.id ? <FontAwesomeIcon icon={fontIcons.faAngleDown} /> : <FontAwesomeIcon icon={fontIcons.faAngleRight} />}</b>
                                    </a> 
                                    <hr className="sidebar-divider my-0"/>
                                    { idMain==item.id && 
                                    <div key={uuidv4()} id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                                            <div className="bg-white py-2 collapse-inner rounded">
                                                {
                                                    listItems.filter(x=>x.idpadre==item.id).map((itemchild)=>{
                                                        return <ItemMenu key={uuidv4()} menus={itemchild}/>
                                                    })
                                                    
                                                }
                                        </div>
                                    </div>}
                                </>
                                
                              )
                    })
                }
            </li>
        </ul>
    );

  
}

export default Menu;