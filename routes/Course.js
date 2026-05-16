// Import the required modules
const express = require("express");
const router = express.Router();

/* =====================================================
   CONTROLLERS
===================================================== */

// Course Controllers
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  getFullCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
} = require("../controllers/Course");

// Category Controllers
const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
  deleteCategory,
} = require("../controllers/Category");

// Section Controllers
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

// Sub Section Controllers
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/Subsection");

// Rating Controllers
const {
  createRating,
  getAverageRating,
  getAllRating,
  getCourseReviews,
  hasUserReviewedCourse,
} = require("../controllers/RatingAndReview");

// Course Progress
const {
  updateCourseProgress,
  getProgressPercentage,
} = require("../controllers/courseProgress");

/* =====================================================
   MIDDLEWARES
===================================================== */

const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middlewares/auth");

/* =====================================================
   COURSE ROUTES
===================================================== */

// CREATE COURSE
router.post(
  "/createCourse",
  auth,
  isAdmin,
  createCourse
);

// ADD SECTION
router.post(
  "/addSection",
  auth,
  isAdmin,
  createSection
);

// UPDATE SECTION
router.post(
  "/updateSection",
  auth,
  isAdmin,
  updateSection
);

// DELETE SECTION
router.post(
  "/deleteSection",
  auth,
  isAdmin,
  deleteSection
);

// ADD SUB SECTION
router.post(
  "/addSubSection",
  auth,
  isAdmin,
  createSubSection
);

// UPDATE SUB SECTION
router.post(
  "/updateSubSection",
  auth,
  isAdmin,
  updateSubSection
);

// DELETE SUB SECTION
router.post(
  "/deleteSubSection",
  auth,
  isAdmin,
  deleteSubSection
);

// GET ALL COURSES
router.get(
  "/getAllCourses",
  getAllCourses
);

// GET COURSE DETAILS
router.post(
  "/getCourseDetails",
  getCourseDetails
);

// GET FULL COURSE DETAILS
router.post(
  "/getFullCourseDetails",
  auth,
  getFullCourseDetails
);

// EDIT COURSE
router.post(
  "/editCourse",
  auth,
  isAdmin,
  editCourse
);

// GET ADMIN COURSES
router.get(
  "/getInstructorCourses",
  auth,
  isAdmin,
  getInstructorCourses
);

// DELETE COURSE
router.delete(
  "/deleteCourse",
  auth,
  isAdmin,
  deleteCourse
);

/* =====================================================
   COURSE PROGRESS
===================================================== */

router.post(
  "/updateCourseProgress",
  auth,
  isStudent,
  updateCourseProgress
);

router.post(
  "/getProgressPercentage",
  auth,
  isStudent,
  getProgressPercentage
);

/* =====================================================
   REVIEW ROUTES
===================================================== */

router.post(
  "/createRating",
  auth,
  isStudent,
  createRating
);

router.get(
  "/getAverageRating",
  getAverageRating
);

router.get(
  "/getReviews",
  getAllRating
);

router.get(
  "/getCourseReviews/:courseId",
  getCourseReviews
);

router.get(
  "/has-reviewed/:courseId",
  auth,
  hasUserReviewedCourse
);

/* =====================================================
   CATEGORY ROUTES
===================================================== */

// CREATE CATEGORY
router.post(
  "/createCategory",
  auth,
  isAdmin,
  createCategory
);

// GET ALL CATEGORIES
router.get(
  "/showAllCategories",
  showAllCategories
);

// CATEGORY PAGE DETAILS
router.post(
  "/getCategoryPageDetails",
  categoryPageDetails
);

// DELETE CATEGORY
router.delete(
  "/deleteCategory/:categoryId",
  auth,
  isAdmin,
  deleteCategory
);

/* =====================================================
   EXPORT
===================================================== */

module.exports = router;
