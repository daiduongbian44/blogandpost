import React, { Component } from 'react';
import axios from 'axios'
import { Table, Button } from 'reactstrap'

let getLink = "http://localhost:3408/api/Users"

class UserManagement extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ListUsers: []
        }

        this.loadListFromAPI = this.loadListFromAPI.bind(this)
    }

    async loadListFromAPI() {
        try {
            let response = await axios.get(getLink)
            this.setState({
                ListUsers: response.data.Data
            })
        } catch (error) {
            console.error(error);
        }
    }

    render() { 
        return (  
            <div>
                <Button color="success" 
                    className="mt-3 mb-2"
                    onClick={this.props.onLoadData}>{this.props.titleButtonLoad}</Button>
                    
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Total liked product</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.ListUsers.map((item, idx) => {
                                return (
                                    <tr key={idx}>
                                        <th scope="row">{item.UserId}</th>
                                        <td>{item.Name}</td>
                                        <td>{item.Email}</td>
                                        <td>{item.ListLikedProducts.length}</td>
                                        <td>
                                            <Button color="primary" 
                                                className="mr-2 mb-2"
                                                >Detail</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}
 
export default UserManagement;