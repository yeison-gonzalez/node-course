import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { ServerApp } from './server-app'

describe('Server App', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  })

  const options = {
    base: 2,
    limit: 10,
    showTable: false,
    fileDestination: 'test-destination',
    fileName: 'test-filename',
  }

  const valueReturn = '1 x 2 = 2'
  
  it('should create ServerApp instance', () => {
    const serverApp = new ServerApp();
    expect(serverApp).toBeInstanceOf(ServerApp)
    expect(typeof ServerApp.run).toBe('function')
  })

  /**
   * Test integration
   */
  it('should run ServerApp with options', () => {
    const logSpy = jest.spyOn(console, 'log');
    const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute')
    const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

    ServerApp.run(options)
    expect(logSpy).toHaveBeenCalledTimes(2)
    expect(logSpy).toHaveBeenCalledWith('Server running...')
    expect(logSpy).toHaveBeenLastCalledWith('File created!')
    expect(createTableSpy).toHaveBeenCalledTimes(1)
    expect(createTableSpy).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit
    })
    expect(saveFileSpy).toHaveBeenCalledTimes(1)
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      fileDestination: options.fileDestination,
      fileName: options.fileName
    })
  })

  it('should run ServerApp with custom values mocked', () => {
    const logMock = jest.fn()
    const logErrorMock = jest.fn()
    const createMock = jest.fn().mockReturnValue(valueReturn)
    const saveFileMock = jest.fn().mockReturnValue(true)

    console.log = logMock
    console.error = logErrorMock
    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveFileMock;

    ServerApp.run(options)

    expect(logMock).toHaveBeenCalledWith('Server running...')
    expect(createMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit
    })
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: valueReturn,
      fileDestination: options.fileDestination,
      fileName: options.fileName
    })
    expect(logMock).toHaveBeenCalledWith('File created!')
    expect(logErrorMock).not.toHaveBeenCalled()
  })
})
