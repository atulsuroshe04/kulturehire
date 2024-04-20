const express = require("express");
const router = express.Router();
const DashboardController = require("../controllers/admin/DashboardController");
const SoftSkillsController = require("../controllers/admin/SoftskillController");
const HardSkillsController = require("../controllers/admin/HardskillController");
const CandidatesController = require("../controllers/admin/CandidateController");
const ToolsController = require("../controllers/admin/ToolsController");
const authMiddleware = require("../middlewares/auth");
const localeMiddleware = require("../middlewares/locale");
const fileUploadMiddleware = require("../middlewares/fileUpload");


router.get(
  "/dashboard/:language(en|gr|ar)",
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  DashboardController.adminDashboard,
);

// soft skills route
router.get(
  "/soft-skills/:language(en|gr|ar)",
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  SoftSkillsController.softSkillsList,
);
router.get(
  "/soft-skills/add/:language(en|gr|ar)",
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  SoftSkillsController.loadAddSoftSkill,
);
router.get(
  "/soft-skills/edit/:id/:language(en|gr|ar)",
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  SoftSkillsController.loadEditSoftSkill,
);
router.post("/soft-skills/save", SoftSkillsController.softSkillsSave);
router.post("/soft-skills/update/:id", SoftSkillsController.softSkillsUpdate);

// soft skills route
router.get(
  "/hard-skills/:language(en|gr|ar)",
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  HardSkillsController.hardSkillsList,
);
router.get(
  "/hard-skills/add/:language(en|gr|ar)",
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  HardSkillsController.loadAddHardSkill,
);
router.get(
  "/hard-skills/edit/:id/:language(en|gr|ar)",
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  HardSkillsController.loadEditHardSkill,
);
router.post("/hard-skills/save", HardSkillsController.hardSkillsSave);
router.post("/hard-skills/update/:id", HardSkillsController.hardSkillsUpdate);

// Tools route
router.get(
  "/tools/:language(en|gr|ar)",
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  ToolsController.toolsList,
);
router.get(
  "/tools/add/:language(en|gr|ar)",
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  ToolsController.loadAddTool,
);
router.get(
  "/tools/edit/:id/:language(en|gr|ar)",
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  ToolsController.loadEditTool,
);
router.post("/tools/save", ToolsController.toolsSave);
router.post("/tools/update/:id", ToolsController.toolsUpdate);

// Candidates routes
router.get(
  "/candidates/:language(en|gr|ar)",
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  CandidatesController.candidatesList,
);

router.get("/candidate/create/:language(en|gr|ar)",
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  CandidatesController.addCandidate)

router.post("/candidate/create/:language(en|gr|ar)",
  [localeMiddleware.localized, authMiddleware.isAuthenticated, fileUploadMiddleware.uploadFile],
  CandidatesController.storeCandidate)

router.get("/candidate/edit/:id/:language(en|gr|ar)",
  [localeMiddleware.localized, authMiddleware.isAuthenticated],
  CandidatesController.editCandidate)

router.post("/candidate/edit/:id/:language(en|gr|ar)",
  [fileUploadMiddleware.uploadFile, localeMiddleware.localized, authMiddleware.isAuthenticated],
  CandidatesController.updateCandidate)

module.exports = router;
