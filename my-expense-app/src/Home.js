import React, { Component } from 'react';
import NavBar from './Navbar';


class Home extends Component{

    render(){
        return (
            <div>
            <NavBar/>
            <div className="mt-4" style={{ alignItems: 'center', justifyContent: 'center'}}>
                <h2>This is the Expense Management App Home Page</h2>
                <p>This application has basic functionalities<br/>
                 You can click the expense route to see them.
                </p>
            </div>
            </div>
        );
    }
}

export default Home;