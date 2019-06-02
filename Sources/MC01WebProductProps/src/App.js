import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CategoryManagement from './components/CategoryManagement'
import ProductManagement from './components/ProductManagement'
import UserManagement from './components/UserManagement'

import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            activeTab: '1'
        }

        this.productManagement = React.createRef();
        this.userManagement = React.createRef();
        this.categoryManagement = React.createRef();

        this.toggle = this.toggle.bind(this)
        this.onLoadDataProduct = this.onLoadDataProduct.bind(this)
        this.onLoadDataCategory = this.onLoadDataCategory.bind(this)
        this.onLoadDataUser = this.onLoadDataUser.bind(this)
    }

    async onLoadDataProduct() {
        await this.productManagement.current.loadListFromAPI();
    }

    async onLoadDataCategory() {
        await this.categoryManagement.current.loadListFromAPI();
    }

    async onLoadDataUser() {
        await this.userManagement.current.loadListFromAPI();
    }


    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <div className="container">

                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}>
                            Products
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}>
                            Users
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '3' })}
                            onClick={() => { this.toggle('3'); }}>
                            Categories
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <ProductManagement 
                            ref={this.productManagement}
                            titleButtonLoad={"Data user"}
                            onLoadData={this.onLoadDataUser}></ProductManagement>
                    </TabPane>
                    <TabPane tabId="2">
                        <UserManagement 
                            ref={this.userManagement}
                            titleButtonLoad={"Data category"}
                            onLoadData={this.onLoadDataCategory}></UserManagement>
                    </TabPane>
                    <TabPane tabId="3">
                        <CategoryManagement 
                            ref={this.categoryManagement}
                            titleButtonLoad={"Data product"}
                            onLoadData={this.onLoadDataProduct}></CategoryManagement>
                    </TabPane>
                </TabContent>

            </div>
        )
    }
}

export default App;

