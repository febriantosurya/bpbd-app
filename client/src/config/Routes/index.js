import React from 'react'
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom'
import { Login } from '../../pages'

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route
                    path='/login'
                    element={<Login />}>
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes