import { Router } from "express";
import {
  checkinController,
  filteredAttendanceController,
  getAttendanceController,
  singleAttendanceController,
} from "../controllers/attendance.controller.js";

const router = Router();

router.post("/checkin", checkinController);
router.get("/all", getAttendanceController);
router.get("/filter", filteredAttendanceController);
router.get("/:personId", singleAttendanceController);
export default router;
