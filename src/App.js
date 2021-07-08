import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { useBlogContext } from "./Context/Context";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import PostEdit from "./Pages/Post-edit";
import Profile from "./Pages/Profile";
import SinglePage from "./Pages/SinglePage";
import Admin from "./Pages/Admin";
import Page404 from "./Pages/Page404";

function App() {
    const { isLoggedIn, setToken } = useBlogContext();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setToken(token);
    }, [setToken]);
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    {!isLoggedIn && (
                        <Route path="/auth/login">
                            <Login />
                        </Route>
                    )}
                    {!isLoggedIn && (
                        <Route path="/auth/signup">
                            <Signup />
                        </Route>
                    )}
                    {isLoggedIn && (
                        <Route exact path="/admin">
                            <Admin />
                        </Route>
                    )}
                    {isLoggedIn && (
                        <Route path="/admin/edit-post">
                            <PostEdit />
                        </Route>
                    )}
                    <Route path="/posts/:postId">
                        <SinglePage />
                    </Route>
                    {isLoggedIn && (
                        <Route path="/admin/profile">
                            <Profile />
                        </Route>
                    )}
                    <Route path="*">
                        <Page404 />
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
