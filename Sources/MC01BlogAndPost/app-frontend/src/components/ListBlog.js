import React, { Component } from 'react'
const axios = require('axios')

export class ListBlog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            listBlogs: []
        }
    }

    componentDidMount() {
        let that = this

        axios.get('/Home/ListBlogs')
            .then(function (response) {
                that.setState({
                    listBlogs: response.data.ListBlogs
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {

        let {
            listBlogs
        } = this.state

        let divItems = null
        if (listBlogs) {
            divItems = listBlogs.map((blog) => {
                return (
                    <li>{blog.Title}</li>    
                )
            })
        }

        return (
            <div>
                <h3>ListBlog Component</h3>
                <ul>{divItems}</ul>
            </div>
        )
    }

}