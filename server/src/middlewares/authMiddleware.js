// User authentication (cookie-parsing) middleware
import User from '../models/userModel.js';

export const getLoggedInUser = async (req, res, next) => {
    try {
        req.session.userId = "Aradhya2708";
        if (!req.session || !req.session.userId) {
            return res.status(401).json({ message: 'Unauthorized. No user session found.' });
        }

        const user = await User.findOne({ githubId: req.session.userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        req.user = user; // Attach the user object to the request
        console.log("req.user._id = ", req.user._id);
        next(); // Pass control to the next middleware or route handler
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user information.' });
    }
};
