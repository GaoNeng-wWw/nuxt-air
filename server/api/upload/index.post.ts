import status from "http-status";
import { createHash } from 'node:crypto';
import mime from 'mime';


export default defineApi(async (event) => {
  const files = await readMultipartFormData(event);
  const file = files?.[0];
  const t = await useTranslation(event);
  if (!file){
    throw new HttpException(t('common.badRequest.emptyFile'), status.BAD_REQUEST);
  }
  if (!file.type?.startsWith('image')) {
    throw new HttpException(t('common.badRequest.onlyImage'), status.BAD_REQUEST);
  }
  const {data} = file;
  const config = useRuntimeConfig(event)
  if (data.byteLength > config.IMAGE_LIMIT_BYTE) {
    throw new HttpException(t('common.badRequest.imageExceedingSizeLimit'), status.REQUESTED_RANGE_NOT_SATISFIABLE);
  }
  const oss = useOSS(event)
  const md5 = createHash('md5').update(data).digest('hex');
  const ext = mime.getExtension(file.type);
  const fileName = `${md5}.${ext}`;
  if (await oss.has(fileName)){
    return `/image/${fileName}`
  }
  await oss.put(fileName, data);
  return `/image/${fileName}`
})