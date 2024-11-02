// routes/projectRoutes.js
import express from 'express';
import {
    getAllProjects,
    getProjectById,
    createNewProject,
    apply,
    removeApplication,
    submitPR,
    getStatus,
    startProject,
} from '../controllers/projectController.js';
import { getLoggedInUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Apply the `getLoggedInUser` middleware where logged-in user access is needed
router.get(`/`, getAllProjects);
router.get(`/:projectid`, getLoggedInUser, getProjectById);
router.post(`/`, getLoggedInUser, createNewProject);

// Utility routes with logged-in user check
router.get(`/:projectid/apply`, getLoggedInUser, apply);
router.get(`/:projectid/remove/:freelancerid`, getLoggedInUser, removeApplication);
router.post(`/:projectid/submitPR`, getLoggedInUser, submitPR);
router.get(`/:projectid/status`, getStatus);

router.get(`/:projectid/start`, getLoggedInUser, startProject);

export default router;
