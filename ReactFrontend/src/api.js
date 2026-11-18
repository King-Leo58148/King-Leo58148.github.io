import axios from 'axios'

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://king-leo58148-github-io.onrender.com/portfolio/'
})

export const getHero = () => API.get('hero/')
export const getAbout = () => API.get('about/')
export const getSkills = () => API.get('skills/')
export const getProjects = () => API.get('projects/')
export const getExperience = () => API.get('experience/')
export const getContact = () => API.get('contact/')