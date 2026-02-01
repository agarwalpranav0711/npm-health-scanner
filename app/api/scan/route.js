import { NextResponse } from "next/server";
import { calculateHealthScore } from "@/app/library/healthscore";



function extractGithubRepo(repoUrl) {
    if (!repoUrl) return null;

    return repoUrl
        .replace("git+", "")
        .replace(".git", "")
        .replace("https://github.com/", "")
        .replace("http://github.com/", "")
        .trim();
}



export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const packageName = searchParams.get("package");

    if (!packageName) {
        return NextResponse.json(
            { error: "Package name is required" },
            { status: 400 }
        );
    }

    try {
        // 1️⃣ Fetch npm registry data
        const registryRes = await fetch(
            `https://registry.npmjs.org/${packageName}`
        );

        if (!registryRes.ok) {
            return NextResponse.json(
                { exists: false, error: "Package not found on npm" },
                { status: 404 }
            );
        }

        const registryData = await registryRes.json();

        const repoUrl = registryData.repository?.url;
        const githubRepo = extractGithubRepo(repoUrl);

        let githubData = null;

        if (githubRepo) {
            const githubRes = await fetch(
                `https://api.github.com/repos/${githubRepo}`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                        Accept: "application/vnd.github+json"
                    }
                }
            );

            if (githubRes.ok) {
                const repoData = await githubRes.json();

                githubData = {
                    repo: githubRepo,
                    stars: repoData.stargazers_count,
                    forks: repoData.forks_count,
                    openIssues: repoData.open_issues_count,
                    lastCommitDays: Math.floor(
                        (Date.now() - new Date(repoData.pushed_at).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )
                };
            }
        }


        // 2️⃣ Fetch weekly downloads
        const downloadsRes = await fetch(
            `https://api.npmjs.org/downloads/point/last-week/${packageName}`
        );

        const downloadsData = await downloadsRes.json();
        const weeklyDownloads = downloadsData.downloads ?? 0;


        // 3️⃣ Extract required fields
        const latestVersion = registryData["dist-tags"]?.latest;
        const versions = registryData.versions || {};
        const totalVersions = Object.keys(versions).length;

        const timeMap = registryData.time || {};
        const lastPublished = timeMap[latestVersion];

        const lastPublishedDays = lastPublished
            ? Math.floor(
                (Date.now() - new Date(lastPublished).getTime()) /
                (1000 * 60 * 60 * 24)
            )
            : null;


        const score = calculateHealthScore({
            weeklyDownloads,
            lastPublishedDays,
            lastCommitDays: githubData?.lastCommitDays,
            stars: githubData?.stars,
            forks: githubData?.forks,
            openIssues: githubData?.openIssues
        });


        return NextResponse.json({
            package: packageName,
            exists: true,

            npm: {
                latestVersion,
                weeklyDownloads,
                totalVersions,
                lastPublishedDays
            },

            github: githubData, // coming in Step-4

            score,

            warnings: []
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
