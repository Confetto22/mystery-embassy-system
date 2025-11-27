import {
  checkinService,
  filteredAttendanceService,
  getAttendanceService,
  singleAttendanceService,
} from "../services/attendance.service.js";

export const checkinController = async (req, res) => {
  try {
    const result = await checkinService(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const getAttendanceController = async (req, res) => {
  try {
    const result = await getAttendanceService();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const filteredAttendanceController = async (req, res) => {
  try {
    const result = await filteredAttendanceService(req.query);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const singleAttendanceController = async (req, res) => {
  try {
    const result = await singleAttendanceService(req.params);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};
