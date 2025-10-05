import { useAuthStore } from '../store/useAuthStore'

export async function fetchProgress() {
  const { apiBase, token } = useAuthStore.getState()
  const res = await fetch(`${apiBase}/progress.php`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to fetch progress')
  return data.data
}

export async function saveProgress(progress) {
  const { apiBase, token } = useAuthStore.getState()
  const res = await fetch(`${apiBase}/progress.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ data: progress })
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to save progress')
  return true
}


