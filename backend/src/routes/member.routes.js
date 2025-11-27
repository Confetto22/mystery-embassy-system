import { Router } from "express";
import {
  addMemberController,
  allMembersController,
  deleteMemberController,
  filteredMembersController,
  singleMemberController,
  updateMemberController,
} from "../controllers/member.controller.js";

const router = Router();

router.post("/new", addMemberController);
router.get("/all", allMembersController);
router.get("/filter", filteredMembersController);
router.get("/:id", singleMemberController);
router.put("/:id", updateMemberController);
router.delete("/:id", deleteMemberController);
export default router;
