import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRespositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRespositoryImpl(
  new FileSystemDatasource()
) 

export class Server {
  static start() {
    console.log('Server started...')
    const emailService = new EmailService(fileSystemLogRepository);
    /* emailService.sendEmailWithFileSystemLogs(envs.MAILER_EMAIL) */
    /* emailService.sendEmail({
      to: envs.MAILER_EMAIL,
      subject: 'Logs system',
      htmlBody: `
        <h3>Logs de sistema - NOC</h3>
        <p>Lorem velip non veiam ullamco ex eu laborum deserunt est amd.</p>
        <p>Ver logs adjuntos</p>
      `
    }) */

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
