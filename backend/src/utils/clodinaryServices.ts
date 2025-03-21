import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import cloudinary from "../config/cloudinary";


const extractPublicIdFromUrl = (secureUrl: string): string | null => {
    const regex = /\/image\/upload\/.*?\/(.*?)\.(jpg|jpeg|png|gif|webp|bmp)/;
    const match = secureUrl.match(regex);
  
    if (match && match[1]) {
      return match[1]; 
    } else {
      console.error('Could not extract public_id from URL');
      return null;
    }
  }


  export const deleteImageFromCloudinary = async (imageUrl: string): Promise<boolean> => {
    try {
        const publicId = extractPublicIdFromUrl(imageUrl)
        if(!publicId){
            console.log('cannot extract public_id from url')
            return false
        }
      const result = await cloudinary.uploader.destroy(publicId);
      
      if (result.result === 'ok') {
        console.log(`Image with public_id ${publicId} deleted successfully.`);
        return true;
      } else {
        console.error(`Failed to delete image with public_id ${publicId}.`, result);
        return false;
      }
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error);
      return false;
    }
  };



export const uploadImageToCloudinary = async (
  buffer: Buffer,
  folder: string
): Promise<string | null> => {
  try {
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: `Tutoriam/${folder}`,
        },
        (
          error: UploadApiErrorResponse | undefined,
          result: UploadApiResponse | undefined
        ) => {
          if (result) {
            resolve(result);
            return;
          } else if (error) {
            reject(new Error(`Cloudinary upload failed: ${error.message}`));
          }
        }
      );

      if (buffer) {
        uploadStream.end(buffer);
      } else {
        reject(new Error("No image buffer provided."));
      }
    });

    return result ? result.secure_url : null;
  } catch (error: any) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error(`Error uploading image: ${error.message}`);
  }
};


