import React, {Component} from 'react';
import NavBar from './Navbar';

class Category extends Component{
    state = {
        isLoading: true,
        categories: []
    };

    async componentDidMount(){
       const response = await fetch('/api/categories', {
           headers : {
               'Content-Type': 'application/json',
               'Accept': 'application/json'
           }
       });
       const body = await response.json();
       console.log("body",body);

       this.setState({categories: body, isLoading: false});
    }

    render(){
        const {categories, isLoading} = this.state;
        console.log("categories", categories);
        if(isLoading) return <div>Fetching data...</div>;
        return (
            <div>
                <NavBar/>
                <h4 className={"mt-4"}> Category names:</h4>
                <ol>
                    {categories.data.map(category=>(

                            <li key={category.id}>{category.name}</li>

                    ))}
                </ol>
            </div>
        );
    }
}

export default Category;