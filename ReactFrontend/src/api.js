import axios from 'axios'

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://king-leo58148-github-io.onrender.com/portfolio/'
})

const CACHE_PREFIX = 'portfolio_cache_'

export function getCached(key) {
    try {
        const raw = localStorage.getItem(CACHE_PREFIX + key)
        return raw ? JSON.parse(raw) : null
    } catch {
        return null
    }
}

function fetchAndCache(endpoint, key) {
    return API.get(endpoint).then(res => {
        try {
            localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(res.data))
        } catch {
            // Ignore storage quota / private-mode errors
        }
        return res
    })
}

export const getHero = () => fetchAndCache('hero/', 'hero')
export const getAbout = () => fetchAndCache('about/', 'about')
export const getSkills = () => fetchAndCache('skills/', 'skills')
export const getProjects = () => fetchAndCache('projects/', 'projects')
export const getExperience = () => fetchAndCache('experience/', 'experience')
export const getContact = () => fetchAndCache('contact/', 'contact')
