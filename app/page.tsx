"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [tool, setTool] = useState("");
  const [plan, setPlan] = useState("");
  const [spend, setSpend] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [auditResult, setAuditResult] = useState("");
  const [savings, setSavings] = useState(0);

  const generateAudit = () => {
  let recommendation = "";
  let estimatedSavings = 0;

  if (
    teamSize === "1" &&
    plan.toLowerCase().includes("enterprise")
  ) {
    recommendation =
      "Your team is too small for an Enterprise plan. Downgrading could reduce unnecessary costs.";

    estimatedSavings = 150;
  }

  else if (
    tool === "ChatGPT" &&
    Number(spend) > 50
  ) {
    recommendation =
      "You may be overspending on ChatGPT. Consider optimizing plans or consolidating usage.";

    estimatedSavings = 30;
  }

  else {
    recommendation =
      "Your current AI spending looks reasonably optimized.";

    estimatedSavings = 0;
  }

  setAuditResult(recommendation);
  setSavings(estimatedSavings);
};

useEffect(() => {
  localStorage.setItem(
    "auditForm",
    JSON.stringify({
      tool,
      plan,
      spend,
      teamSize,
    })
  );
}, [tool, plan, spend, teamSize]);

useEffect(() => {
  const savedData = localStorage.getItem("auditForm");

  if (savedData) {
    const parsedData = JSON.parse(savedData);

    setTool(parsedData.tool || "");
    setPlan(parsedData.plan || "");
    setSpend(parsedData.spend || "");
    setTeamSize(parsedData.teamSize || "");
  }
}, []);

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold mb-6">
          AI Spend Auditor
        </h1>

        <p className="text-lg text-gray-300 mb-10">
          Discover where your startup is overspending on AI tools.
        </p>

        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-6">

          <div>
            <label className="block mb-2 text-sm text-gray-400">
              AI Tool
            </label>

            <select
              value={tool}
              onChange={(e) => setTool(e.target.value)}
              className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700"
            >
              <option value="">Select Tool</option>
              <option value="ChatGPT">ChatGPT</option>
              <option value="Claude">Claude</option>
              <option value="Cursor">Cursor</option>
              <option value="Copilot">GitHub Copilot</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Current Plan
            </label>

            <input
              type="text"
              placeholder="Example: Team Plan"
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Monthly Spend ($)
            </label>

            <input
              type="number"
              placeholder="100"
              value={spend}
              onChange={(e) => setSpend(e.target.value)}
              className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Team Size
            </label>

            <input
              type="number"
              placeholder="5"
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700"
            />
          </div>

          <button
            type="button"
            onClick={generateAudit}
            className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-200 transition"
          >
            Generate Audit
          </button>

            

          {auditResult && (
            <div className="bg-zinc-800 p-5 rounded-xl border border-zinc-700 mt-6">

              <h3 className="text-2xl font-bold mb-3">
                Audit Results
              </h3>

              <p className="text-gray-300 mb-4">
                {auditResult}
              </p>

              <div className="text-green-400 text-xl font-semibold">
                Estimated Monthly Savings: ${savings}
              </div>

              <div className="text-gray-500 mt-2">
                Estimated Annual Savings: ${savings * 12}
              </div>

            </div>
          )}

        </div>

      </div>
    </main>
  );
}