import React from "react";
import BookmarkIcon from "./svgIcons/BookmarkIcon.jsx";
import CommentsIcon from "./svgIcons/Comments.jsx";
import DirectMsgIcon from "./svgIcons/DirectMsgIcon.jsx";
import MoreOptions from "./svgIcons/MoreOptions.jsx";
import NotificationIcon from "./svgIcons/NotificationIcon.jsx";

export function Post({ posts }) {
  if (!posts || posts.length === 0) {
    return <p className="no-posts">No posts available.</p>;
  }

  const timeAgo = (createdAt) => {
    const seconds = Math.floor((Date.now() - new Date(createdAt)) / 1000);
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}min`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d`;
    if (seconds < 2592000) return `${Math.floor(seconds / 604800)}w`;
    if (seconds < 31536000) return `${Math.floor(seconds / 2592000)}mo`;
    return `${Math.floor(seconds / 31536000)}y`;
  };

  console.log("posts: ", posts);
  
  return (
    <section className="post-container flex" aria-label="User Posts">
      {posts.map((post, index) => (
        <article
          key={post.id || `post-${index}`}
          className="post-card"
          aria-labelledby={`post-author-${index}`}
        >
          {/* Header */}
          <header className="post-header">
            <div className="author-info flex">
                <img
                  className="avatar"
                  src={post.by?.imgUrl || "/default-avatar.png"}
                  alt={`Profile of ${post.by?.username || "User"}`}
                />

              <div className="author-details flex">
               {/* todo center username */}
                <h2 id={`post-author-${index}`} className="author-name">
                  {post.by?.username}
                </h2>
                <div className="time-posted">
                  {/*todo  hover: show dd/mm/yy date*/}
                  <time dateTime={new Date(post.createdAt).toISOString()}>
                    &bull; {timeAgo(post.createdAt)}
                  </time>
                </div>
              </div>
            </div>
            <button className="post-options" aria-label="Post options">
              <MoreOptions />
            </button>
          </header>

          {/* Image */}
          <figure className="post-image">
            <img
              src={post.imgUrl}
              alt={post.title || "Post content"}
              loading="lazy"
            />
          </figure>

          {/* Footer */}
          <footer className="post-footer">
            <div className="post-interactions">
              <div className="post-actions" aria-label="Post interactions">
                <button aria-label="Notifications">
                  <NotificationIcon />
                </button>
                <button aria-label="Comments">
                  <CommentsIcon />
                </button>
                <button aria-label="Direct Message">
                  <DirectMsgIcon />
                </button>
              </div>
              <button className="save-action" aria-label="Save post">
                <BookmarkIcon />
              </button>
            </div>

            {post.likedBy.length > 0 && (
              <p className="num-likes" aria-live="polite">
                {post.likedBy.length} likes
              </p>
            )}

            <div className="post-caption">
              <strong className="author-name">{post.by?.username}</strong>
              <span className="post-title">{post.title}</span>
            </div>

            {/* Comments Section */}
            <section className="post-comments">
              {post.comments?.length > 0 && (
                <button className="view-all-comments" aria-expanded="false">
                  View all {post.comments.length} comments
                </button>
              )}

              {post.comments?.length > 0 && (
                <ul className="comments-list hide ">
                  {post.comments.map((comment, idx) => (
                    <li
                      key={comment.id || `comment-${idx}`}
                      className="comment"
                    >
                      <img
                        className="avatar small"
                        src={comment.by?.imgUrl || "/default-avatar.png"}
                        alt={`Profile of ${comment.by?.username || "User"}`}
                      />
                      <div className="comment-content">
                        <strong className="comment-author">
                          {comment.by?.username}
                        </strong>
                        <p className="comment-text">{comment.txt}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <form className="add-comment" aria-label="Add a comment">
                      <input
                  id={`comment-input-${index}`}
                  type="text"
                  placeholder="Add a comment..."
                  className="comment-input"
                />
              </form>
            </section>
          </footer>
        </article>
      ))}
    </section>
  );
}

export default Post;
