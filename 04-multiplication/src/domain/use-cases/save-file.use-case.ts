import fs from 'fs'
import path from "path";

export interface SaveFileUseCase {
  execute: (options: Options) => boolean;
}

export interface Options {
  fileContent: string
  fileDestination?: string
  fileName?: string
}

export class SaveFile implements SaveFileUseCase {
  constructor() { }
  
  execute({ fileContent, fileName = 'table', fileDestination = 'outputs' }: Options): boolean {
    try {
      const outFilePath = path.join(fileDestination, `${fileName}.txt`);
      fs.mkdirSync(fileDestination, { recursive: true })
      fs.writeFileSync(outFilePath, fileContent)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
}
