import React, { Component } from "react"
import logo from './logo.svg';

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th> First Name </th>
                <th> Last Name</th>
            </tr>
        </thead>
    )
}

class AddUser extends Component {
    state = {
        FirstName: "",
        LastName: ""
    };

    handleSubmit = (event) => {
        alert('A name was submitted: ' + this.state.FirstName);
        event.preventDefault();
    }

    handleChange = (event) => {
        this.setState({ FirstName: event.target.FirstName })
    };


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    FirstName:
                    <input
                        type="text"
                        value={this.state.FirstName}
                        onChange={this.handleChange}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

const UserRows = props => {
    const rows = props.UserData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.firstname}</td>
                <td>{row.lastname}</td>
                <td><button onClick={() => props.removeUser(index)}>Delete</button></td>
            </tr>
        )
    });
    return <tbody>{rows}</tbody>
}



class UserTable extends Component {
    state = {
        UserData: []
    };
    componentDidMount() {
        console.log("user table component mounted")
        this.callBackendAPI()
            .then(res => this.setState({ UserData: res }))
            .catch(err => console.log(err));
    };
    callBackendAPI = async () => {
        const response = await fetch('/users');
        const body = await response.json();
        console.log("GOT body!")
        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

    removeUser = index => {
        const users = this.state.UserData;
        this.setState({
            UserData: users.filter((users, i) => {
                return i !== index
            })
        });
    };

    addUser() {

    }

    render() {
        console.log("Rendering users page")
        return (
            <div className="Users">
                <header className="Users-header">
                    <img src={logo} className="Users-logo" alt="logo" />
                    <h1 className="Users-title">Welcome to React</h1>
                </header>
                This is the users page!
                <table>
                    <TableHeader />
                    <UserRows UserData={this.state.UserData} removeUser={this.removeUser} />
                </table>
                <AddUser />

            </div>
        );
    }
}

export default UserTable;