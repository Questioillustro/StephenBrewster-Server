import {getAll, save} from "../services/CodeGenService";

export const saveCodeGen = async (req: any, res: any) => {
  try {
    const codeGen = await save(req.body);
    res.status(200).json(codeGen);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllCodeGen = async (req: any, res: any) => {
  try {
    const codeGen = await getAll();
    res.status(200).json(codeGen);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};