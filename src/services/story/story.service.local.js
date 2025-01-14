
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'story'

export const storyService = {
    query,
    getById,
    save,
    remove,
    addStoryMsg
}
window.cs = storyService


async function query(filterBy = { txt: '', price: 0 }) {
    var storys = await storageService.query(STORAGE_KEY)
    const { txt, sortField, sortDir } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        storys = storys.filter(story => regex.test(story.vendor) || regex.test(story.description))
    }
    
    if(sortField === 'vendor' || sortField === 'owner'){
        storys.sort((story1, story2) => 
            story1[sortField].localeCompare(story2[sortField]) * +sortDir)
    }
    if(sortField === 'price' || sortField === 'speed'){
        storys.sort((story1, story2) => 
            (story1[sortField] - story2[sortField]) * +sortDir)
    }
    
    storys = storys.map(({ _id, vendor, price, speed, owner }) => ({ _id, vendor, price, speed, owner }))
    return storys
}

function getById(storyId) {
    return storageService.get(STORAGE_KEY, storyId)
}

async function remove(storyId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, storyId)
}

async function save(story) {
    var savedStory
    if (story._id) {
        const storyToSave = {
            _id: story._id
        }
        savedStory = await storageService.put(STORAGE_KEY, storyToSave)
    } else {
        const storyToSave = {
            txt: story.txt,
            // Later, owner is set by the backend
            owner: userService.getLoggedinUser(),
            msgs: []
        }
        savedStory = await storageService.post(STORAGE_KEY, storyToSave)
    }
    return savedStory
}

async function addStoryMsg(storyId, txt) {
    // Later, this is all done by the backend
    const story = await getById(storyId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    story.msgs.push(msg)
    await storageService.put(STORAGE_KEY, story)

    return msg
}

const story = {
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



// Feed

const loggedinUser = usersCollection.find({ _id: loggedinUser._id })
const following = loggedinUser.following.map(user => user._id)
const feed = storiesCollection.find({ 'by._id': { $in: following } }).sort({ _id: -1 })

const myPosts = storiesCollection.find({ 'by._id': loggedinUser._id }).sort({ _id: -1 })


