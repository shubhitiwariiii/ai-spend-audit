"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [tool, setTool] = useState("");
  const [plan, setPlan] = useState("");
  const [spend, setSpend] = useState("");
  const [teamSize, setTeamSize] = useState("");

  const [auditResult, setAuditResult] = useState("");
  const [savings, setSavings] = useState(0);

  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

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
        "Your ChatGPT spend appears unusually high. You may benefit from consolidating subscriptions or switching some workflows to Claude.";

      estimatedSavings = 30;
    }

    else if (
      tool === "Cursor" &&
      Number(spend) > 40
    ) {
      recommendation =
        "Your Cursor spending suggests possible seat over-allocation. Smaller teams may achieve similar productivity with lower-tier plans.";

      estimatedSavings = 25;
    }

    else if (
      tool === "Claude" &&
      Number(spend) > 60
    ) {
      recommendation =
        "Claude usage costs appear elevated. Consider hybrid usage between Claude and ChatGPT depending on workflow specialization.";

      estimatedSavings = 40;
    }

    else if (
      tool === "OpenAI API" &&
      Number(spend) > 200
    ) {
      recommendation =
        "Your API usage costs are significant. AI infrastructure credits or caching strategies could reduce monthly expenses.";

      estimatedSavings = 80;
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
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-6xl font-extrabold mb-6 leading-tight">
          Stop Overpaying for AI Tools
        </h1>

        <p className="text-xl text-zinc-400 mb-12 max-w-2xl leading-relaxed">
          Instantly audit your startup’s AI stack, uncover wasted spend, and discover smarter pricing options.
        </p>

        <div className="bg-zinc-900/70 backdrop-blur-xl p-6 rounded-2xl border border-zinc-800 space-y-6">

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
              <option value="GitHub Copilot">GitHub Copilot</option>
              <option value="Gemini">Gemini</option>
              <option value="Anthropic API">Anthropic API</option>
              <option value="OpenAI API">OpenAI API</option>
              <option value="Windsurf">Windsurf</option>
              <option value="v0">v0</option>
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
            <div className="mt-8 space-y-6">

              <div className="grid md:grid-cols-2 gap-4">

                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
                  <p className="text-green-400 text-sm mb-2">
                    Monthly Savings
                  </p>

                  <h3 className="text-4xl font-bold text-green-300">
                    ${savings}
                  </h3>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
                  <p className="text-blue-400 text-sm mb-2">
                    Annual Savings
                  </p>

                  <h3 className="text-4xl font-bold text-blue-300">
                    ${savings * 12}
                  </h3>
                </div>

              </div>

              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">

                <div className="flex items-center justify-between mb-4">

                  <h3 className="text-2xl font-bold">
                    Audit Recommendation
                  </h3>

                  <span className="bg-green-500/20 text-green-300 text-sm px-3 py-1 rounded-full">
                    Optimization Found
                  </span>

                </div>

                <p className="text-zinc-300 leading-relaxed text-lg">
                  {auditResult}
                </p>

                <div className="mt-8 border-t border-zinc-800 pt-6">

                  <h4 className="text-xl font-semibold mb-4">
                    Save Your Full Audit Report
                  </h4>

                  <p className="text-zinc-400 mb-6">
                    Get a shareable version of your AI spend audit and receive future optimization insights.
                  </p>

                  <div className="space-y-4">

                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700"
                    />

                    <input
                      type="text"
                      placeholder="Company Name (optional)"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700"
                    />

                    <input
                      type="text"
                      placeholder="Your Role (optional)"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700"
                    />

                    <button
                      onClick={() =>
                        alert("Audit report saved successfully!")
                      }
                      className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-3 rounded-xl transition"
                    >
                      Save Audit Report
                    </button>

                  </div>

                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </main>
  );
}