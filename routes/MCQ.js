const express =
 require("express");

const router =
 express.Router();

// Import MCQ Controllers

const {
  createMCQ,
  getMCQsByCourse,
  getMCQsForStudent,
  updateMCQ,
  deleteMCQ,
  validateAnswers
} = require(
 "../controllers/MCQController"
);
const {
  auth
} = require(
 "../middlewares/auth"
);

// ==========================================
// CREATE MCQ
// ==========================================

router.post(
  "/create",
   auth,
  createMCQ
);

// ==========================================
// GET MCQs
// ==========================================

router.get(
  "/course/:courseId/:subsectionId?",
   auth,
  getMCQsByCourse
);

router.get(
  "/student/course/:courseId/:subsectionId?",
   auth,
  getMCQsForStudent
);

// ==========================================
// UPDATE MCQ
// ==========================================

router.put(
  "/:mcqId",
   auth,
  updateMCQ
);

// ==========================================
// DELETE MCQ
// ==========================================

router.delete(
  "/:mcqId",
   auth,
  deleteMCQ
);

// ==========================================
// VALIDATE ANSWERS
// ==========================================

router.post(
  "/validate/:courseId/:subsectionId?",
   auth,
  validateAnswers
);

module.exports =
 router;