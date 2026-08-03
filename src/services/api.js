import axios from 'axios'

const jikan = axios.create({
  baseURL: 'https://api.jikan.moe/v4',
  timeout: 12000,
})

export const getTopAnime = async (page = 1) => {
  const res = await jikan.get('/top/anime', { params: { page, limit: 24, filter: 'bypopularity' } })
  return res.data
}

export const searchAnime = async (q, page = 1) => {
  const res = await jikan.get('/anime', { params: { q, page, limit: 24, sfw: true } })
  return res.data
}

export const getAnimeById = async (id) => {
  const res = await jikan.get(`/anime/${id}/full`)
  return res.data
}

export const getAiringAnime = async (page = 1) => {
  const res = await jikan.get('/seasons/now', { params: { page, limit: 24 } })
  return res.data
}

export const getTrendingAnime = async () => {
  try {
    const res = await axios.post('https://graphql.anilist.co', {
      query: `{
        Page(page: 1, perPage: 16) {
          media(type: ANIME, sort: TRENDING_DESC) {
            id idMal
            title { romaji english }
            coverImage { large medium }
            averageScore episodes seasonYear
          }
        }
      }`
    })
    return res.data?.data?.Page?.media || []
  } catch {
    return []
  }
}
