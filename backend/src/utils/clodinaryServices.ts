import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import cloudinary from "../config/cloudinary";

const extractPublicIdFromUrl = (secureUrl: string): string | null => {
  const regex = /\/image\/upload\/.*?\/(.*?)\.(jpg|jpeg|png|gif|webp|bmp)/;
  const match = secureUrl.match(regex);

  if (match && match[1]) {
    return match[1];
  } else {
    console.error("Could not extract public_id from URL");
    return null;
  }
};

export const deleteImageFromCloudinary = async (imageUrl: string): Promise<boolean> => {
  try {
    const publicId = extractPublicIdFromUrl(imageUrl);
    if (!publicId) {
      console.log("cannot extract public_id from url");
      return false;
    }
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === "ok") {
      console.log(`Image with public_id ${publicId} deleted successfully.`);
      return true;
    } else {
      console.error(`Failed to delete image with public_id ${publicId}.`, result);
      return false;
    }
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    return false;
  }
};

export const extractPublicIdFromVideoUrl = (secureUrl: string): string | null => {
  const regex = /\/video\/(?:upload|authenticated)\/(?:s--.*?--\/)?(?:v\d+\/)?(.*?)(?:\.(mp4|webm|ogg))$/;
  const match = secureUrl.match(regex);

  if (match && match[1]) {
    return match[1];
  } else {
    console.error("Could not extract public_id from URL");
    return null;
  }
};

export const deleteLessonFromCloudinary = async(publicId: string): Promise<boolean> => {
  try {
     const isAuthenticated = publicId.includes("/video/authenticated/");

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "video",
      ...(isAuthenticated ? { type: "authenticated" } : {}),
    });

    if (result.result === "ok") {
      console.log(`Video with public_id ${publicId} deleted successfully.`);
      return true;
    } else {
      console.error(`Failed to delete video with public_id ${publicId}.`, result);
      return false;
    }
  } catch (error) {
     console.error("Error deleting video from Cloudinary:", error);
    return false;
  }
}

export const deleteVideoFromCloudinary = async (videoUrl: string): Promise<boolean> => {
  try {
    const publicId = extractPublicIdFromVideoUrl(videoUrl);
    if (!publicId) {
      console.log("Cannot extract public_id from video URL");
      return false;
    }

    const isAuthenticated = videoUrl.includes("/video/authenticated/");

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "video",
      ...(isAuthenticated ? { type: "authenticated" } : {}),
    });

    if (result.result === "ok") {
      console.log(`Video with public_id ${publicId} deleted successfully.`);
      return true;
    } else {
      console.error(`Failed to delete video with public_id ${publicId}.`, result);
      return false;
    }
  } catch (error) {
    console.error("Error deleting video from Cloudinary:", error);
    return false;
  }
};

export const deletePdfFromCloudinary = async (pdfUrl: string): Promise<boolean> => {
  try {
    const regex = /\/raw\/upload\/(?:v\d+\/)?(.*?)(?:\.pdf)$/;
    const match = pdfUrl.match(regex);

    if (!match || !match[1]) {
      console.error("Could not extract public_id from PDF URL");
      return false;
    }
    const publicId = match[1];

    const result = await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });

    if (result.result === "ok") {
      console.log(`PDF with public_id ${publicId} deleted successfully.`);
      return true;
    } else {
      console.error(`Failed to delete PDF with public_id ${publicId}.`, result);
      return false;
    }
  } catch (error) {
    console.error("Error deleting PDF from Cloudinary:", error);
    return false;
  }
};

export const uploadImageToCloudinary = async (buffer: Buffer, folder: string): Promise<string | null> => {
  try {
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: `Tutoriam/${folder}`,
        },
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
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

export const uploadAuthenticatedVideoToCloudinary = async (
  buffer: Buffer,
  folder: string
): Promise<{ url: string; duration: string; public_id: string } | null> => {
  try {
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder: `Tutoriam/${folder}`,
          type: "authenticated",
        },
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (result) {
            resolve(result);
          } else if (error) {
            reject(new Error(`Cloudinary video upload failed: ${error.message}`));
          }
        }
      );

      if (buffer) {
        uploadStream.end(buffer);
      } else {
        reject(new Error("No video buffer provided."));
      }
    });

    if (result) {
      return { url: result.secure_url, duration: result.duration, public_id: result.public_id };
    }
    return null;
  } catch (error: any) {
    console.error("Error uploading video to Cloudinary:", error);
    throw new Error(`Error uploading video: ${error.message}`);
  }
};

export const uploadVideoToCloudinary = async (
  buffer: Buffer,
  folder: string
): Promise<{ url: string; duration: string, public_id: string } | null> => {
  try {
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder: `Tutoriam/${folder}`,
        },
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (result) {
            resolve(result);
          } else if (error) {
            reject(new Error(`Cloudinary video upload failed: ${error.message}`));
          }
        }
      );

      if (buffer) {
        uploadStream.end(buffer);
      } else {
        reject(new Error("No video buffer provided."));
      }
    });

    if (result) {
      return { url: result.secure_url, duration: result.duration, public_id: result.public_id };
    }
    return null;
  } catch (error: any) {
    console.error("Error uploading video to Cloudinary:", error);
    throw new Error(`Error uploading video: ${error.message}`);
  }
};

export const uploadPdfToCloudinary = async (buffer: Buffer, folder: string): Promise<string | null> => {
  try {
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          type: "upload",
          folder: `Tutoriam/${folder}`,
          format: "pdf",
        },
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (result) {
            resolve(result);
          } else if (error) {
            reject(new Error(`Cloudinary PDF upload failed: ${error.message}`));
          }
        }
      );

      if (buffer) {
        uploadStream.end(buffer);
      } else {
        reject(new Error("No PDF buffer provided."));
      }
    });

    return result ? result.secure_url : null;
  } catch (error: any) {
    console.error("Error uploading PDF to Cloudinary:", error);
    throw new Error(`Error uploading PDF: ${error.message}`);
  }
};
