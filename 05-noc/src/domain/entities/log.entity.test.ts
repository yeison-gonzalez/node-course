import { LogEntity, LogSeverityLevel } from "./log.entity"

describe('log.entity.ts', () => {
  const dataObj = {
    message: 'Test',
    level: LogSeverityLevel.high,
    origin: 'log.entity.test.ts'
  }

  it('should create a LogEntity instance', () => {
    const log = new LogEntity(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  })

  it('should create log entity instance from json', () => {
    const json = `{"message":"Service https://google.com working","level":"low","origin":"check-service.ts","createdAt":"2023-11-16T21:29:35.648Z"}`

    const log = LogEntity.fromJson(json)

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe("Service https://google.com working");
    expect(log.level).toBe(LogSeverityLevel.low);
    expect(log.origin).toBe("check-service.ts");
    expect(log.createdAt).toBeInstanceOf(Date);
  })

  it('should create log entity instance from object', () => {
    const log = LogEntity.fromObject(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  })
})
