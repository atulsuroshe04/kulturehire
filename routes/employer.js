const express = require("express");
const router = express.Router();
const DashboardController = require("../controllers/employer/DashboardController");
const ProfileController = require("../controllers/employer/ProfileController");
const authMiddleware = require("../middlewares/auth");
const localeMiddleware = require("../middlewares/locale");

router.get(
    "/dashboard/:language(en|gr|ar)",
    [localeMiddleware.localized, authMiddleware.isAuthenticated],
    DashboardController.employerDashboard,
);
router.get(
    "/profile/:language(en|gr|ar)",
    [localeMiddleware.localized, authMiddleware.isAuthenticated],
    ProfileController.loadProfile,
);

router.get(
    "/profile/update/:language(en|gr|ar)",
    [localeMiddleware.localized, authMiddleware.isAuthenticated],
    ProfileController.loadProfileUpdate,
);

module.exports = router;
