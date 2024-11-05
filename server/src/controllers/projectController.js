import Project from '../models/projectModel.js';
import User from '../models/userModel.js';
import { deploySmartContract, triggerSmartContract } from '../utils/web3Utils.js';
import { isPRaccepted, findSubmitter } from '../utils/githubUtils.js';

// Get all projects
export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects.' });
    }
};

// Get project by ID
export const getProjectById = async (req, res) => {
    const { projectid } = req.params;

    try {
        const project = await Project.findById(projectid).populate('freelancers');
        if (!project) return res.status(404).json({ message: 'Project not found.' });

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching project details.' });
    }
};

// Create new project
export const createNewProject = async (req, res) => {
    const { issueId, name, description, deadline, applicationDate, amountInWei } = req.body;
    // const owner = req.session.userId;  // Assuming req.session.userId is the logged-in user [check]
    const owner = req.user;

    try {
        const newProject = new Project({
            issueId,
            name,
            description,
            deadline,
            applicationDate,
            owner: req.user._id,  // Store the owner as the current logged-in user
            freelancers: [],
            prURLs: [],
            amountInWei,
            status: 'not_started',
        });

        await newProject.save();
        res.status(201).json({ message: 'Project created successfully.', project: newProject });
    } catch (error) {
        console.log(error);
        console.log(error);
        res.status(500).json({ message: 'Error creating project.' });
    }
};

// Apply to a project (add freelancer)
export const apply = async (req, res) => {
    const { projectid } = req.params;
    const freelancerId = req.user._id;

    try {
        const project = await Project.findById(projectid);
        if (!project) return res.status(404).json({ message: 'Project not found.' });

        console.log(`freelancer = ${freelancerId}`)

        console.log(`freelancer = ${freelancerId}`)

        const freelancer = await User.findById(freelancerId);
        if (!freelancer) return res.status(404).json({ message: 'Freelancer not found.' });

        // Check if the current date is before or on the application deadline
        const currentDate = new Date();
        if (currentDate > project.applicationDate) {
            return res.status(400).json({ message: 'Application deadline has passed.' });
        }

        // Check if freelancer has already applied
        if (project.freelancers.includes(freelancerId)) {
            return res.status(400).json({ message: 'Freelancer has already applied.' });
        }

        project.freelancers.push(freelancerId);
        await project.save();

        res.status(200).json({ message: 'Freelancer added to the project.', project });
    } catch (error) {
        res.status(500).json({ message: 'Error applying to project.' });
    }
};

// Remove application (remove freelancer) - only the owner can remove
export const removeApplication = async (req, res) => {
    const { projectid, freelancerid } = req.params;
    const ownerId = req.user._id; // check 

    try {
        const project = await Project.findById(projectid);
        if (!project) return res.status(404).json({ message: 'Project not found.' });

        // Ensure only the owner can remove freelancers
        if (String(project.owner) !== String(ownerId)) {
            return res.status(403).json({ message: 'Only the project owner can remove freelancers.' });
        }

        const freelancerIndex = project.freelancers.indexOf(freelancerid);
        if (freelancerIndex === -1) {
            return res.status(400).json({ message: 'Freelancer not found in project.' });
        }

        project.freelancers.splice(freelancerIndex, 1);
        await project.save();

        res.status(200).json({ message: 'Freelancer removed from the project.' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing freelancer from project.' });
    }
};

// Submit PR for the project - only the assigned freelancer can submit a PR
export const submitPR = async (req, res) => {
    const { projectid } = req.params;
    const { prURL } = req.body;
    const freelancerId = req.user._id;

    try {
        const project = await Project.findById(projectid);
        if (!project) return res.status(404).json({ message: 'Project not found.' });

        // Ensure the freelancer is part of the project
        if (!project.freelancers.includes(freelancerId)) {
            return res.status(403).json({ message: 'Only assigned freelancers can submit PRs.' });
        }

        // Add the PR ID to the project
        project.prURLs.push(prURL);
        await project.save();

        res.status(200).json({ message: 'PR submitted successfully.', project });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting PR.' });
    }
};

export const startProject = async (req, res) => {
    const { projectid } = req.params;
    const ownerId = req.user._id; // check

    try {
        const project = await Project.findById(projectid);
        if (!project) return res.status(404).json({ message: 'Project not found.' });

        // Ensure only the owner can start the project
        if (String(project.owner) !== String(ownerId)) {
            return res.status(403).json({ message: 'Only the project owner can start the project.' });
        }

        // Check if the current date is after the application deadline
        const currentDate = new Date();
        if (currentDate <= project.applicationDate) {
            return res.status(400).json({ message: 'Cannot start the project before the application deadline.' });
        }

        // Update project status to "started"
        project.status = 'unresolved';

        const smartContractAddress = deploySmartContract(projectid); // id of smart contract
        project.smartContractAddress = smartContractAddress;
        await project.save();

        res.status(200).json({ message: 'Project started successfully.', project });
    } catch (error) {
        res.status(500).json({ message: 'Error starting the project.' });
    }
}

// Check project status (resolved/unresolved)
export const getStatus = async (req, res) => {
    const { projectid } = req.params;

    try {
        const project = await Project.findById(projectid);
        if (!project) return res.status(404).json({ message: 'Project not found.' });
        if (project.status == "resolved") {
            triggerSmartContractHelper(projectid);
        }
        res.status(200).json({ status: project.status });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching project status.' });
    }
};

const triggerSmartContractHelper = async (projectid) => {
    try {
        const project = await Project.findById(projectid);
        if (!project) {
            console.error(`Project with id ${projectid} not found.`);
            return;
        }
        const freelancer = null;

        // Check for the accepted PR
        for (const pr in project.prURLs) {
            if (await isPRaccepted(pr)) {
                freelancer = findSubmitter(pr);
            }
        }

        if (!freelancer) {
            console.error('Submitter address not found.');
            return;
        }

        // Call triggerSmartContract with the project id and submitter's address
        await triggerSmartContract(projectid, freelancer);
        console.log(`TriggerSmartContract called for project ${projectid} and payee ${freelancer}`);
    } catch (error) {
        console.error('Error triggering smart contract helper:', error);
    }
};