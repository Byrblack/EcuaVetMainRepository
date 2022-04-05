import React, { Component, ReactFragment, Fragment, useState } from "react";
import Header from './header'
import Menu from './menu'


const PrincipalLayout = () =>{
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                        <div className="col-sm-2 pd-0 mg-0">
                            <Menu/>
                        </div>
                        <div className="col-sm-10">
                            <Header title="EcuaVet"></Header>
                        </div>
                </div>
            </div>
        </Fragment>
        
    )
}

export default PrincipalLayout