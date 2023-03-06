const GITHUB_API = "https://api.github.com";

export async function fetchUserInfo(username: string) {
  const response = await fetch(`${GITHUB_API}/users/${username}`);
  return [response.status, await response.json()];
}

export async function fetchRepositories(username: string) {
  const response = await fetch(`${GITHUB_API}/users/${username}/repos`);
  return [response.status, await response.json()];
}

export async function fetchOrganizationMembers(username: string) {
  const response = await fetch(`${GITHUB_API}/orgs/${username}/members`);
  return [response.status, await response.json()];
}

export async function fetchFollowers(username: string) {
  const response = await fetch(`${GITHUB_API}/users/${username}/followers`);
  return [response.status, await response.json()];
}


export async function fetchFollowing(username: string) {
  const response = await fetch(`${GITHUB_API}/users/${username}/following`);
  return [response.status, await response.json()];
}


