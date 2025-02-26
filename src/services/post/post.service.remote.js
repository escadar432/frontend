import { httpService } from '../http.service'

export const postService = {
    query,
    getById,
    save,
    remove,
    addPostMsg
}

console.log("Im in Remote Service");

async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(`post`, filterBy)
}

function getById(postId) {
    return httpService.get(`post/${postId}`)
}

async function remove(postId) {
    return httpService.delete(`post/${postId}`)
}
async function save(post) {
    var savedPost
    if (post._id) {
        savedPost = await httpService.put(`post/${post._id}`, post)
    } else {
        savedPost = await httpService.post('post', post)
    }
    return savedPost
}

async function addPostMsg(postId, txt) {
    const savedMsg = await httpService.post(`post/${postId}/msg`, {txt})
    return savedMsg
}