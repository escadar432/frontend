 import { useSelector } from "react-redux";
export function SidebarAvatar({profPicSize}) {
  const user = useSelector((storeState) => storeState.userModule.user);

  const imgSrc = "https://randomuser.me/api/portraits/women/67.jpg";
  const alt = "profile image";

  return (
        <img
          className="sidebar-profile-avatar"
          src={imgSrc || "/default-avatar.png"}
          alt={alt || "User"}
          loading="lazy"
          style={{
            width: `${profPicSize}px`,
            height: `${profPicSize}px`
          }}
        />
  );
}
