import React, { useEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {LinearProgress} from "@material-ui/core";

import { useBlogContext } from "./Context/Context";
import Home from "./Pages/Home";
const Login = React.lazy(() => import("./Pages/Login"));
const Signup = React.lazy(() => import("./Pages/Signup"));
const PostEdit = React.lazy(() => import("./Pages/Post-edit"));
const Profile = React.lazy(() => import("./Pages/Profile"));
const SinglePage = React.lazy(() => import("./Pages/SinglePage"));
const Admin = React.lazy(() => import("./Pages/Admin"));
const Page404 = React.lazy(() => import("./Pages/Page404"));

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
                    <Suspense fallback={<LinearProgress/>}>
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
                    </Suspense>
                    <Route path="*">
                        <Page404 />
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
