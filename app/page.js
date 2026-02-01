"use client";

import { useState } from "react";

export default function Home() {
  const [packageName, setPackageName] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleScan() {
    if (!packageName) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(`/api/scan?package=${packageName}`);
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      setData(result);
    } catch (err) { 
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen  bg-zinc-950 text-white flex justify-center px-6 pt-28">
      <div className="w-full max-w-4xl">
        {/* HEADER */}
<h1 className="text-4xl font-bold text-center">
  NPM Health Scanner
</h1>
<p className="text-zinc-400 mt-2 text-center">
  Analyze the health of any npm package
</p>


        {/* INPUT */}
        <div className="mt-6 flex gap-3 justify-center">
          <input
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            placeholder="e.g. axios"
            className="w-72 px-4 py-2 rounded-md bg-zinc-900 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center"
          />
          <button
            onClick={handleScan}
            className="px-5 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 transition font-medium"
          >
            Scan
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="mt-6 text-zinc-400">
            Scanning package…
          </p>
        )}

        {/* ERROR */}
        {error && (
          <p className="mt-6 text-red-500">
            {error}
          </p>
        )}

        {/* RESULT */}
        {data && (
          <>
            {/* SCORE CARD */}
            <div className="mt-10 p-8 rounded-xl bg-zinc-900 border border-zinc-800">
              <div className="text-5xl font-bold">
                {data.score.value}
              </div>

              <div
                className={`mt-2 text-lg font-semibold ${
                  data.score.status === "healthy"
                    ? "text-green-400"
                    : data.score.status === "caution"
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {data.score.status.toUpperCase()}
              </div>

              <p className="mt-3 text-zinc-400">
                Overall package health score
              </p>
            </div>

            {/* METRICS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              <Metric
                title="Weekly Downloads"
                value={data.npm.weeklyDownloads.toLocaleString()}
              />
              <Metric
                title="GitHub Stars"
                value={
                  data.github?.stars
                    ? data.github.stars.toLocaleString()
                    : "N/A"
                }
              />
              <Metric
                title="Last Commit"
                value={`${data.github?.lastCommitDays} days ago`}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}

function Metric({ title, value }) {
  return (
    <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800">
      <p className="text-sm text-zinc-400">
        {title}
      </p>
      <h3 className="text-2xl font-semibold mt-2">
        {value}
      </h3>
    </div>
  );
}
