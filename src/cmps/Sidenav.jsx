import HomeIcon from "./svgIcons/HomeIcon.jsx";
import SearchIcon from "./svgIcons/SearchIcon.jsx";
import NewPostIcon from "./svgIcons/NewPostIcon.jsx";
import DirectMsgIcon from "./svgIcons/DirectMsgIcon.jsx";
import NotificationIcon from "./svgIcons/NotificationIcon.jsx";
import ReelsIcon from "./svgIcons/Reels.jsx";
import SettingsIcon from "./svgIcons/Settings.jsx";
import ExploreIcon from "./svgIcons/ExploreIcon.jsx";
import HomeOrNameLogo from "./HomeOrNameLogo.jsx";

const menuitems = {
  home: HomeIcon,
  search: SearchIcon,
  explore: ExploreIcon,
  reels: ReelsIcon,
  messages: DirectMsgIcon,
  notifications: NotificationIcon,
  createPost: NewPostIcon,
  settings: SettingsIcon,
};

export function Sidenav() {
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
              <Icon className="menu-icon" />
              <span className="menu-btn-text">{itemName}</span>
            </button>
          </div>
        ))}
      </nav>
    </section>
  );
}
