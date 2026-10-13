import { CustomSpinner } from "@/components";
import { Button } from "@/components/ui/button";
import { useGithubContributions } from "@/services/queries/github";
import { GITHUB_USERNAME } from "../constant";
import ContributionGrid from "./ContributionGrid";

// A compact card with the last year of GitHub contributions as a calendar with a one line caption, and a loading and an error state with a retry.
const ContributionsCell = () => {
  const { data, error, isLoading, refetch } = useGithubContributions(GITHUB_USERNAME);
  const total = data ? Object.values(data.total).reduce((sum, value) => sum + value, 0) : 0;

  return (
    <div className="p-md">
      {/* Loading */}
      {isLoading && (
        <div className="flex min-h-36 items-center justify-center">
          <CustomSpinner message="Loading contributions..." />
        </div>
      )}
      {/* Error */}
      {error && !isLoading && (
        <div role="alert" className="flex min-h-36 flex-col items-start justify-center gap-xs">
          <p className="font-mono text-caption text-error">
            Could not load the contributions right now.
          </p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      )}
      {/* Calendar */}
      {data && !error && data.contributions.length > 0 && (
        <ContributionGrid
          days={data.contributions}
          total={total}
          profileUrl={`https://github.com/${GITHUB_USERNAME}`}
        />
      )}
    </div>
  );
};

export default ContributionsCell;
