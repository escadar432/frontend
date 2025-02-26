import BookmarkIcon from "./svgIcons/BookmarkIcon.jsx";
import CommentsIcon from "./svgIcons/Comments.jsx";
import DirectMsgIcon from "./svgIcons/DirectMsgIcon.jsx";
import MoreOptions from "./svgIcons/MoreOptions.jsx";
import NotificationIcon from "./svgIcons/NotificationIcon.jsx";

export function Post({ posts }) {
  if (!posts || posts.length === 0) {
    return <div className="no-posts">No posts available.</div>;
  }

  // Remove this after backend implementation
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

  return (
    <div className="post-container">
      {posts.map((post, index) => (
        <div key={post.id || `post-${index}`} className="post-card">
          {/* Header */}
          <div className="post-header">
            <div className="author author-name">
              <img
                className="avatar"
                src={post.by?.imgUrl || "/default-avatar.png"}
                alt={post.by?.fullname || "User"}
              />
              <div className="author-details">
                <span className="author-name">{post.by?.fullname}</span>
                <span className="post-time">&bull; {timeAgo(post.createdAt)}</span>
              </div>
            </div>
            <div className="post-options">
              <MoreOptions />
            </div>
          </div>

          {/* Image */}
          <div className="post-image">
            <img src={post.imgUrl} alt={post.txt || "Post content"} />
          </div>

          {/* Footer */}
          <div className="post-footer">
            <div className="post-icons">
              <div className="icons-left">
                <NotificationIcon />
                <CommentsIcon />
                <DirectMsgIcon />
              </div>
              <div className="icon-save">
                <BookmarkIcon />
              </div>
            </div>

            <div className="num-likes">
              {post.likedBy.length > 0 && `${post.likedBy.length} likes`}
            </div>

            <div>
              <span className="author-name">{post.by?.fullname}</span>
              <span className="post-txt">{post.txt}</span>
            </div>

            {/* Comments */}
            <div className="post-comments">
              {post.comments?.length > 0 && (
                <div className="view-all-comments">
                  <span>View all {post.comments.length} comments</span>
                </div>
              )}
            </div>

            <div className="add-comment">
              <input placeholder="Add a comment..." />
            </div>

            <div className="post-comments hide">
              {post.comments?.map((comment, idx) => (
                <div key={comment.id || `comment-${idx}`} className="comment">
                  <img
                    className="avatar small"
                    src={comment.by?.imgUrl || "/default-avatar.png"}
                    alt={comment.by?.fullname || "User"}
                  />
                  <div className="comment-text">
                    <span className="comment-author">{comment.by?.fullname}</span>
                    {comment.txt}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}