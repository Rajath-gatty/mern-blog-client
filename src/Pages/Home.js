import React, { useState } from "react";
import { Search as SearchIcon } from "@material-ui/icons";
import axios from "axios";
import Skeleton from "../Components/UI/Skeleton";
import Posts from "../Components/Posts/Posts";
import Navbar from "../Components/Navbar/Navbar";
import Search from "../Components/Search/Search";

const Home = (props) => {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);
    let cancelToken;

    const searchHandler = (e) => {
        const query = e.target.value;
        if (query === "") {
            setShowResult(false);
            return;
        }
        setShowResult(true);
        setLoading(true);
        if (typeof cancelToken != typeof undefined) {
            cancelToken.cancel("Cancelling previous");
        }
        cancelToken = axios.CancelToken.source();
        axios
            .get(`/search/?filter=${query}`, {
                cancelToken: cancelToken.token,
            })
            .then((res) => {
                setResult(res.data.posts);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="wrapper">
                    <div className="search-wrapper">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <SearchIcon />
                            <input
                                type="text"
                                placeholder="search"
                                name="search"
                                id="search"
                                onChange={searchHandler}
                            />
                        </form>
                    </div>
                    {showResult && (
                        <div className="search-result-wrapper">
                            {loading ? (
                                <>
                                    <Skeleton />
                                    <Skeleton />
                                    <Skeleton />
                                </>
                            ) : result.length > 0 ? (
                                result.map((post) => {
                                    return (
                                        <Search
                                            key={post._id}
                                            id={post._id}
                                            title={post.title}
                                            imagePath={post.image.url}
                                        />
                                    );
                                })
                            ) : (
                                <h5
                                    style={{
                                        textAlign: "center",
                                        color: "rgb(88, 88, 88)",
                                    }}
                                >
                                    No results found
                                </h5>
                            )}
                        </div>
                    )}
                </div>
                <Posts />
            </div>
        </>
    );
};

export default Home;
