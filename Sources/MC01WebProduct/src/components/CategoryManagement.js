import React, { useEffect } from 'react'
import { Table, Button } from 'reactstrap'
import * as fn from '../Actions'

function CategoryManagement({state, dispatch}) {

    return (
        <div>
            <Button color="success" className="mt-3 mb-2">Add new category</Button>
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
                        state.ListCategories.map((item, idx) => {
                            return (
                                <tr key={idx}>
                                    <th scope="row">{item.CategoryId}</th>
                                    <td>{item.Name}</td>
                                    <td>{item.TotalProduct}</td>
                                    <td>
                                        <Button color="secondary" className="mr-2 mb-2">Edit</Button>
                                        <Button color="danger" className="mr-2 mb-2">Delete</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default CategoryManagement