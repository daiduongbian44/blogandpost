import React, { Component } from 'react'
const axios = require('axios')

export class ListBlog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            listBlogs: [],
            newBlog: {
                Title: '',
                Content: ''
            },
            messageNewBlog: ''
        }

        this.handleClickIntoBlog = this.handleClickIntoBlog.bind(this)
        this.handleChangeInputTitle = this.handleChangeInputTitle.bind(this)
        this.handleChangeInputContent = this.handleChangeInputContent.bind(this)
        this.handleClickSaveBlog = this.handleClickSaveBlog.bind(this)
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

    handleChangeInputTitle(event) {
        let {
            newBlog
        } = this.state
        newBlog.Title = event.target.value
        this.setState({
            newBlog
        })
    }

    handleChangeInputContent(event) {
        let {
            newBlog
        } = this.state
        newBlog.Content = event.target.value
        this.setState({
            newBlog
        })
    }

    handleClickSaveBlog() {
        let {
            newBlog,
            listBlogs
        } = this.state
        if (newBlog.Title && newBlog.Content) {
            let that = this

            axios.post('/Home/AddNewBlog', newBlog)
            .then(function (response) {
                let {
                    IsSuccessAddNewBlog,
                    ListBlogs
                } = response.data
                let messageNewBlog = ''
                if (IsSuccessAddNewBlog) {
                    messageNewBlog = 'Added successfully'
                } else {
                    messageNewBlog = 'Error'
                }
                for (var newBlog of ListBlogs) {
                    for (var blog of listBlogs) {
                        if (newBlog.BlogId === blog.BlogId) {
                            newBlog.data = blog.data
                        }
                    }
                }
                that.setState({
                    listBlogs: ListBlogs,
                    messageNewBlog,
                    newBlog: {
                        Title: '',
                        Content: ''
                    }
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        } else {
            alert("Input your info")
        }
    }

    render() {

        let {
            listBlogs,
            newBlog,
            messageNewBlog
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
                <h3>Add new blog</h3>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Title:</label>
                        <input type="text" className="form-control"
                            value={newBlog.Title}
                            onChange={this.handleChangeInputTitle}
                        />
                    </div>
                    <div className="form-group">
                        <label>Content:</label>
                        <input type="text" className="form-control"
                            value={newBlog.Content}
                            onChange={this.handleChangeInputContent}
                        />
                    </div>
                    {messageNewBlog ? <p>{messageNewBlog}</p> : null}
                    <button type="button" className="btn btn-success"
                        onClick={this.handleClickSaveBlog}>Add new blog</button>
                </div>
                <hr/>
                <h3>ListBlog Component</h3>
                <ul className="list-group col-md-6">{divItems}</ul>
            </div>
        )
    }

}