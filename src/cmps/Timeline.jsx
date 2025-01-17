import { Post } from "./Post.jsx";
import { Suggestions } from "./Suggestions.jsx";
export function Timeline() {
  return (
    <section className=" flex">
      <div className="timeline left">
        <Post />
      </div>
      <div className="timeline right">
        <Suggestions />
         </div>
    </section>
  )
}
