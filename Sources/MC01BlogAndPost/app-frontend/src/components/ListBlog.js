import React, { Component } from 'react'
const axios = require('axios')

export class ListBlog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            listBlogs: []
        }

        this.handleClickIntoBlog = this.handleClickIntoBlog.bind(this)
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

    handleClickIntoBlog(blog) {
        let that = this
        if (blog.data) return

        // blog.BlogId
        axios.get(`/Home/ListPostsNew?blogId=${blog.BlogId}`)
            .then(function (response) {
                let {
                    listBlogs
                } = that.state
                blog.data = JSON.stringify(response.data.ListPosts)

                that.setState({
                    listBlogs
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
        let that = this

        if (listBlogs) {
            divItems = listBlogs.map((blog) => {
                return (
                    <li className="list-group-item" onClick={that.handleClickIntoBlog.bind(that, blog)}>
                        <h4>{blog.Title}</h4>
                        <p>{blog.Content}</p>
                        {blog.data ? <p>{blog.data}</p> : null }
                    </li>
                )
            })
        }

        return (
            <div>
                <h3>ListBlog Component</h3>
                <ul className="list-group col-md-6">{divItems}</ul>
            </div>
        )
    }

}