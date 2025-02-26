import { storageService } from "../async-storage.service";
import { makeId } from "../util.service";
import { userService } from "../user";

const STORAGE_KEY = "post";

export const postService = {
  query,
  getById,
  save,
  remove,
  addPostMsg,
  getDefaultFilter,
  getEmptyPost,
};
window.cs = postService;

// Timeline
// const loggedinUser = usersCollection.find({ _id: loggedinUser._id })
// const following = loggedinUser.following.map(user => user._id)
// const timeline = storiesCollection.find({ 'by._id': { $in: following } }).sort({ _id: -1 })

// const myPosts = storiesCollection.find({ 'by._id': loggedinUser._id }).sort({ _id: -1 })

async function query(filterBy = { txt: "" }) {
  try {
    let posts = await storageService.query(STORAGE_KEY);
    const { txt, sortField, sortDir } = filterBy;
    console.log("the posts from service local are:", posts)
    
    return posts
  } catch (error) {
    console.log("Cannot load posts", error)
    throw new Error(error)
  }
}
function getById(postId) {
  return storageService.get(STORAGE_KEY, postId);
}

async function remove(postId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, postId);
}

async function save(post) {
  var savedPost;
  if (post._id) {
    const postToSave = {
      _id: post._id,
    };
    savedPost = await storageService.put(STORAGE_KEY, postToSave);
  } else {
    const postToSave = {
      txt: post.txt,
      // Later, owner is set by the backend
      owner: userService.getLoggedinUser(),
      msgs: [],
    };
    savedPost = await storageService.post(STORAGE_KEY, postToSave);
  }
  return savedPost;
}
function getEmptyPost() {
  return {
    vendor: makeId(),
    speed: getRandomIntInclusive(80, 240),
    msgs: [],
  };
}

function getDefaultFilter() {
  return {
    txt: "",
    sortDir: "",
  };
}
async function addPostMsg(postId, txt) {
  // Later, this is all done by the backend
  const post = await getById(postId);

  const msg = {
    id: makeId(),
    by: userService.getLoggedinUser(),
    txt,
  };
  post.msgs.push(msg);
  await storageService.put(STORAGE_KEY, post);

  return msg;
}
