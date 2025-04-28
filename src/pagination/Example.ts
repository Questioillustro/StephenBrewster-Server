import { Request, Response } from 'express';
import { Document, Model } from 'mongoose';

// Interface for pagination query parameters
interface PaginationQuery {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Interface for pagination response - use generic type parameter without extending Document
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Update the function to handle the lean result properly
async function paginate<T extends Document, L = Omit<T, keyof Document>>(
  model: Model<T>,
  req: Request<{}, {}, {}, PaginationQuery>,
  res: Response
): Promise<void> {
  try {
    // Extract query parameters with defaults
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '10', 10);
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder || 'desc';

    // Validate parameters
    if (page < 1 || limit < 1) {
      res.status(400).json({ error: 'Invalid page or limit parameters' });
      return;
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Create sort object
    const sort: { [key: string]: 1 | -1 } = {
      [sortBy]: sortOrder === 'asc' ? 1 : -1
    };

    // Execute queries in parallel
    const [documents, total] = await Promise.all([
      model.find()
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      model.countDocuments().exec()
    ]);

    // Calculate total pages
    const totalPages = Math.ceil(total / limit);

    // Prepare response with the correct type
    const response: PaginatedResponse<L> = {
      data: documents as L[], // Type assertion here
      total,
      page,
      limit,
      totalPages
    };

    res.json(response);
  } catch (error) {
    console.error('Pagination error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}