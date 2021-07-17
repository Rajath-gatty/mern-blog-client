import React, { useEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";

import { useBlogContext } from "./Context/Context";
import Home from "./Pages/Home";
import Page404 from "./Pages/Page404";
const Login = React.lazy(() => import("./Pages/Login"));
const Signup = React.lazy(() => import("./Pages/Signup"));
const PostEdit = React.lazy(() => import("./Pages/Post-edit"));
const Profile = React.lazy(() => import("./Pages/Profile"));
const SinglePage = React.lazy(() => import("./Pages/SinglePage"));
const Admin = React.lazy(() => import("./Pages/Admin"));
const ForgotPassword = React.lazy(() => import("./Pages/ForgotPassword"));
const ResetPassword = React.lazy(() => import("./Pages/ResetPassword"));

function App() {
    const { isLoggedIn, setToken } = useBlogContext();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setToken(token);
    }, [setToken]);
    return (
        <>
            <Suspense fallback={<LinearProgress />}>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        {!isLoggedIn && (
                            <Route exact path="/auth/login">
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
                        <Route path="/admin/forgot-password">
                            <ForgotPassword />
                        </Route>
                        <Route path="/admin/reset-password/:paramToken">
                            <ResetPassword />
                        </Route>
                        <Route path="*">
                            <Page404 />
                        </Route>
                    </Switch>
                </Router>
            </Suspense>
        </>
    );
}

export default App;
