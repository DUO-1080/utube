export const getFileName = (path) => path.substring(0, path.lastIndexOf('.'));

export const getFileExt = (path) => path.split('.').pop();
