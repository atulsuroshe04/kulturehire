const express = require('express');

const router = express.Router();
const DashboardController = require('../controllers/employer/DashboardController');
const ProfileController = require('../controllers/employer/ProfileController');
const SearchController = require('../controllers/employer/SearchController');
const authMiddleware = require('../middlewares/auth');
const localeMiddleware = require('../middlewares/locale');

router.get(
    '/dashboard/:language(en|gr|ar)',
    [localeMiddleware.localized, authMiddleware.isAuthenticated],
    DashboardController.employerDashboard,
);
router.get(
    '/profile/:language(en|gr|ar)',
    [localeMiddleware.localized, authMiddleware.isAuthenticated],
    ProfileController.loadProfile,
);

router.get(
    '/profile/update/:language(en|gr|ar)',
    [localeMiddleware.localized, authMiddleware.isAuthenticated],
    ProfileController.loadProfileUpdate,
);

router.get(
    '/search-candidates/:language(en|gr|ar)',
    [localeMiddleware.localized, authMiddleware.isAuthenticated],
    SearchController.searchCandidate,
);

router.get(
    '/simulation/:id/:language(en|gr|ar)',
    [localeMiddleware.localized, authMiddleware.isAuthenticated],
    SearchController.simulatinDetails,
);

router.post('/filter-candidates',
    [localeMiddleware.localized, authMiddleware.isAuthenticated],
    SearchController.filterCandidates);

router.post('/view-phone',
    [localeMiddleware.localized, authMiddleware.isAuthenticated],
    SearchController.viewPhoneNumber);

module.exports = router;
