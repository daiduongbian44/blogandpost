import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap'
import * as fn from '../Actions'
import './UserDetail.scss'
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom"

function shouldShowLikeButton(productItem, userItem) {
    let itemExisted = userItem.ListLikedProducts.filter((item) => {
        return item.ProductId === productItem.ProductId
    })
    return itemExisted.length <= 0
}

function UserDetail({state, dispatch, isShowBackToHome, history}) {

    let toggleHandler = () => {
        fn.toggleDiplayUserDetail.bind(this, dispatch, null)()
        if(isShowBackToHome) {
            history.push('/')
        }
    }

    let likeHandler = fn.likeProductAsync

    return (
        <div>
            {
                state.UserDetail != null?
                (
                    <Modal isOpen={state.IsOpenUserDetail} 
                        toggle={toggleHandler}
                        size="lg">
                        <ModalHeader toggle={toggleHandler}>User detail: {state.UserDetail.Name}</ModalHeader>
                        <ModalBody>
                            {
                                isShowBackToHome ?
                                <Button outline color="primary"
                                    onClick={toggleHandler}>Page home</Button>
                                : null
                            }
                            <p>Email: <a href="#">{state.UserDetail.Email}</a></p>
                            <p>Total liked products: {state.UserDetail.ListLikedProducts.length}</p>
                            <hr/>
                            <Table className="table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        state.ListProducts.map((item, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <th scope="row">{item.ProductId}</th>
                                                    <td>
                                                        <img src={item.Image} alt="" className="item-product-img"/>
                                                    </td>
                                                    <td>{item.Name}</td>
                                                    <td>{item.Category.Name}</td>
                                                    <td>
                                                        {
                                                            shouldShowLikeButton(item, state.UserDetail) ? 
                                                            <Button outline color="primary"
                                                                onClick={likeHandler.bind(this, dispatch, state.UserDetail.UserId, item.ProductId, true)}>Like</Button>
                                                            : 
                                                            <Button outline color="danger"
                                                                onClick={likeHandler.bind(this, dispatch, state.UserDetail.UserId, item.ProductId, false)}>Dislike</Button>
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={toggleHandler}>Close</Button>
                        </ModalFooter>
                    </Modal>
                ) : null
            }
        </div>
        
    )
}

export default UserDetail