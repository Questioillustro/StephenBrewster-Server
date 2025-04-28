import {CodeGenModel, ICodeGen} from "../models/CodeGen";

export const findById = async (id: string): Promise<ICodeGen | null> => {
  return CodeGenModel.findOne({ _id: id });
};

export const getAll = async(): Promise<ICodeGen[] | null> => {
  return CodeGenModel.find({});
}

export const search = async(): Promise<ICodeGen[] | null> => {
  return CodeGenModel.find({});
}

export const save = async (codeGen: ICodeGen): Promise<ICodeGen> => {
  const codeGenDb = new CodeGenModel(codeGen);
  return codeGenDb.save();
}
