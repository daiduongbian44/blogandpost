import './App.scss'
import React, { useReducer, useEffect } from 'react'
import Reducer from './Reducer'
import InitStore from './InitStore'

import ProductManagement from './components/ProductManagement'
import UserManagement from './components/UserManagement'
import CategoryManagement from './components/CategoryManagement'
import UserDetail from './components/UserDetail'
import UserNew from './components/UserNew'

import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames';
import * as constants from './Constants';
import * as fn from './Actions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { BrowserRouter as Router, Route, Link } from "react-router-dom"

toast.configure({
    autoClose: 8000,
    draggable: false
})

function HomePage({state, dispatch}) {

    return (
        <div className="container">
            <h1>Data management</h1>
            <Nav tabs className="mt-2">
                <NavItem>
                    <NavLink
                        className={classnames({ active: state.ActiveTab === constants.TAB_PRODUCT })}
                        onClick={fn.handleChangeTab.bind(this, dispatch, constants.TAB_PRODUCT)}
                        >Product management</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: state.ActiveTab === constants.TAB_USER })}
                        onClick={fn.handleChangeTab.bind(this, dispatch, constants.TAB_USER)}
                        >User management</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: state.ActiveTab === constants.TAB_CATEGORY })}
                        onClick={fn.handleChangeTab.bind(this, dispatch, constants.TAB_CATEGORY)}
                        >Category management</NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={state.ActiveTab}>
                <TabPane tabId={constants.TAB_USER}>
                    <UserManagement 
                        state={state} dispatch={dispatch} />
                </TabPane>
                <TabPane tabId={constants.TAB_PRODUCT}>
                    <ProductManagement state={state} dispatch={dispatch} />
                </TabPane>
                <TabPane tabId={constants.TAB_CATEGORY}>
                    <CategoryManagement state={state} dispatch={dispatch} />
                </TabPane>
            </TabContent>
            <UserDetail state={state} dispatch={dispatch} />
            <UserNew state={state} dispatch={dispatch} />
        </div>
    )
}

function UserDetailPage({state, dispatch}, {match, history}) {
    
    useEffect(() => {
        if(!state.UserDetail) {
            let userItem = state.ListUsers.filter((user) => user.UserId == match.params.id)[0];
            fn.toggleDiplayUserDetail(dispatch, userItem)
        }
    }, [])

    return (
        <UserDetail state={state} dispatch={dispatch} isShowBackToHome={true} history={history}/>
    )
}

function AppRouter({state, dispatch}) {
    useEffect(() => {
        fn.getListUsersAsync(dispatch)
        fn.getListProductsAsync(dispatch)
        fn.getListCategoriesAsync(dispatch)
    }, [])

    return (
        <Router>
            <Route exact path="/" component={HomePage.bind(this, {state, dispatch})} />
            <Route path="/user-detail/:id" component={UserDetailPage.bind(this, {state, dispatch})} />
        </Router>
    )
}

function App() {

    const [state, dispatch] = useReducer(Reducer, InitStore)

    return (
        <div className="container">
            <AppRouter state={state} dispatch={dispatch} />
            <ToastContainer />
        </div>
    )
}

export default App;