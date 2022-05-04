import { UploadResponse } from "@/types/data";
import request from "@/utils/request";


export function uploadPhotoApi(fm: FormData): Promise<UploadResponse> {
  return request.patch('/user/photo', fm)
}