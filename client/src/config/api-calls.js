const PORT = process.env.API_PORT
const apiUrl = process.env.API_URL
const createLink = `${apiUrl}:${PORT}/api/v1/shorturl/create-link`

export {
    createLink
} 