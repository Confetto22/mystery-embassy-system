import { Router } from "express";
import {
  addEventController,
  allEventsController,
  deleteEventController,
  filteredEventsController,
  singleEventController,
  upcomingEventsController,
  updateEventController,
} from "../controllers/event.controller.js";

const router = Router();

router.post("/new", addEventController);
router.get("/all", allEventsController);
router.get("/filter", filteredEventsController);
router.get("/upcoming", upcomingEventsController);
router.get("/:id", singleEventController);
router.put("/:id", updateEventController);
router.delete("/:id", deleteEventController);

export default router;
