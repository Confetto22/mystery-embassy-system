import { Router } from "express";
import {
  addDepartmentController,
  addMemberDeptController,
  allDepartmentController,
  deleteDeptController,
  removeMemberDeptController,
  singleDepartmentController,
  updateDepartmentController,
} from "../controllers/department.controller.js";

const router = Router();
router.post("/new", addDepartmentController);
router.get("/all", allDepartmentController);
router.get("/:id", singleDepartmentController);
router.put("/:id", updateDepartmentController);
router.post("/:id/add-member", addMemberDeptController);
router.delete("/:id", deleteDeptController);
router.delete("/:deptId/:memberId", removeMemberDeptController);

export default router;
