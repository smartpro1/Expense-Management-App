import React, { Component } from 'react';
import {Nav, Navbar, NavItem, NavbarBrand, NavLink} from 'reactstrap';

class NavBar extends Component{

    render(){
        return (
            <div>
               <Navbar color="dark" dark expand="md">
                   <NavbarBrand href="/">Expense Management App</NavbarBrand>
                     <Nav className="ml-5" navbar>
                       <NavItem>
                           <NavLink href="/">Home</NavLink>
                       </NavItem>
                         <NavItem>
                             <NavLink href="/categories">Categories</NavLink>
                         </NavItem>
                         <NavItem href="/expenses">
                             <NavLink href="/expenses">Expenses</NavLink>
                         </NavItem>
                     </Nav>
               </Navbar>
            </div>
        );
    }
}

export default NavBar;
