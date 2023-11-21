import fs from 'fs';
import path from 'path';
import { FileSystemDatasource } from './file-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogDatasource } from '../../domain/datasources/log.datasource';

describe('file-system.datasource.ts', () => {
  const logPath = path.join(__dirname, '../../../logs')

  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true })
  })

  it('should create log file if they do not exist', () => {
    new FileSystemDatasource();
    const files = fs.readdirSync(logPath);
    expect(files).toEqual(["logs-high.log", "logs-low.log", "logs-medium.log"])
  });

  it('should save a log in logs-low.log', () => {
    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({
      message: 'Test',
      level: LogSeverityLevel.low,
      origin: 'file-system.datasource.test.ts'
    })
    logDatasource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-low.log`, 'utf-8');
    expect(allLogs).toContain(JSON.stringify(log));
  });

  it('should save a log in logs-low.log and logs-medium.log', () => {
    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({
      message: 'Test',
      level: LogSeverityLevel.medium,
      origin: 'file-system.datasource.test.ts'
    })
    logDatasource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-low.log`, 'utf-8');
    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');
    expect(allLogs).toContain(JSON.stringify(log));
    expect(mediumLogs).toContain(JSON.stringify(log));
  });

  it('should save a log in logs-low.log and logs-high.log', () => {
    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({
      message: 'Test',
      level: LogSeverityLevel.high,
      origin: 'file-system.datasource.test.ts'
    })
    logDatasource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-low.log`, 'utf-8');
    const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');
    expect(allLogs).toContain(JSON.stringify(log));
    expect(highLogs).toContain(JSON.stringify(log));
  });

  it('should return all logs', async () => {
    const logDatasource = new FileSystemDatasource();
    const logLow = new LogEntity({
      message: 'Test',
      level: LogSeverityLevel.low,
      origin: 'file-system.datasource.test.ts'
    })
    const logMedium = new LogEntity({
      message: 'Test',
      level: LogSeverityLevel.medium,
      origin: 'file-system.datasource.test.ts'
    })
    const logHigh = new LogEntity({
      message: 'Test',
      level: LogSeverityLevel.high,
      origin: 'file-system.datasource.test.ts'
    })

    await logDatasource.saveLog(logLow);
    await logDatasource.saveLog(logMedium);
    await logDatasource.saveLog(logHigh);

    const logsLow = await logDatasource.getLogs(LogSeverityLevel.low)
    const logsMedium = await logDatasource.getLogs(LogSeverityLevel.medium)
    const logsHigh = await logDatasource.getLogs(LogSeverityLevel.high)

    expect(logsLow).toEqual(expect.arrayContaining([logLow, logMedium, logHigh]))
    expect(logsMedium).toEqual(expect.arrayContaining([logMedium]))
    expect(logsHigh).toEqual(expect.arrayContaining([logHigh]))
  })

  it('should not throw an error if path exist', () => {
    new FileSystemDatasource();
    new FileSystemDatasource();
    expect(true).toBeTruthy();
  })

  it('should throw an error if severity level is not defined', async () => {
    const logDatasource = new FileSystemDatasource();
    const customSeverityLevel = 'TEST_LEVEL' as LogSeverityLevel;
    try {
      await logDatasource.getLogs(customSeverityLevel);
      expect(true).toBeFalsy();
    } catch (error) {
      const errorString = `${error}`;
      expect(errorString).toContain(`${customSeverityLevel} not implemented`)
    }
  })
});
