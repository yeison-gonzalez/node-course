import { envs } from "../config/plugins/envs.plugin";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRespositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email.service";

const fsLogRepository = new LogRespositoryImpl(
  new FileSystemDatasource(),
);
const mongoLogRepository = new LogRespositoryImpl(
  new MongoLogDatasource(),
);
const postgresLogRepository = new LogRespositoryImpl(
  new PostgresLogDatasource(),
);

const logRepository = new LogRespositoryImpl(
  // new FileSystemDatasource(),
  // new MongoLogDatasource(),
  new PostgresLogDatasource(),
);

const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log('Server started...')

    // Send Email
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute(envs.MAILER_EMAIL);

    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'https://google.com'
        new CheckServiceMultiple(
          [fsLogRepository, mongoLogRepository, postgresLogRepository],
          () => console.log(`${url} is ok`),
          (error) => console.log(error)
        ).execute(url)
      }
    );
  }
}
