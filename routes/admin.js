const express = require('express');

const router = express.Router();
const DashboardController = require('../controllers/admin/DashboardController');
const SkillsController = require('../controllers/admin/SkillController');
const HardSkillsController = require('../controllers/admin/HardskillController');
const ProgramController = require('../controllers/admin/ProgramController');
const EmployerController = require('../controllers/admin/EmployerController');
const CandidatesController = require('../controllers/admin/CandidateController');
const ToolsController = require('../controllers/admin/ToolsController');
const SimulationController = require('../controllers/admin/SimulationController');
const ReportController = require('../controllers/admin/ReportController');
const authMiddleware = require('../middlewares/auth');
const localeMiddleware = require('../middlewares/locale');
const fileUploadMiddleware = require('../middlewares/fileUpload');
const uploadSimulationAttchmentMiddleware = require('../middlewares/uploadSimulationAttchment');

router.get(
  '/dashboard/:language(en|gr|ar)',
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  DashboardController.adminDashboard,
);

// soft skills route
router.get(
  '/skills/:language(en|gr|ar)',
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  SkillsController.skillsList,
);
router.get(
  '/skills/add/:language(en|gr|ar)',
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  SkillsController.loadAddSkill,
);
router.get(
  '/skills/edit/:id/:language(en|gr|ar)',
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  SkillsController.loadEditSkill,
);
router.post('/skills/save', SkillsController.skillsSave);
router.post('/skills/update/:id', SkillsController.skillsUpdate);

// soft skills route
router.get(
  '/hard-skills/:language(en|gr|ar)',
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  HardSkillsController.hardSkillsList,
);
router.get(
  '/hard-skills/add/:language(en|gr|ar)',
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  HardSkillsController.loadAddHardSkill,
);
router.get(
  '/hard-skills/edit/:id/:language(en|gr|ar)',
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  HardSkillsController.loadEditHardSkill,
);
router.post('/hard-skills/save', HardSkillsController.hardSkillsSave);
router.post('/hard-skills/update/:id', HardSkillsController.hardSkillsUpdate);

// programs route
router.get(
  '/programs/:language(en|gr|ar)',
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  ProgramController.programList,
);
router.get(
  '/programs/add/:language(en|gr|ar)',
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  ProgramController.loadAddProgram,
);
router.get(
  '/programs/edit/:id/:language(en|gr|ar)',
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  ProgramController.loadEditProgram,
);
router.post(
  '/programs/save/:language(en|gr|ar)',
  ProgramController.programSave,
);
router.post(
  '/programs/update/:id/:language(en|gr|ar)',
  ProgramController.programUpdate,
);

// Tools route
router.get(
  '/tools/:language(en|gr|ar)',
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  ToolsController.toolsList,
);
router.get(
  '/tools/add/:language(en|gr|ar)',
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  ToolsController.loadAddTool,
);
router.get(
  '/tools/edit/:id/:language(en|gr|ar)',
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  ToolsController.loadEditTool,
);
router.post('/tools/save', ToolsController.toolsSave);
router.post('/tools/update/:id', ToolsController.toolsUpdate);

// Candidates routes
router.get(
  '/candidates/:language(en|gr|ar)',
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  CandidatesController.candidatesList,
);

router.get(
  '/candidate/create/:language(en|gr|ar)',
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  CandidatesController.addCandidate,
);

router.post(
  '/candidate/create/:language(en|gr|ar)',
  [
    localeMiddleware.localized,
    authMiddleware.isAuthenticated,
    fileUploadMiddleware.uploadFile,
  ],
  CandidatesController.storeCandidate,
);

router.get(
  '/candidate/edit/:id/:language(en|gr|ar)',
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  CandidatesController.editCandidate,
);

router.post(
  '/candidate/edit/:id/:language(en|gr|ar)',
  [
    fileUploadMiddleware.uploadFile,
    localeMiddleware.localized,
    authMiddleware.isAuthenticated,
  ],
  CandidatesController.updateCandidate,
);

// soft skills route
router.get(
  '/employer/:language(en|gr|ar)',
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  EmployerController.employerList,
);
router.get(
  '/employer/add/:language(en|gr|ar)',
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  EmployerController.loadAddEmployer,
);
router.get(
  '/employer/edit/:id/:language(en|gr|ar)',
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  EmployerController.loadEditEmployer,
);
router.post(
  '/employer/save/:language(en|gr|ar)',
  EmployerController.employerSave,
);
router.post(
  '/employer/update/:id/:language(en|gr|ar)',
  EmployerController.employerUpdate,
);

// simulations routes
router.get(
  '/simulations/:language(en|gr|ar)',
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  SimulationController.simulationsList,
);

router.get(
  '/simulations/add/:language(en|gr|ar)',
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  SimulationController.loadAddSimulation,
);

router.post(
  '/simulations/save/:language(en|gr|ar)',
  [
    localeMiddleware.localized,
    authMiddleware.isAuthenticated,
    uploadSimulationAttchmentMiddleware.uploadFiles,
  ],
  SimulationController.saveSimulation,
);

router.get(
  '/simulations/view/:id/:language(en|gr|ar)',
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  SimulationController.viewSimulation,
);

router.get('/reports/employer-actions/:language(en|gr|ar)',
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  ReportController.employerActions
);

module.exports = router;
