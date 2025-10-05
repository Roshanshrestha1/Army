// Simplified API client for now
export async function fetchProgress() {
  // Return empty data for now
  return { milestones: [], userSettings: {} }
}

export async function saveProgress(progress) {
  // Just log for now
  console.log('Saving progress:', progress)
  return true
}


