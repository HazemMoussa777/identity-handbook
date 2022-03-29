export interface GitHubFile {
  path: string;
  name: string;
  type: "file" | string;
}
export type GitHubFileWithContent = GitHubFile & {
  content: string;
  encoding: "base64" | string;
};

export type GitHubDirectory = GitHubFile[];

export function fetchGitHubFile({
  token,
  repo,
  path,
  ref,
}: {
  token: string;
  repo: string;
  path: string;
  ref?: string;
}): Promise<GitHubFileWithContent | GitHubDirectory> {
  return window
    .fetch(
      `https://api.github.com/repos/${repo}/contents/${path}${
        ref ? `?ref=${encodeURIComponent(ref)}` : ""
      }`,
      { headers: { Authorization: `token ${token}` } }
    )
    .then((response) => response.json());
}
