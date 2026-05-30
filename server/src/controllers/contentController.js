import {
  codingAchievements,
  education,
  experience,
  profile,
  projects,
  skills,
} from '../data/portfolioContent.js';

export function getProfile(_req, res) {
  res.status(200).json(profile);
}

export function getSkills(_req, res) {
  res.status(200).json(skills);
}

export function getExperience(_req, res) {
  res.status(200).json(experience);
}

export function getProjects(_req, res) {
  res.status(200).json(projects);
}

export function getEducation(_req, res) {
  res.status(200).json(education);
}

export function getCodingAchievements(_req, res) {
  res.status(200).json(codingAchievements);
}

export function getPortfolioContent(_req, res) {
  res.status(200).json({
    profile,
    skills,
    experience,
    projects,
    education,
    codingAchievements,
  });
}
