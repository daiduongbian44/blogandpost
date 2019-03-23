import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { simpleAction } from './actions/simpleAction';
import { push } from 'connected-react-router'
import { routes } from './router'

let logo = '/app-frontend/dist/images/logo.svg'

class App extends Component {

    constructor(props) {
        super(props)

        this.handleClickSimpleAction = this.handleClickSimpleAction.bind(this)
        this.handleClickLink = this.handleClickLink.bind(this)
    }

    handleClickSimpleAction(event) {
        this.props.simpleAction()
    }

    handleClickLink() {
        this.props.push(routes.blogDetail.path.replace(':id', 19))
    }

    render() {

        console.log('Render')
        console.log(JSON.stringify(this.props))

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        onClick={this.handleClickLink}
                        target="_blank"
                        rel="noopener noreferrer">
                        Go to blog detail
                    </a>

                    <button onClick={this.handleClickSimpleAction}>Test redux action</button>
                </header>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    router: state.router
})

const mapDispatchToProps = dispatch => ({
    simpleAction: () => dispatch(simpleAction()),
    push: (data) => dispatch(push(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
