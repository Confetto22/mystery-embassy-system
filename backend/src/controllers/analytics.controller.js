import { analyticsService } from "../services/analytics.service.js";

export const analyticsController = async (req, res) => {
  try {
    const result = await analyticsService();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};
