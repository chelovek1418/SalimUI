export class Picture{
  key: string;
  name: string;
  url: string;
  file: File;
  type: string;

  constructor(file: File) {
    this.file = file;
  }
}