import express from 'express';
import { getAllProjects, getProjectById, createNewProject, apply, removeApplication, submitPR, getStatus, startProject } from '../controllers/projectController.js';

const router = express.Router();

// use() auth middleware

router.get(`/`, getAllProjects);
router.get(`/:projectid`, getProjectById);
router.post(`/`, createNewProject);

// utility routes (delete etc)
router.get(`/:projectid/apply`, apply);
router.get(`/:projectid/remove/:freelancerid`, removeApplication);
router.post(`/:projectid/submitPR`, submitPR);
router.get(`/:projectid/status`, getStatus);  // route for webhook stuff

router.get(`/:projectid/start`, startProject) // only owner. deploy sc

export default router;
