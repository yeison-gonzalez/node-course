import fs from 'fs'
import { SaveFile } from './save-file.use-case'

describe('SaveFileUseCase', () => {
  const customOptions = {
    fileContent: 'custom content',
    fileDestination: 'custom-outputs/file-destination',
    fileName: 'custom-table-name',
  }

  const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

  afterEach(() => {
    const existFolder = fs.existsSync('outputs')
    const existCustomFolder = fs.existsSync(customOptions.fileDestination)
    existFolder && fs.rmSync('outputs', { recursive: true })
    existCustomFolder && fs.rmSync(customOptions.fileDestination, { recursive: true })
  })
  
  it('should save file with default values', () => {
    const saveFile = new SaveFile()
    const filePath = 'outputs/table.txt'
    const options = {
      fileContent: 'test content'
    }

    const result = saveFile.execute(options)
    const fileExist = fs.existsSync(filePath)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })

    expect(result).toBeTruthy()
    expect(fileExist).toBe(true)
    expect(fileContent).toBe(options.fileContent)
  })

  it('should save file with custom values', () => {
    const saveFile = new SaveFile();
    const result = saveFile.execute(customOptions)
    const fileExist = fs.existsSync(customFilePath)
    const fileContent = fs.readFileSync(customFilePath, { encoding: 'utf-8' })

    expect(result).toBeTruthy()
    expect(fileExist).toBeTruthy()
    expect(fileContent).toBe(customOptions.fileContent)
  })

  it('should return false If directory could not be created', () => {
    const saveFile = new SaveFile()
    const mkdirMock = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => { throw new Error('This is a custom message from testing') })
    const result = saveFile.execute(customOptions)

    expect(result).toBe(false)
    mkdirMock.mockRestore();
  })

  it('should return false If file could not be created', () => {
    const saveFile = new SaveFile()
    const writeFileMock = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => { throw new Error('This is a custom message from testing') })
    const result = saveFile.execute({ fileContent: 'test' })

    expect(result).toBe(false)
    writeFileMock.mockRestore()
  })
})
