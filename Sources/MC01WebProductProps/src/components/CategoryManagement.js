import React, { Component } from 'react'
import axios from 'axios'
import { Table, Button } from 'reactstrap'

let getLink = "http://localhost:3408/api/Categories"

class CategoryManagement extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ListCategories: []
        }

        this.loadListFromAPI = this.loadListFromAPI.bind(this)
    }

    async loadListFromAPI() {
        try {
            let response = await axios.get(getLink)
            this.setState({
                ListCategories: response.data.Data
            })
        } catch (error) {
            console.error(error);
        }
    }

    render() { 
        let {
            ListCategories
        } = this.state
            
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
                            <th>Total products</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ListCategories.map((item, idx) => {
                                return (
                                    <tr key={idx}>
                                        <th scope="row">{item.CategoryId}</th>
                                        <td>{item.Name}</td>
                                        <td>{item.TotalProduct}</td>
                                        <td>
                                            
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
 
export default CategoryManagement;