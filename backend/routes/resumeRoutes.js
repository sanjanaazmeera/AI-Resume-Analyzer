const express = require("express");

const router = express.Router();

const multer = require("multer");

const pdfParse = require("pdf-parse");

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
});

router.post("/upload", upload.single("resume"), async (req, res) => {

  try {

    if (!req.file) {

      return res.status(400).json({
        message: "No file uploaded",
      });

    }

    const pdfData = await pdfParse(req.file.buffer);

    const resumeText = pdfData.text.toLowerCase();

    let skills = [];

    const techSkills = [
      "javascript",
      "react",
      "node",
      "express",
      "mongodb",
      "python",
      "java",
      "sql",
      "html",
      "css",
      "tailwind",
      "bootstrap",
      "c++",
      "c",
      "git",
      "github",
    ];

    techSkills.forEach((skill) => {

      if (resumeText.includes(skill)) {
        skills.push(skill);
      }

    });

    let atsScore = Math.min(100, skills.length * 10 + 20);

    let readiness = Math.min(100, skills.length * 8 + 15);

    let missingSkills = [];

    const requiredSkills = [
      "react",
      "node",
      "mongodb",
      "git",
      "github",
      "tailwind",
      "sql",
    ];

    requiredSkills.forEach((skill) => {

      if (!skills.includes(skill)) {
        missingSkills.push(skill);
      }

    });

    let role = "Software Developer";

    if (
      skills.includes("react") &&
      skills.includes("javascript")
    ) {
      role = "Frontend Developer";
    }

    if (
      skills.includes("node") &&
      skills.includes("mongodb")
    ) {
      role = "Full Stack Developer";
    }

    const roadmap = [

      "Build 2 advanced MERN stack projects",

      "Learn Data Structures and Algorithms",

      "Improve resume with measurable achievements",

      "Practice frontend interview questions",

      "Deploy projects on Vercel and Render",

      "Contribute to GitHub consistently",

    ];

    const analysis = `
Resume successfully analyzed.

Technical skills detected:
${skills.join(", ")}

Strengths:
• Technical background detected
• Good potential for placements
• Resume contains technical keywords

Weaknesses:
• Add more projects
• Add certifications
• Improve ATS optimization
• Include GitHub links

Final Recommendation:
Focus on full-stack development and placement preparation.
`;

    res.json({

      atsScore,

      readiness,

      role,

      skills,

      missingSkills,

      roadmap,

      analysis,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

});

module.exports = router;