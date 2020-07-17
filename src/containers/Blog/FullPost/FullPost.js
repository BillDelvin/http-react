import React, { Component } from "react";
import axios from "axios";
import "./FullPost.css";

class FullPost extends Component {
	state = {
		loadedPost: null,
	};

	componentDidMount() {
		console.log(this.props);
		this.loadData();
	}

	componentDidUpdate() {
		this.loadData();
	}

	loadData() {
		if (this.props.match.params.idPosts) {
			if (
				!this.state.loadedPost ||
				(this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.idPosts)
			) {
				axios.get("/posts/" + this.props.match.params.idPosts).then((res) => {
					// console.log(res);
					this.setState({
						loadedPost: res.data,
					});
				});
			}
		}
	}

	deletePostHandler = () => {
		axios.delete("/posts/" + this.props.match.params.idPosts).then((res) => {
			console.log(res);
		});
	};

	render() {
		let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
		if (this.props.match.params.idPosts) {
			post = <p style={{ textAlign: "center" }}>loading..!</p>;
		}
		if (this.state.loadedPost) {
			post = (
				<div className="FullPost">
					<h1>{this.state.loadedPost.title}</h1>
					<h1>{this.state.loadedPost.body}</h1>
					<p>Content</p>
					<div className="Edit">
						<button className="Delete" onClick={this.deletePostHandler}>
							Delete
						</button>
					</div>
				</div>
			);
		}
		return post;
	}
}

export default FullPost;
