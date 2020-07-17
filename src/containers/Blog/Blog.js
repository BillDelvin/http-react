import React, { Component } from "react";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import Posts from "./Posts/Posts";
import NewPost from "./NewPost/NewPost";
import asyncComponent from "../../hoc/asyncComponents";
import "./Blog.css";

const asyncNewPost = asyncComponent(() => {
	return import("./NewPost/NewPost");
});

class Blog extends Component {
	state = {
		auth: true,
	};

	render() {
		return (
			<div className="Blog">
				<header>
					<nav>
						<ul>
							<li>
								<NavLink
									to="/posts/"
									exact
									activeClassName="my-active"
									activeStyle={{
										color: "#fa923f",
										textDecoration: "underline",
									}}
								>
									{/* jika mau ganti class name active untuk di url */}
									Posts
								</NavLink>
							</li>
							<li>
								<NavLink
									to={{
										pathname: "/new-post",
										hash: "#submit",
										search: "?quick-submit=true",
									}}
								>
									New Post
								</NavLink>
							</li>
						</ul>
					</nav>
				</header>
				<Switch>
					{this.state.auth ? (
						<Route path="/new-post" component={asyncNewPost} />
					) : null}
					<Route path="/posts/" component={Posts} />
					<Route render={() => <h1>Not Found Page</h1>} />
					{/* <Redirect from="/" to="/posts" /> */}
				</Switch>
			</div>
		);
	}
}

export default Blog;
