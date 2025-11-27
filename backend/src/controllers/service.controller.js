import {
  addServiceService,
  allServicesService,
  deleteServiceService,
  singleServiceService,
  updateServiceService,
} from "../services/service.service.js";

export const addServiceController = async (req, res) => {
  try {
    const result = await addServiceService(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const allServicesController = async (req, res) => {
  try {
    const result = await allServicesService();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const singleServiceController = async (req, res) => {
  try {
    const result = await singleServiceService(req.params);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const updateServiceController = async (req, res) => {
  try {
    const result = await updateServiceService(req.params, req.body);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const deleteServiceController = async (req, res) => {
  try {
    const result = await deleteServiceService(req.params);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};