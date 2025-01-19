import { Timeline } from "../cmps/Timeline.jsx";
import { Sidenav } from "../cmps/Sidenav.jsx";
import { Storys } from "../cmps/Storys.jsx";
// import { useSelector } from "react-redux";
// import {store} from "../store/store"
// import { useEffect } from "react";
// import { loadPost } from "../store/actions/post.actions.js";
export function HomePage() {

//   const feed = useSelector(storeState => storeState.postModule.posts)
// console.log("feed is: ", feed);

// useEffect(()=>{
// loadPost()
// },[])
  return (
    <div className="homepage flex">
      <div className="homepage_nav">
        {/* <InstegramCameraIcon /> */}
        <Sidenav />
      </div>
      <div className="homepage_timeline column">
        <Storys/>
        <Timeline />
      </div>
    </div>
  );
}
