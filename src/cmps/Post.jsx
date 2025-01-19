import DirectMsgIcon from "./svgIcons/DirectMsgIcon.jsx";
import NotificationIcon from "./svgIcons/NotificationIcon.jsx";
import BookmarkIcon from "./svgIcons/BookmarkIcon.jsx";
export function Post() {
  return (
    <div className="post">
    <div className="post__header">
      <div className="post__headerAuthor">Roomi-</div>
    </div>
    <div className="post__image">
      <img src="https://images.pexels.com/photos/1590882/pexels-photo-1590882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Post Image" />
    </div>
    <div className="post__footer">
      <div className="post__footerIcons">
        <div className="post__iconsMain">
          <NotificationIcon className="postIcon" />
          <DirectMsgIcon className="postIcon" />
        </div>
        <div className="post__iconSave">
          <BookmarkIcon className="postIcon" />
        </div>
      </div>
    </div>
  </div>
  
  );
}
