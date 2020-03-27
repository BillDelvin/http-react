import React, { Component } from "react";
import axios from "axios";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

class Blog extends Component {
  state = {
    posts: [],
    selectPostId: null
  };

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(res => {
        const posts = res.data.slice(0, 4);
        const updatePosts = posts.map(post => {
          return { ...post, author: "max" };
        });
        this.setState({
          posts: updatePosts
        });
        // console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  postSelectedHandler = id => {
    this.setState({
      selectPostId: id
    });
  };

  render() {
    const posts = this.state.posts.map(post => {
      return (
        <Post
          title={post.title}
          key={post.id}
          author={post.author}
          clicked={() => this.postSelectedHandler(post.id)}
        />
      );
    });

    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
