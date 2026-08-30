const BASE_URL = 'https://jsonplaceholder.typicode.com'

async function handleResponse(res) {
  if (!res.ok) {
    throw new Error(`Error ${res.status}: no se pudo completar la solicitud`)
  }
  return res
}

export async function getUsers() {
  const res = await fetch(`${BASE_URL}/users`)
  await handleResponse(res)
  return res.json()
}

export async function getUserById(id) {
  const res = await fetch(`${BASE_URL}/users/${id}`)
  await handleResponse(res)
  return res.json()
}

export async function getPhotos({ page = 1, limit = 20, albumId } = {}) {
  const params = new URLSearchParams({ _page: page, _limit: limit })
  if (albumId) params.set('albumId', albumId)

  const res = await fetch(`${BASE_URL}/photos?${params.toString()}`)
  await handleResponse(res)
  const data = await res.json()
  const total = Number(res.headers.get('x-total-count')) || data.length
  return { data, total }
}

export async function getPhotoById(id) {
  const res = await fetch(`${BASE_URL}/photos/${id}`)
  await handleResponse(res)
  return res.json()
}
