import HomeIcon from "./svgIcons/HomeIcon.jsx";
import SearchIcon from "./svgIcons/SearchIcon.jsx";
import NewPostIcon from "./svgIcons/NewPostIcon.jsx";
import DirectMsgIcon from "./svgIcons/DirectMsgIcon.jsx";
import NotificationIcon from "./svgIcons/NotificationIcon.jsx";
import ReelsIcon from "./svgIcons/Reels.jsx";
import SettingsIcon from "./svgIcons/Settings.jsx";
import ExploreIcon from "./svgIcons/ExploreIcon.jsx";
import HomeOrNameLogo from "./HomeOrNameLogo.jsx";
import { SidebarAvatar } from "./SidebarAvatar.jsx";

const menuitems = {
  home: HomeIcon,
  search: SearchIcon,
  explore: ExploreIcon,
  reels: ReelsIcon,
  messages: DirectMsgIcon,
  notifications: NotificationIcon,
  createPost: NewPostIcon,
  // profile: ProfileImage => call a cmp that generates profile image based 
  profile: SidebarAvatar,
  settings: SettingsIcon,
};

export function Sidenav() {
  const profPicSize = 24
   
  return (
    <section className="sidenav  flex column">
      <div className="logo center">
        <HomeOrNameLogo />
      </div>

      <nav className="sidebar-menu flex column">
        {Object.entries(menuitems).map(([itemName, Icon]) => (
          <div  key={itemName} className="sidenav_button flex">
            <button
             
              className="menu-btn flex"
              aria-label={`Navigate to ${itemName}`}
              title={`Navigate to ${itemName}`}
            >
              <Icon className="menu-icon" profPicSize={profPicSize} />
              <span className="menu-btn-text">{itemName}</span>
            </button>
          </div>
        ))}
        
      </nav>
    </section>
  );
}
