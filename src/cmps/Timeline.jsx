import { Post } from "./Post.jsx";
import { Suggestions } from "./Suggestions.jsx";
export function Timeline() {
  return (
    <section className="timeline-feed flex">
      <div >
        <Post />
      </div>
      <div >
        <Suggestions />
         </div>
    </section>
  )
}
