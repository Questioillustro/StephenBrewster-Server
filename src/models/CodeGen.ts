import mongoose, { Schema } from 'mongoose';
import { LlmOptionType } from './Prompt';

// Define TypeScript interfaces
export interface ICodeGen {
  _id?: string;
  request: ICodeGenSaveRequest;
  response: ICodeGenResponse;
  notes?: string[];
}

export interface ICodeGenSaveRequest {
  framework?: FrameworkType;
  specialRequests?: string[];
  codeExample?: string;
  uiLibrary?: string;
  prompt: string;
  llmOption: LlmOptionType;
  code: ICodeGenResponse;
}

export interface ICodeGenObject {
  fileName: string;
  content: string;
}

export interface ICodeGenResponse {
  code: ICodeGenObject[];
}

export type FrameworkType = 'React' | 'Angular' | 'Vue' | 'Javascript';

// Mongoose Schemas
const CodeGenObjectSchema = new Schema<ICodeGenObject>({
  fileName: { type: String, required: true },
  content: { type: String, required: true }
});

const CodeGenResponseSchema = new Schema<ICodeGenResponse>({
  code: { type: [CodeGenObjectSchema], required: true }
});

const CodeGenSaveRequestSchema = new Schema<ICodeGenSaveRequest>({
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
  code: {
    type: CodeGenResponseSchema,
    required: true
  }
});

const CodeGenSchema = new Schema<ICodeGen>({
  request: {
    type: CodeGenSaveRequestSchema,
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