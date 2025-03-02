import { postService } from "../../services/post/post.service.local.js";
import { store } from "../store";
import {
  ADD_POST,
  REMOVE_POST,
  SET_POSTS,
  SET_POST,
  UPDATE_POST,
  ADD_POST_MSG,
} from "../reducers/post.reducer";

export async function loadPosts() {
  
  try {
    const posts = await postService.query()    
    store.dispatch(getCmdSetPosts(posts))
    if (posts && posts.length > 0) {
    } else {
      console.error("No data found")
    }
  } catch (error) {
    console.error("Error loading data:", error)
    throw error
  }
}
export async function loadPost(postId) {
  try {
    const post = await postService.getById(postId)
    store.dispatch(getCmdSetPost(post))
  } catch (err) {
    console.log("Cannot load post", err)
    throw err;
  }
}

export async function removePost(postId) {
  try {
    await postService.remove(postId)
    store.dispatch(getCmdRemovePost(postId))
  } catch (err) {
    console.log("Cannot remove post", err)
    throw err;
  }
}

export async function addPost(post) {
  try {
    const savedPost = await postService.save(post)
    store.dispatch(getCmdAddPost(savedPost))
    return savedPost
  } catch (err) {
    console.log("Cannot add post", err)
    throw err
  }
}

export async function updatePost(post) {
  try {
    const savedPost = await postService.save(post)
    store.dispatch(getCmdUpdatePost(savedPost))
    return savedPost
  } catch (err) {
    console.log("Cannot save post", err)
    throw err
  }
}

export async function addPostMsg(postId, txt) {
  try {
    const msg = await postService.addPostMsg(postId, txt)
    store.dispatch(getCmdAddPostMsg(msg))
    return msg
  } catch (err) {
    console.log("Cannot add post msg", err)
    throw err
  }
}

// Command Creators:
function getCmdSetPosts(posts) {
  return {
    type: SET_POSTS,
    posts
  }
}
function getCmdSetPost(post) {
  return {
    type: SET_POST,
    post,
  };
}
function getCmdRemovePost(postId) {
  return {
    type: REMOVE_POST,
    postId,
  };
}
function getCmdAddPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}
function getCmdUpdatePost(post) {
  return {
    type: UPDATE_POST,
    post,
  };
}
function getCmdAddPostMsg(msg) {
  return {
    type: ADD_POST_MSG,
    msg,
  };
}

// unitTestActions()
async function unitTestActions() {
  await loadPosts();
  await addPost(postService.getEmptyPost());
  await updatePost({
    _id: "m1oC7",
    title: "Post-Good",
  });
  await removePost("m1oC7");
  // TODO unit test addPostMsg
}
