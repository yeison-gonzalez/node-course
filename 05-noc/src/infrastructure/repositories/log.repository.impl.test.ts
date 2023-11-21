import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity"
import { LogRespositoryImpl } from "./log.repository.impl"

describe('log.respository.impl.ts', () => {
  const mockLogDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const logRespostitory = new LogRespositoryImpl(mockLogDatasource)

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('saveLog should call the datasource with arguments', async () => {
    const log = new LogEntity({
      level: LogSeverityLevel.low,
      message: 'Test',
      origin: 'log.respository.impl.test.ts'
    })
    await logRespostitory.saveLog(log)
    expect(mockLogDatasource.saveLog).toHaveBeenCalledWith({
      "createdAt": expect.any(Date),
      "level": "low",
      "message": "Test",
      "origin": "log.respository.impl.test.ts"
    });
  })

  it('getLogs should call the datasource with arguments', async () => {
    await logRespostitory.getLogs(LogSeverityLevel.low);
    expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.low)
  })
})
