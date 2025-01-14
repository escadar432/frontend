import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadStorys, addStory, updateStory, removeStory } from '../store/actions/story.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { storyService } from '../services/story/'
import { userService } from '../services/user'

import { StoryList } from '../cmps/StoryList'

export function StoryIndex() {

    const storys = useSelector(storeState => storeState.storyModule.storys)

    useEffect(() => {
        loadStorys(filterBy)
    }, [filterBy])

    async function onRemoveStory(storyId) {
        try {
            await removeStory(storyId)
            showSuccessMsg('Story removed')            
        } catch (err) {
            showErrorMsg('Cannot remove story')
        }
    }

    async function onAddStory() {
        const story = storyService.getEmptyStory()
        story.vendor = prompt('Vendor?')
        try {
            const savedStory = await addStory(story)
            showSuccessMsg(`Story added (id: ${savedStory._id})`)
        } catch (err) {
            showErrorMsg('Cannot add story')
        }        
    }

    async function onUpdateStory(story) {
        const speed = +prompt('New speed?', story.speed)
        if(speed === 0 || speed === story.speed) return

        const storyToSave = { ...story, speed }
        try {
            const savedStory = await updateStory(storyToSave)
            showSuccessMsg(`Story updated, new speed: ${savedStory.speed}`)
        } catch (err) {
            showErrorMsg('Cannot update story')
        }        
    }

    return (
        <main className="story-index">
            <header>
                <h2>Storys</h2>
                {userService.getLoggedinUser() && <button onClick={onAddStory}>Add a Story</button>}
            </header>
            <StoryList 
                storys={storys}
                onRemoveStory={onRemoveStory} 
                onUpdateStory={onUpdateStory}/>
        </main>
    )
}