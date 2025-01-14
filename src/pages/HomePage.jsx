import { Sidenav } from "../cmps/Sidenav";
import { Story } from "../cmps/Story";
export function HomePage() {
    return (
        <div className="home-page flex">
            <Sidenav className="sidebar"/>
            <Story /> 
        </div >
    )
}