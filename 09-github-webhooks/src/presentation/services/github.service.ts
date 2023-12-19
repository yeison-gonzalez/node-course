import { GitHubStarPayload } from "../../interfaces";

export class GitHubService {
  constructor() { }
  
  onStar(payload: GitHubStarPayload): string {
    const { sender, repository, action } = payload;
    return `User ${sender.login} ${action} start on ${repository.full_name}`;
  }
}