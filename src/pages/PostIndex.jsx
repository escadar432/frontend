import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Post } from "../cmps/Post.jsx";
import { Sidenav } from "../cmps/Sidenav.jsx";
import { Suggested } from "../cmps/Suggested.jsx";
import { loadPosts } from "../store/actions/post.actions.js";
import { Storys } from "../cmps/Storys.jsx";

export function PostIndex() {
  console.log("in inside an index page");

  const posts = useSelector((state) => state.postModule.posts);
  useEffect(() => {
    loadPosts();
  }, [])

  console.log("posts:", posts);

  if (!posts) return <div>Loading PostIndex...</div>;
  return (
    <div className="index-page flex">
      <div className="sidenav-container">
        <Sidenav />
      </div>

      <main className="main-content flex row">
        <div className="story-feed-container">
          <div className="story-container">
            <Storys />
          </div>

          <div className="feed-container">
            {posts ? <Post posts={posts} /> : <div>Loading PostIndex...</div>}
          </div>
        </div>

        <div className="suggested-my-profile-icon flex row">
          <Suggested className="suggested-section" />
        </div>
      </main>
    </div>
  );
}