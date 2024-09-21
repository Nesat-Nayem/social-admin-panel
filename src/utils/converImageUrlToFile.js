function getFileTypeFromExtension(extension) {
  const extensionToMimeTypeMap = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    pdf: 'application/pdf',
  };

  // Convert the extension to lowercase to ensure case-insensitivity
  const lowercaseExtension = extension.toLowerCase();

  // Look up the MIME type for the given extension
  const mimeType = extensionToMimeTypeMap[lowercaseExtension];

  return mimeType || 'application/octet-stream'; // Default to binary/octet-stream if not found
}

// Function to convert image URL to File object
export const imageURLtoFile = async (url = null) => {
  console.log('JJJJURL', url);
  if (url) {
    const response = await fetch(url.replaceAll(' ', '-'));
    const blob = await response.blob();
    const lastIndex = url.lastIndexOf('/');

    // Extract the substring after the last '/'
    const filename = url.substring(lastIndex + 1);
    const fileExtention = url.lastIndexOf('.');
    const fileExtentionName = url.substring(fileExtention + 1);
    const mimeType = getFileTypeFromExtension(fileExtentionName);

    // Create a File object from the blob
    const fileVal = new File([blob], filename, {
      type: mimeType,
      lastModified: new Date().getTime(),
    });

    const path = filename; // You can modify this to the desired path
    const preview = URL.createObjectURL(blob);
    return { File: path, preview, fileVal };
  }
  // Add a return statement here for the case when url is falsy
  return null;
};
