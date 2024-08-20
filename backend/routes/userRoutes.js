import express from "express"
const router = express.Router()
import { createUser,
    loginUser, 
    logoutCurrentUser, 
    getAllUsers, 
    getCurrentUserProfile,
    updateCurrentUser,
    deletUserById,
    getUserBydId,
    upDateUserById
} from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.route('/').post(createUser).get(authenticate, authorizeAdmin, getAllUsers);
router.post("/auth", loginUser);
router.post('/logout', logoutCurrentUser);
router.route('/profile')
    .get(authenticate, getCurrentUserProfile)
    .put(authenticate, updateCurrentUser);

// ADMIN ROUTES
router.route('/:id')
    .delete(authenticate, authorizeAdmin, deletUserById)
    .get(authenticate, authorizeAdmin, getUserBydId)
    .put(authenticate, authorizeAdmin, upDateUserById)
// id is parameter passed inside req object

export default router;