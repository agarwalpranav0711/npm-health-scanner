export function calculateHealthScore(input) {
  let score = 0;

  // =========================
  // Popularity (max 25 points)
  // =========================
  const { weeklyDownloads } = input;

  if (weeklyDownloads >= 1_000_000) {
    score += 25;
  } else if (weeklyDownloads >= 100_000) {
    score += 18;
  } else if (weeklyDownloads >= 10_000) {
    score += 10;
  } else {
    score += 3;
  }

  // (other categories will be added below)

    const { lastPublishedDays } = input;

  if (lastPublishedDays == null) {
    // no data → no points
    score += 0;
  } else if (lastPublishedDays <= 30) {
    score += 20;
  } else if (lastPublishedDays <= 180) {
    score += 12;
  } else if (lastPublishedDays <= 365) {
    score += 6;
  } else {
    score += 0;
  }

      const { lastCommitDays } = input;

  if (lastCommitDays == null) {
    // no GitHub data → assume inactive
    score += 0;
  } else if (lastCommitDays <= 14) {
    score += 20;
  } else if (lastCommitDays <= 90) {
    score += 12;
  } else if (lastCommitDays <= 180) {
    score += 6;
  } else {
    score += 0;
  }

    const { stars, forks } = input;

  if (stars == null || forks == null) {
    // missing GitHub community data
    score += 0;
  } else if (stars >= 10_000) {
    score += 20;
  } else if (stars >= 1_000) {
    score += 14;
  } else if (stars >= 100) {
    score += 8;
  } else {
    score += 2;
  }

    const { openIssues } = input;

  if (openIssues == null) {
    // missing data → neutral
    score += 0;
  } else if (openIssues <= 50) {
    score += 15;
  } else if (openIssues <= 200) {
    score += 8;
  } else if (openIssues <= 500) {
    score += 3;
  } else {
    score += 0;
  }

 

    // ======================
  // Final score & status
  // ======================
  if (score > 100) score = 100;
  if (score < 0) score = 0;

  let status = "healthy";
  if (score < 60) {
    status = "risky";
  } else if (score < 80) {
    status = "caution";
  }



  return {
    value: score,
    status
  };
}
