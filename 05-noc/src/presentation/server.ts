import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRespositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRespositoryImpl(
  new FileSystemDatasource()
);

const emailService = new EmailService();

export class Server {
  static start() {
    console.log('Server started...')
    /* new SendEmailLogs(emailService, fileSystemLogRepository).execute(envs.MAILER_EMAIL); */

    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'https://google.com'
        new CheckService(
          fileSystemLogRepository,
          () => console.log(`${url} is ok`),
          (error) => console.log(error)
        ).execute(url)
      }
    );
  }
}
