import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "../../data/mongo";
import { MongoLogDatasource } from "./mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe('mongo-log.datasource.ts', () => {
  const LogDatasource = new MongoLogDatasource();

  const log = new LogEntity({
    level: LogSeverityLevel.medium,
    message: 'Test message',
    origin: 'mongo-log.datasource.test.ts'
  });

  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL
    })
  })

  afterEach(async () => {
    await LogModel.deleteMany();
  })

  afterAll(() => {
    mongoose.connection.close();
  })

  it('should create a log', async () => {
    const logSpy = jest.spyOn(console, 'log');

    await LogDatasource.saveLog(log)

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith("Mongo log created:", "Test message")
  });

  it('should get logs', async () => {
    await LogDatasource.saveLog(log)

    const logs = await LogDatasource.getLogs(LogSeverityLevel.medium);
    expect(logs.length).toBe(1);
    expect(logs[0].level).toBe(LogSeverityLevel.medium)
  })
});
