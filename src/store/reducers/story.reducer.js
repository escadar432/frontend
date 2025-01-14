export const SET_STORYS = 'SET_STORYS'
export const SET_STORY = 'SET_STORY'
export const REMOVE_STORY = 'REMOVE_STORY'
export const ADD_STORY = 'ADD_STORY'
export const UPDATE_STORY = 'UPDATE_STORY'
export const ADD_STORY_MSG = 'ADD_STORY_MSG'

const initialState = {
    storys: [],
    story: null
}

export function storyReducer(state = initialState, action) {
    var newState = state
    var storys
    switch (action.type) {
        case SET_STORYS:
            newState = { ...state, storys: action.storys }
            break
        case SET_STORY:
            newState = { ...state, story: action.story }
            break
        case REMOVE_STORY:
            const lastRemovedStory = state.storys.find(story => story._id === action.storyId)
            storys = state.storys.filter(story => story._id !== action.storyId)
            newState = { ...state, storys, lastRemovedStory }
            break
        case ADD_STORY:
            newState = { ...state, storys: [...state.storys, action.story] }
            break
        case UPDATE_STORY:
            storys = state.storys.map(story => (story._id === action.story._id) ? action.story : story)
            newState = { ...state, storys }
            break
        case ADD_STORY_MSG:
            newState = { ...state, story: { ...state.story, msgs: [...state.story.msgs || [], action.msg] } }
            break
        default:
    }
    return newState
}

// unitTestReducer()

function unitTestReducer() {
    var state = initialState
    const story1 = { _id: 'b101', vendor: 'Story ' + parseInt(Math.random() * 10), msgs: [] }
    const story2 = { _id: 'b102', vendor: 'Story ' + parseInt(Math.random() * 10), msgs: [] }

    state = storyReducer(state, { type: SET_STORYS, storys: [story1] })
    console.log('After SET_STORYS:', state)

    state = storyReducer(state, { type: ADD_STORY, story: story2 })
    console.log('After ADD_STORY:', state)

    state = storyReducer(state, { type: UPDATE_STORY, story: { ...story2, vendor: 'Good' } })
    console.log('After UPDATE_STORY:', state)

    state = storyReducer(state, { type: REMOVE_STORY, storyId: story2._id })
    console.log('After REMOVE_STORY:', state)

    const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
    state = storyReducer(state, { type: ADD_STORY_MSG, storyId: story1._id, msg })
    console.log('After ADD_STORY_MSG:', state)

    state = storyReducer(state, { type: REMOVE_STORY, storyId: story1._id })
    console.log('After REMOVE_STORY:', state)
}

