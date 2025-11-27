import {
  addEventService,
  allEventsService,
  deleteEventService,
  filterEventsService,
  singleEventService,
  upcomingEventsService,
  updateEventService,
} from "../services/event.service.js";

export const addEventController = async (req, res) => {
  try {
    const result = await addEventService(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const allEventsController = async (req, res) => {
  try {
    const result = await allEventsService();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const filteredEventsController = async (req, res) => {
  try {
    const result = await filterEventsService(req.query);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const singleEventController = async (req, res) => {
  try {
    const result = await singleEventService(req.params);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const upcomingEventsController = async (req, res) => {
  try {
    const result = await upcomingEventsService();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const updateEventController = async (req, res) => {
  try {
    const result = await updateEventService(req.params, req.body);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const deleteEventController = async (req, res) => {
  try {
    const result = await deleteEventService(req.params);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};
