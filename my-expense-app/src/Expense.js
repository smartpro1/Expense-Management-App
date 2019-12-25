import React, {Component, createContext} from 'react';
import NavBar from './Navbar';

class Expense extends Component{

    render(){
        return (
            <div>
                <NavBar/>
                <p>Happy New year spending...</p>
            </div>
        );
    }
}

export default Expense;