import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap'
import * as fn from '../Actions'

function UserNew({state, dispatch}) {

    let closeHandler = fn.toggleDisplayUserNew.bind(this, dispatch, false)
    let nameHandler = (evt) => {
        fn.changeNewUserData(dispatch, {
            ...state.NewUser,
            Name: evt.target.value
        })
    }
    let emailHandler = (evt) => {
        fn.changeNewUserData(dispatch, {
            ...state.NewUser,
            Email: evt.target.value
        })
    }
    let saveHandler = fn.addNewUserAsync.bind(this, dispatch, state.NewUser)

    return (
        <div>
            {
                state.NewUser != null ?
                (
                    <Modal isOpen={state.IsOpenNewUser} 
                        toggle={closeHandler}>
                        <ModalHeader toggle={closeHandler}>New User</ModalHeader>
                        <ModalBody>
                            <div className="form-group">
                                <label>Name:</label>
                                <input type="text" className="form-control" 
                                    value={state.NewUser.Name}
                                    onChange={nameHandler}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" className="form-control" 
                                    value={state.NewUser.Email}
                                    onChange={emailHandler}
                                />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={saveHandler}>Save</Button>
                            <Button color="secondary" onClick={closeHandler}>Close</Button>
                        </ModalFooter>
                    </Modal>
                ) : null
            }
        </div>
    )
}

export default UserNew