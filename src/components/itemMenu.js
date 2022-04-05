import React ,{useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fontIcons from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from 'uuid';

export  function ItemMenu(props) {
    
    return (<>
             {<a key={uuidv4()} className="collapse-item" href={props.menus.rutamenu}><FontAwesomeIcon icon={fontIcons.faCheck} className="mr-2 ml-2" />{props.menus.descripcion}</a>}
            </> 
           );  
}

export default ItemMenu;