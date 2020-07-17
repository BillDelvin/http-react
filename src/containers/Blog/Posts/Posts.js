import React, { Component } from "react";
import Post from "../../../components/Post/Post";
import { Route } from "react-router-dom";
import FullPost from "../FullPost/FullPost";
import axios from "../../../axios";
import "./Posts.css";

class Posts extends Component {
	state = {
		posts: [],
	};

	componentDidMount() {
		console.log(this.props);
		axios
			.get("/posts")
			.then((res) => {
				const posts = res.data.slice(0, 4);
				const updatePosts = posts.map((post) => {
					return { ...post, author: "max" };
				});
				this.setState({
					posts: updatePosts,
				});
				// console.log(res);
			})
			.catch((error) => {
				console.log(error);
				// this.setState({
				//   error: true,
				// });
			});
	}

	postSelectedHandler = (id) => {
		// this.props.history.push({
		// 	pathname: "/posts/" + id,
		// });
		this.props.history.push("/posts/" + id);
	};

	render() {
		let posts = <p style={{ textAlign: "center" }}>Something wen wrong!</p>;
		if (!this.state.error) {
			// jika error tidak di set maka akan menampilkan yang dibawah
			posts = this.state.posts.map((post) => {
				return (
					// <Link key={post.id} to={"/posts" + post.id}>
					<Post
						key={post.id}
						title={post.title}
						author={post.author}
						clicked={() => this.postSelectedHandler(post.id)}
					/>
					// </Link>
				);
			});
		}
		return (
			<div>
				<section className="Posts">{posts}</section>
				<Route
					path={this.props.match.url + "/:idPosts"}
					exact
					component={FullPost}
				/>
			</div>
		);
	}
}

export default Posts;
