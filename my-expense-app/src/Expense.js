import React, {Component, createContext} from 'react';
import NavBar from './Navbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {Table, Container, Button, Form, FormGroup, Input, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';

class Expense extends Component{

    emptyItem = {
        id: 14,
        expensedate: new Date(),
        description: '',
        location: '',
        category: {
            id: 1,
            name: 'Rent'
        }
    }

    constructor(props){
        super(props);
        this.state={
            isLoading: false,
            expenses: [],
            categories: [],
            date: new Date(),
            item: this.emptyItem
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount(){
        const response = await fetch('/api/categories');
        const body = await response.json();
        this.setState({categories: body.data,  isLoading: false});

        const responseExp = await fetch('/api/expenses');
        const bodyExp = await responseExp.json();
        this.setState({expenses: bodyExp.data, isLoading: false});
    }

    handleChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        let {item} = {...this.state};
        item[name] = value;
        this.setState({item});
    }

    handleDateChange = date =>{
        let {item} = {...this.state};
        item.expensedate = date;
        this.setState({item});
    }

    handleDelete = async (id) =>{
        await fetch(`/api/expenses/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }

        }).then(() =>{
            const expenses = [...this.state.expenses].filter(expense => expense.id !== id);
            this.setState({expenses});
        })

    }

    //     handleSubmit = async (event) =>{
    //
    //     const item = this.state.item;
    //     await fetch(`/api/expenses`, {
    //         method: 'POST',
    //         headers: {
    //             'Accept' : 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(item),
    //     });
    //
    //         event.preventDefault();
    //     this.props.history.push("/expenses");
    // };

    async handleSubmit(event){


        const item = this.state.item;
        await fetch(`/api/expenses`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });

        event.preventDefault();
        this.props.history.push("/expenses");
    }


    render(){
        // const{categories} = this.state;
        const { expenses, categories, isLoading} = this.state;

        if(isLoading)
            return <div>Loading...</div>

        let options = categories.map(category => (
            <option key={category.id}>
                {category.name}
            </option>
        ));

        let rows = expenses.map(expense =>(
            <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>{expense.location}</td>
                <td><Moment date={expense.expensedate} format="YYYY/MM/DD"/></td>
                <td>{expense.category.name}</td>
                <td>
                    <Button size="sm" color="danger"
                            onClick={() => this.handleDelete(expense.id)}
                    >
                        Delete
                    </Button>
                </td>
            </tr>
        ))

        return (
            <div>
                <NavBar/>
                <Container>
                    <h3>Add Expense</h3>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input type="text" name="description" id="description"
                                   onChange={this.handleChange} autoComplete="name"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="category">Category</Label>
                            <select onChange={this.handleChange}>
                                {options}
                            </select>
                        </FormGroup>

                        <FormGroup>
                            <Label for="city">Date</Label>
                            <DatePicker id="date"
                                        selected={this.state.item.expensedate}
                                        onChange={this.handleDateChange}
                            />
                        </FormGroup>

                        <div className="row">
                            <FormGroup className="col-md-4 mb-3">
                                <Label for="location">Location</Label>
                                <Input type="text" name="location" id="location"
                                       onChange={this.handleChange}
                                />
                            </FormGroup>
                        </div>

                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/">Cancel</Button>
                        </FormGroup>

                    </Form>
                </Container>
                {''}
                <Container>
                    <h3>Expense List</h3>
                    <Table>
                        <thead>
                        <tr>
                            <th width="20%">Description</th>
                            <th width="10%">Location</th>
                            <th width="10%">Date</th>
                            <th width="15%">Category</th>
                            <th width="10%">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default Expense;















