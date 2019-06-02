import React, { Component } from 'react';
import axios from 'axios'
import { Table, Button } from 'reactstrap'

let getLink = "http://localhost:3408/api/Products"

class ProductManagement extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ListProducts: []
        }

        this.loadListFromAPI = this.loadListFromAPI.bind(this)
    }

    async loadListFromAPI() {
        try {
            let response = await axios.get(getLink)
            this.setState({
                ListProducts: response.data.Data
            })
        } catch (error) {
            console.error(error);
        }
    }

    render() { 
        let {
            ListProducts
        } = this.state

        return (  
            <div className="ProductManagement">
                <Button color="success" 
                    className="mt-3 mb-2"
                    onClick={this.props.onLoadData}>{this.props.titleButtonLoad}</Button>

                <Table className="table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Total users liked</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ListProducts.map((item, idx) => {
                                return (
                                    <tr key={idx}>
                                        <th scope="row">{item.ProductId}</th>
                                        <td>
                                            <img src={item.Image} alt="" className="item-product-img"/>
                                        </td>
                                        <td>{item.Name}</td>
                                        <td>{item.Category.Name}</td>
                                        <td>{item.Description}</td>
                                        <td>{item.TotalUserLiked}</td>
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
 
export default ProductManagement;