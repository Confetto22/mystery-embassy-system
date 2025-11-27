import {
  addMemberService,
  allMemberService,
  deleteteMemberService,
  filterMembersService,
  singleMemberService,
  updateMemberService,
} from "../services/member.service.js";

export const addMemberController = async (req, res) => {
  try {
    const result = await addMemberService(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const allMembersController = async (req, res) => {
  try {
    const result = await allMemberService();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const filteredMembersController = async (req, res) => {
  try {
    const result = await filterMembersService(req.query);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const singleMemberController = async (req, res) => {
  try {
    const result = await singleMemberService(req.params);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const updateMemberController = async (req, res) => {
  try {
    const result = await updateMemberService(req.params, req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const deleteMemberController = async (req, res) => {
  try {
    const result = await deleteteMemberService(req.params);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};
