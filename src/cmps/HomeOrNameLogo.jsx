import { useMediaQuery } from "react-responsive";
import InstagramNameIcon from "./svgIcons/InstagramNameIcon.jsx";
import InstagramCameraIcon from "./svgIcons/InstagramCameraIcon.jsx";


const HomeOrNameLogo = () => {
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1250px)" })

  return <div className="icon">{isLargeScreen ? <InstagramNameIcon /> : <InstagramCameraIcon />}</div>;
}

export default HomeOrNameLogo
