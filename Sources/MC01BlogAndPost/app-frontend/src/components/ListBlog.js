import React, { Component } from 'react'
import Select from 'react-select'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const axios = require('axios')

export class ListBlog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            listBlogs: [],
            listOptionBlogs: [],
            newBlog: {
                Title: '',
                Content: ''
            },
            newPost: {
                Title: '',
                Content: '',
                Blog: null
            },
            messageNewBlog: '',
            messageNewPost: '',
            isShowModalEditPost: false,
            currentEditPost: {
                oldPost: {}
            }
        }

        this.handleClickIntoBlog = this.handleClickIntoBlog.bind(this)
        this.handleChangeInputTitle = this.handleChangeInputTitle.bind(this)
        this.handleChangeInputContent = this.handleChangeInputContent.bind(this)
        this.handleClickSaveBlog = this.handleClickSaveBlog.bind(this)
        this.renderListPosts = this.renderListPosts.bind(this)

        this.handleChangeInputPostTitle = this.handleChangeInputPostTitle.bind(this)
        this.handleChangeInputPostContent = this.handleChangeInputPostContent.bind(this)
        this.handleChangeInputPostBlog = this.handleChangeInputPostBlog.bind(this)
        this.handleClickSavePost = this.handleClickSavePost.bind(this)
        this.toggleModalEditPost = this.toggleModalEditPost.bind(this)
        this.getListOptionBlogs = this.getListOptionBlogs.bind(this)

        this.handleChangeEditPostTitle = this.handleChangeEditPostTitle.bind(this)
        this.handleChangeEditPostContent = this.handleChangeEditPostContent.bind(this)
        this.handleChangeEditPostBlog = this.handleChangeEditPostBlog.bind(this)
        this.handleClickUpdatePost = this.handleClickUpdatePost.bind(this)
        this.deletePost = this.deletePost.bind(this)
        this.deleteBlog = this.deleteBlog.bind(this)
    }

    componentDidMount() {
        let that = this

        axios.get('/Home/ListBlogs')
            .then(function (response) {
                that.setState({
                    listBlogs: response.data.ListBlogs,
                    listOptionBlogs: that.getListOptionBlogs(response.data.ListBlogs)
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    handleClickIntoBlog(blog) {
        let that = this
        if (blog.listPosts) return

        // blog.BlogId
        axios.get(`/Home/ListPostsNew?blogId=${blog.BlogId}`)
            .then(function (response) {
                let {
                    listBlogs
                } = that.state
                blog.listPosts = response.data.ListPosts

                that.setState({
                    listBlogs
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    handleChangeInputPostTitle(event) {
        let {
            newPost
        } = this.state
        newPost.Title = event.target.value
        this.setState({
            newPost
        })
    }

    handleChangeEditPostTitle(event) {
        let {
            currentEditPost
        } = this.state
        currentEditPost.Title = event.target.value
        this.setState({
            currentEditPost
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

    handleChangeInputPostContent(event) {
        let {
            newPost
        } = this.state
        newPost.Content = event.target.value
        this.setState({
            newPost
        })
    }

    handleChangeEditPostContent(event) {
        let {
            currentEditPost
        } = this.state
        currentEditPost.Content = event.target.value
        this.setState({
            currentEditPost
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

    handleChangeInputPostBlog(selectedOption) {
        let {
            newPost
        } = this.state
        newPost.Blog = selectedOption
        this.setState({
            newPost
        })
    }

    handleChangeEditPostBlog(selectedOption) {
        let {
            currentEditPost
        } = this.state
        currentEditPost.Blog = selectedOption
        currentEditPost.BlogId = selectedOption.value
        this.setState({
            currentEditPost
        })
    }

    handleClickSaveBlog() {
        let {
            newBlog,
            listBlogs
        } = this.state
        if (newBlog.Title
            && newBlog.Title.trim() != ''
            && newBlog.Content
            && newBlog.Content.trim() != ''
        ) {
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
                            newBlog.listPosts = blog.listPosts
                        }
                    }
                }
                that.setState({
                    listBlogs: ListBlogs,
                    listOptionBlogs: that.getListOptionBlogs(ListBlogs),
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

    handleClickSavePost() {
        let {
            newPost,
            listBlogs
        } = this.state
        if (newPost.Title
            && newPost.Title.trim() != ''
            && newPost.Content
            && newPost.Content.trim() != ''
            && newPost.Blog != null
        ) {
            let that = this
            newPost.BlogId = newPost.Blog.value
            axios.post('/Home/AddNewPost', newPost)
                .then(function (response) {
                    let {
                        IsSuccessAddNewPost,
                        ListPosts
                    } = response.data
                    let messageNewPost = ''
                    if (IsSuccessAddNewPost) {
                        messageNewPost = 'Added successfully'
                    } else {
                        messageNewPost = 'Error'
                    }
                    let currentBlog = listBlogs.filter((blog) => {
                        return blog.BlogId == newPost.BlogId
                    })[0]
                    currentBlog.listPosts = ListPosts
                    that.setState({
                        messageNewPost,
                        newPost: {
                            Title: '',
                            Content: '',
                            Blog: null
                        },
                        listBlogs
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            alert("Input your info")
        }
    }

    toggleModalEditPost(post) {
        if (!post) {
            post = {
                Title: '',
                Content: '',
                BlogId: 0
            }
        }
        
        let {
            isShowModalEditPost,
            listOptionBlogs
        } = this.state
        isShowModalEditPost = !isShowModalEditPost
        let editPost = {
            oldPost: post,
            Title: post.Title,
            Content: post.Content,
            BlogId: post.BlogId
        }
        
        editPost.Blog = listOptionBlogs.filter((item) => item.value == post.BlogId)[0]
        this.setState({
            isShowModalEditPost,
            currentEditPost: editPost
        })
    }

    renderListPosts(listPosts) {
        let divItems = null
        let that = this
        if (listPosts) {
            divItems = listPosts.map((post) => {
                return (
                    <li>
                        <h6>{post.Content}</h6>
                        <Button color="warning" onClick={that.toggleModalEditPost.bind(that, post)}>Edit {post.Title}</Button>
                        <Button color="danger" onClick={that.deletePost.bind(that, post)} className="ml-2">Delete {post.Title}</Button>
                    </li>
                )
            })
        }
        return (
            <ul>{divItems}</ul>    
        )
    }

    getListOptionBlogs(listBlogs) {
        let options = []
        if (listBlogs) {
            options = listBlogs.map((blog) => {
                return {
                    value: blog.BlogId,
                    label: blog.Title
                }
            })
        }
        return options
    }

    handleClickUpdatePost() {
        let {
            currentEditPost,
            listBlogs,
            isShowModalEditPost
        } = this.state
        if (currentEditPost.Title
            && currentEditPost.Title.trim() != ''
            && currentEditPost.Content
            && currentEditPost.Content.trim() != ''
            && currentEditPost.Blog != null
        ) {
            let that = this
            axios.post('/Home/UpdatePost?postId=' + currentEditPost.oldPost.PostId, currentEditPost)
                .then(function (response) {
                    let {
                        ListPosts
                    } = response.data
                    
                    let currentBlog = listBlogs.filter((blog) => {
                        return blog.BlogId == currentEditPost.BlogId
                    })[0]

                    currentBlog.listPosts = ListPosts

                    if (currentEditPost.BlogId !== currentEditPost.oldPost.BlogId) {
                        let oldBlog = listBlogs.filter((blog) => {
                            return blog.BlogId == currentEditPost.oldPost.BlogId
                        })[0]
                        //oldBlog.listPosts.splice(oldBlog.listPosts.indexOf(currentEditPost.oldPost), 1)
                        oldBlog.listPosts = null
                        that.handleClickIntoBlog(oldBlog)
                    }

                    that.setState({
                        listBlogs,
                        isShowModalEditPost: !isShowModalEditPost
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            alert("Input your info")
        }
    }

    deletePost(post) {
        let {
            listBlogs
        } = this.state

        if (window.confirm('Are you sure?')) {
            let that = this
            axios.post('/Home/DeletePost?postId=' + post.PostId, {})
                .then(function (response) {
                    
                    let currentBlog = listBlogs.filter((blog) => {
                        return blog.BlogId == post.BlogId
                    })[0]

                    currentBlog.listPosts = null
                    that.handleClickIntoBlog(currentBlog)
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }

    deleteBlog(blog) {
        let {
            listBlogs
        } = this.state

        if (window.confirm('Are you sure?')) {
            let that = this
            axios.post('/Home/DeleteBlog?blogId=' + blog.BlogId, {})
                .then(function (response) {
                    listBlogs = listBlogs.filter((item) => {
                        return item.BlogId !== blog.BlogId
                    })

                    that.setState({
                        listBlogs,
                        listOptionBlogs: that.getListOptionBlogs(listBlogs)
                    })
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }

    render() {

        let {
            listBlogs,
            newBlog,
            newPost,
            messageNewBlog,
            messageNewPost,
            isShowModalEditPost,
            currentEditPost,
            listOptionBlogs
        } = this.state

        let divItems = null
        let that = this

        if (listBlogs) {
            divItems = listBlogs.map((blog) => {
                return (
                    <li className="list-group-item">
                        <div onClick={that.handleClickIntoBlog.bind(that, blog)}>
                            <h4>{blog.Title}</h4>
                            <p>{blog.Content}</p>
                            {blog.listPosts ? that.renderListPosts(blog.listPosts) : null}
                        </div>
                        <Button color="primary" onClick={that.deleteBlog.bind(that, blog)}>Delete</Button>
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
                <hr />
                <h3>Add new post</h3>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Title:</label>
                        <input type="text" className="form-control"
                            value={newPost.Title}
                            onChange={this.handleChangeInputPostTitle}
                        />
                    </div>
                    <div className="form-group">
                        <label>Content:</label>
                        <input type="text" className="form-control"
                            value={newPost.Content}
                            onChange={this.handleChangeInputPostContent}
                        />
                    </div>

                    <div className="form-group">
                        <label>Blog:</label>
                        <Select
                            value={newPost.Blog}
                            onChange={this.handleChangeInputPostBlog}
                            options={listOptionBlogs}
                        />
                    </div>

                    {messageNewPost ? <p>{messageNewPost}</p> : null}
                    <button type="button" className="btn btn-success"
                        onClick={this.handleClickSavePost}>Add new post</button>
                </div>
                <hr />
                <h3>ListBlog Component</h3>
                <ul className="list-group col-md-6">{divItems}</ul>

                {
                    // Code javascript comment, show modal
                }
                <Modal isOpen={isShowModalEditPost} toggle={that.toggleModalEditPost}>
                    <ModalHeader>Edit {currentEditPost.oldPost.Title}</ModalHeader>
                    <ModalBody>

                        <div className="form-group">
                            <label>Title:</label>
                            <input type="text" className="form-control"
                                value={currentEditPost.Title}
                                onChange={this.handleChangeEditPostTitle}
                            />
                        </div>
                        <div className="form-group">
                            <label>Content:</label>
                            <input type="text" className="form-control"
                                value={currentEditPost.Content}
                                onChange={this.handleChangeEditPostContent}
                            />
                        </div>

                        <div className="form-group">
                            <label>Blog:</label>
                            <Select
                                value={currentEditPost.Blog}
                                onChange={this.handleChangeEditPostBlog}
                                options={listOptionBlogs}
                            />
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={that.handleClickUpdatePost}>Update</Button>
                        <Button color="secondary" onClick={that.toggleModalEditPost}>Cancel</Button>
                    </ModalFooter>
                </Modal>

            </div>
        )
    }

}