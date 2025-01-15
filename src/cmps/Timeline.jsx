import { Post } from "./Post.jsx";
import { Suggestions } from "./Suggestions.jsx";
export function Timeline() {
  return (
    <section className="timeline flex">
      <div className="timeline_left">
        <Post />
      </div>
      <div className="timeline_right">
        <Suggestions />
         </div>
    </section>
  )
}
