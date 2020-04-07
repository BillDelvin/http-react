import React, { Component } from "react";
import Post from "../../../components/Post";
import axios from "../../../axios";

class Posts extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
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
        console.log(err);
        // this.setState({
        //   error: true,
        // });
      });
  }

  postSelectedHandler = (id) => {
    this.setState({
      selectPostId: id,
    });
  };

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something wen wrong!</p>;
    if (!this.state.error) {
      // jika error tidak di set maka akan menampilkan yang dibawah
      posts = this.state.posts.map((post) => {
        return (
          <Post
            title={post.title}
            key={post.id}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
        );
      });
    }
    return <section className="Posts">{posts}</section>;
  }
}

export default Posts;
