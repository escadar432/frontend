import { Timeline } from "../cmps/Timeline.jsx";
import { Sidenav } from "../cmps/Sidenav.jsx";
export function HomePage() {
  return (
    <div className="homepage flex">
      <div className="homepage_nav">
        {/* <InstegramCameraIcon /> */}
        <Sidenav />
      </div>
      <div className="homepage_timeline">
        <Timeline />
      </div>
    </div>
  );
}
