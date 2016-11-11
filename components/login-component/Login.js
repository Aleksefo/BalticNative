/**
 * Created by Antti on 28.10.2016.
 */
import React, { PropTypes as T } from 'react'
import {ButtonToolbar, Button} from 'react-bootstrap'
import AuthService from 'utils/AuthService'
import styles from './styles.module.css'
import LoginForm from './LoginView.jsx';

export class Login extends React.Component {
    static propTypes = {
        location: T.object,
        auth: T.instanceOf(AuthService)
    }

    render() {
        const { auth } = this.props
        return (
            <div className={styles.root}>
    <h2>Login</h2>
                <LoginForm/>
        <ButtonToolbar className={styles.toolbar}>
    <Button bsStyle="primary" onClick={auth.login.bind(this)}>Login</Button>
        </ButtonToolbar>
        </div>
    )
    }
}

export default Login;