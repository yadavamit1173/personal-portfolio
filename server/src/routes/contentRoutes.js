import { Router } from 'express';

import {
  getCodingAchievements,
  getEducation,
  getExperience,
  getPortfolioContent,
  getProfile,
  getProjects,
  getSkills,
} from '../controllers/contentController.js';

const router = Router();

router.get('/', getPortfolioContent);
router.get('/profile', getProfile);
router.get('/skills', getSkills);
router.get('/experience', getExperience);
router.get('/projects', getProjects);
router.get('/education', getEducation);
router.get('/coding-achievements', getCodingAchievements);

export default router;
