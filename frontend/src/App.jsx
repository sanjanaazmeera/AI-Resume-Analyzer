import { useState } from "react";
import axios from "axios";

function App() {

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  const handleUpload = async () => {

    if (!file) {
      alert("Please upload resume");
      return;
    }

    const formData = new FormData();

    formData.append("resume", file);

    try {

      setLoading(true);

   const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
   const res = await axios.post(
     `${API_URL}/api/resume/upload`,
     formData
   );

      setResult(res.data);

    } catch (error) {

      console.log(error);

      alert("Error analyzing resume");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-black text-white">

      {/* HERO SECTION */}

      <div className="flex flex-col items-center justify-center pt-24 px-6">

        <h1 className="text-7xl font-bold text-center leading-tight">

          Resume Analyzer

        </h1>

        <p className="text-gray-400 text-center mt-6 max-w-3xl text-xl leading-9">
        A modern career preparation platform that helps students evaluate resumes,
        identify technical skill gaps, improve ATS performance,
        and prepare effectively for placements.

        </p>

        {/* UPLOAD CARD */}

        <div className="bg-slate-900 mt-14 p-10 rounded-3xl shadow-2xl w-full max-w-3xl border border-slate-700">

          <h2 className="text-3xl font-bold mb-6 text-cyan-400">

            Upload Your Resume

          </h2>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-6 text-lg"
          />

          <br />

          <button
            onClick={handleUpload}
            className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-2xl text-lg font-bold transition-all"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>

        </div>

      </div>

      {/* RESULTS */}

      {result && (

        <div className="px-6 py-16">

          {/* TOP STATS */}

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">

            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-700">

              <h2 className="text-2xl font-bold mb-4 text-cyan-400">
                ATS Score
              </h2>

              <div className="text-6xl font-bold">
                {result.atsScore}/100
              </div>

            </div>

            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-700">

              <h2 className="text-2xl font-bold mb-4 text-cyan-400">
                Placement Readiness
              </h2>

              <div className="text-6xl font-bold">
                {result.readiness}%
              </div>

            </div>

            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-700">

              <h2 className="text-2xl font-bold mb-4 text-cyan-400">
                Suggested Role
              </h2>

              <div className="text-3xl font-bold">
                {result.role}
              </div>

            </div>

          </div>

          {/* SKILLS */}

          <div className="bg-slate-900 mt-10 p-10 rounded-3xl max-w-7xl mx-auto border border-slate-700">

            <h2 className="text-4xl font-bold mb-8 text-cyan-400">
              Detected Skills
            </h2>

            <div className="flex flex-wrap gap-4">

              {result.skills.map((skill, index) => (

                <div
                  key={index}
                  className="bg-cyan-500 text-black px-5 py-3 rounded-xl font-bold"
                >
                  {skill}
                </div>

              ))}

            </div>

          </div>

          {/* MISSING SKILLS */}

          <div className="bg-slate-900 mt-10 p-10 rounded-3xl max-w-7xl mx-auto border border-slate-700">

            <h2 className="text-4xl font-bold mb-8 text-red-400">
              Missing Skills
            </h2>

            <div className="flex flex-wrap gap-4">

              {result.missingSkills.map((skill, index) => (

                <div
                  key={index}
                  className="bg-red-500 text-white px-5 py-3 rounded-xl font-bold"
                >
                  {skill}
                </div>

              ))}

            </div>

          </div>

          {/* ROADMAP */}

          <div className="bg-slate-900 mt-10 p-10 rounded-3xl max-w-7xl mx-auto border border-slate-700">

            <h2 className="text-4xl font-bold mb-8 text-cyan-400">
              Personalized Career Roadmap
            </h2>

            <div className="space-y-6">

              {result.roadmap.map((step, index) => (

                <div
                  key={index}
                  className="bg-black p-6 rounded-2xl border border-slate-700"
                >
                  <h3 className="text-2xl font-bold mb-3">
                    Step {index + 1}
                  </h3>

                  <p className="text-gray-300 text-lg">
                    {step}
                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* ANALYSIS */}

          <div className="bg-slate-900 mt-10 p-10 rounded-3xl max-w-7xl mx-auto border border-slate-700">

            <h2 className="text-4xl font-bold mb-8 text-cyan-400">
              Resume Insights
            </h2>

            <div className="whitespace-pre-wrap text-gray-300 leading-9 text-lg">
              {result.analysis}
            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;
