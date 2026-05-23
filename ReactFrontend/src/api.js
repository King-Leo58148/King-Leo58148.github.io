import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:8000/portfolio/'
})

export const getHero = () => API.get('hero/')
export const getAbout = () => API.get('about/')
export const getSkills = () => API.get('skills/')
export const getProjects = () => API.get('projects/')
export const getExperience = () => API.get('experience/')
export const getContact = () => API.get('contact/')