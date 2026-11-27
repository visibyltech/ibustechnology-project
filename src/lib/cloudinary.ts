const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string | undefined;

export type CloudinaryUploadFolder = 'ibus/products' | 'ibus/payment-receipts';

export interface CloudinaryUploadResult {
  secureUrl: string;
  publicId: string;
  format: string;
  bytes: number;
}

/**
 * Uploads a customer-selected image directly to Cloudinary using an unsigned
 * upload preset. No Cloudinary API secret belongs in the browser.
 */
export async function uploadImageToCloudinary(
  file: File,
  folder: CloudinaryUploadFolder
): Promise<CloudinaryUploadResult> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error('Cloudinary is not configured. Add the cloud name and unsigned upload preset to the website environment variables.');
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Please upload a JPG, PNG or WebP image.');
  }

  const maxBytes = folder === 'ibus/payment-receipts' ? 8 * 1024 * 1024 : 10 * 1024 * 1024;
  if (file.size > maxBytes) {
    throw new Error(`This image is too large. Maximum size is ${folder === 'ibus/payment-receipts' ? '8 MB' : '10 MB'}.`);
  }

  const body = new FormData();
  body.append('file', file);
  body.append('upload_preset', UPLOAD_PRESET);
  body.append('folder', folder);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload?.error?.message || 'Cloudinary could not upload this image. Please try again.');
  }

  if (!payload.secure_url || !payload.public_id) {
    throw new Error('Cloudinary returned an incomplete upload response.');
  }

  return {
    secureUrl: payload.secure_url,
    publicId: payload.public_id,
    format: payload.format || '',
    bytes: Number(payload.bytes || file.size)
  };
}
