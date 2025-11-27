import {
  addDepartmentService,
  addMemberDeptService,
  allDepartmentService,
  deleteDeptService,
  removeMemberDeptService,
  singleDepartmentService,
  updateDepartmentService,
} from "../services/department.service.js";

export const addDepartmentController = async (req, res) => {
  try {
    const result = await addDepartmentService(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const allDepartmentController = async (req, res) => {
  try {
    const result = await allDepartmentService(req.body);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const singleDepartmentController = async (req, res) => {
  try {
    const result = await singleDepartmentService(req.params);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const updateDepartmentController = async (req, res) => {
  try {
    const result = await updateDepartmentService(req.params, req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const addMemberDeptController = async (req, res) => {
  try {
    const result = await addMemberDeptService(req.params, req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const deleteDeptController = async (req, res) => {
  try {
    const result = await deleteDeptService(req.params);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const removeMemberDeptController = async (req, res) => {
  try {
    const result = await removeMemberDeptService(req.params);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};
