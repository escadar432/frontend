
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'post'

export const postService = {
    query,
    getById,
    save,
    remove,
    addPostMsg
}
window.cs = postService



// Timeline

// const loggedinUser = usersCollection.find({ _id: loggedinUser._id })
// const following = loggedinUser.following.map(user => user._id)
// const timeline = storiesCollection.find({ 'by._id': { $in: following } }).sort({ _id: -1 })

// const myPosts = storiesCollection.find({ 'by._id': loggedinUser._id }).sort({ _id: -1 })



async function query(filterBy = { txt: '', price: 0 }) {
	if (!storageService.get(STORAGE_KEY)) return gPosts
    var posts = await storageService.query(STORAGE_KEY)
    const { txt, sortField, sortDir } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        posts = posts.filter(post => regex.test(post.vendor) || regex.test(post.description))
    }
    
    if(sortField === 'vendor' || sortField === 'owner'){
        posts.sort((post1, post2) => 
            post1[sortField].localeCompare(post2[sortField]) * +sortDir)
    }
 
    
    posts = posts.map(({ _id, vendor, price, speed, owner }) => ({ _id, vendor, price, speed, owner }))
    return posts
}

function getById(postId) {
    return storageService.get(STORAGE_KEY, postId)
}

async function remove(postId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, postId)
}

async function save(post) {
    var savedPost
    if (post._id) {
        const postToSave = {
            _id: post._id
        }
        savedPost = await storageService.put(STORAGE_KEY, postToSave)
    } else {
        const postToSave = {
            txt: post.txt,
            // Later, owner is set by the backend
            owner: userService.getLoggedinUser(),
            msgs: []
        }
        savedPost = await storageService.post(STORAGE_KEY, postToSave)
    }
    return savedPost
}

async function addPostMsg(postId, txt) {
    // Later, this is all done by the backend
    const post = await getById(postId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    post.msgs.push(msg)
    await storageService.put(STORAGE_KEY, post)

    return msg
}

const gPosts = {
	_id: 's101',
	txt: 'Lake trip with the best 🩷',
	imgUrl: 'http://some-img',
	by: {
		_id: 'u101',
		fullname: 'sunflower_power77',
		imgUrl: 'http://some-img',
	},
	loc: {
		// Optional
		lat: 11.11,
		lng: 22.22,
		name: 'Lake Tahoe, California',
	},
	comments: [
		{
			id: 'c1001',
			by: {
				_id: 'u105',
				fullname: 'Bob',
				imgUrl: 'http://some-img',
			},
			txt: 'good one!',
			likedBy: [  // Optional
				{
					_id: 'u105',
					fullname: 'Bob',
					imgUrl: 'http://some-img',
				},
			],
		},
		{
			id: 'c1002',
			by: {
				_id: 'u106',
				fullname: 'Dob',
				imgUrl: 'http://some-img',
			},
			txt: 'not good!',
		},
	],
	likedBy: [
		{
			_id: 'u105',
			fullname: 'Bob',
			imgUrl: 'http://some-img',
		},
		{
			_id: 'u106',
			fullname: 'Dob',
			imgUrl: 'http://some-img',
		},
	],
	tags: ['fun', 'romantic'],
}


