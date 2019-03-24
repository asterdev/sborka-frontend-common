import {ObjectWithId} from "./object-with-id";

export class FileUploaded implements ObjectWithId {
  id: number;
  contentUrl: string;
}
