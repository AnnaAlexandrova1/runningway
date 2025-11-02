import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Layout from "./components/Layout";
import {RoutesList} from "./configData/Routes";


function App() {
    const routeComponents = RoutesList.map(
        ({path, component, protected_route}, key) => {
            return (
                <Route
                    key={key}
                    path={path}
                    element={
                        protected_route ? (
                            <Route>{component}</Route>
                        ) : (
                            component
                        )
                    }
                />
            );
        }
    );

    return (
        <Router>
            <Layout>
                <Routes>
                    {routeComponents}
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
