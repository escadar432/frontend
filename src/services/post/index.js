const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId } from '../util.service'

import { postService as remote } from './post.service.remote'
import { postService as local } from './post.service.local'

function getEmptyPost() {
	return {
		vendor: makeId(),
		speed: getRandomIntInclusive(80, 240),
		msgs: [],
	}
}

function getDefaultFilter() {
    return {
        txt: '',
        minSpeed: '',
        sortField: '',
        sortDir: '',
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
export  const postService = { getEmptyPost, getDefaultFilter, ...service }
console.log("index.j: service var is ", service)
console.log('local or service: ', VITE_LOCAL === 'true' ? local : remote);


// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.postService = postService
