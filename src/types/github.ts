export type GithubContribution = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type GithubContributionsResponse = {
  total: Record<string, number>;
  contributions: GithubContribution[];
};
