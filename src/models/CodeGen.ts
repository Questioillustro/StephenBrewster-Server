import mongoose, { Schema } from 'mongoose';
import { LlmOptionType } from './Prompt';

export interface ICodeGen {
  _id?: string;
  request: ICodeGenRequest;
  response: ICodeGenResponse;
  notes?: string[];
}

export interface ICodeGenSaveRequest {
  codeGen: ICodeGen;
}

export interface ICodeGenRequest {
  framework?: FrameworkType;
  specialRequests?: string[];
  codeExample?: string;
  uiLibrary?: string;
  prompt: string;
  llmOption: LlmOptionType;
}

export interface ICodeObject {
  fileName: string;
  content: string;
}

export interface ICodeGenResponse {
  code: ICodeObject[];
}

export type FrameworkType = 'React' | 'Angular' | 'Vue' | 'Javascript';

// Mongoose Schemas
const CodeObjectSchema = new Schema<ICodeObject>({
  fileName: { type: String, required: true },
  content: { type: String, required: true }
});

const CodeGenResponseSchema = new Schema<ICodeGenResponse>({
  code: { type: [CodeObjectSchema], required: true }
});

const CodeGenRequestSchema = new Schema<ICodeGenRequest>({
  framework: {
    type: String,
    enum: ['React', 'Angular', 'Vue', 'Javascript'],
    required: false
  },
  specialRequests: {
    type: [String],
    required: false
  },
  codeExample: {
    type: String,
    required: false
  },
  uiLibrary: {
    type: String,
    required: false
  },
  prompt: {
    type: String,
    required: true
  },
  llmOption: {
    type: String,
    required: true
  },
})

const CodeGenSchema = new Schema<ICodeGen>({
  request: {
    type: CodeGenRequestSchema,
    required: true
  },
  response: {
    type: CodeGenResponseSchema,
    required: true
  },
  notes: {
    type: [String],
    required: false,
    default: []
  }
});

// Create Mongoose model
export const CodeGenModel = mongoose.model<ICodeGen>('CodeGen', CodeGenSchema);