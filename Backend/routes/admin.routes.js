const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller.js");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../middleware/auth.middleware.js");

// Authentication route
router.post("/login", adminController.adminLogin);
router.post(
  "/",
  authenticateToken,
  authorizeAdmin(["superadmin"]),
  adminController.addAdmin
);

// Protected routes requiring authentication and admin privileges
router.get(
  "/",
  authenticateToken,
  authorizeAdmin(["superadmin", "admin"]),
  adminController.getAdmins
);
router.get(
  "/:username",
  authenticateToken,
  authorizeAdmin(["superadmin", "admin"]),
  adminController.getAdmin
);
router.put(
  "/:username",
  authenticateToken,
  authorizeAdmin(["superadmin"]),
  adminController.updateAdmin
);
router.delete(
  "/:username",
  authenticateToken,
  authorizeAdmin(["superadmin"]),
  adminController.deleteAdmin
);

module.exports = router;
