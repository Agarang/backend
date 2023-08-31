export function modifyFileName(
  file: Express.Multer.File,
  modifiedFileName: string,
): Express.Multer.File {
  const { originalname, ...fileInfo } = file;

  const splitedFileNameArray = originalname.split('.');

  if (splitedFileNameArray.length === 1) {
    throw new Error('파일명을 파일이름.확장자 로 바꿔주세요.');
  }

  // 확장자명
  const ext = splitedFileNameArray.slice(-1).toString();

  const title = splitedFileNameArray.slice(0, -1).join('.');

  const modifiedFile = {
    ...fileInfo,
    originalname: `${modifiedFileName}-${encodeURI(
      title,
    )}-${new Date().toISOString()}.${ext}`,
  };

  return modifiedFile;
}
