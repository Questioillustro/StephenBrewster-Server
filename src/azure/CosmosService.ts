import { BlobServiceClient } from '@azure/storage-blob';
import logger from '../config/logger';

const azure_account_key = process.env.AZURE_ACCOUNT_KEY;
const azure_account_name = process.env.AZURE_ACCOUNT_NAME;

const blobServiceClient = BlobServiceClient.fromConnectionString(
  `DefaultEndpointsProtocol=https;AccountName=${azure_account_name};AccountKey=${azure_account_key};EndpointSuffix=core.windows.net`,
);
const containerClient = blobServiceClient.getContainerClient('cyoa');

export const uploadImage = async (base64Image: string, metadata: any) => {
  try {
    const imageBuffer = Buffer.from(base64Image, 'base64');
    const blobName = `image_${Date.now()}.png`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(imageBuffer);

    return blockBlobClient.url;
  } catch (error) {
    logger.error(error);
  }
};
