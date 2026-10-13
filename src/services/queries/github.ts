import Api from "@/config/api";
import { useApiQuery } from "@/hooks/useApi";
import { type GithubContributionsResponse } from "@/types/github";

// The last year of a GitHub profile's contributions, day by day.
export function useGithubContributions(username: string) {
  return useApiQuery<GithubContributionsResponse>(Api.GITHUB.CONTRIBUTIONS(username));
}
