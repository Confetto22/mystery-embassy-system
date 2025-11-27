import { Router } from "express";
import {
  addServiceController,
  allServicesController,
  deleteServiceController,
  singleServiceController,
  updateServiceController,
} from "../controllers/service.controller.js";

const router = Router();

router.post("/new", addServiceController);
router.get("/all", allServicesController);
router.get("/:id", singleServiceController);
router.put("/:id", updateServiceController);
router.delete("/:id", deleteServiceController);

export default router;
