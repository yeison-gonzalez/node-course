import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendLogEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendLogEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRespository: LogRepository,
  ){}

  async execute(to: string | string[]) {
    try {
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to)
      if (!sent) {
        throw new Error('Email log not sent')
      }
      const log = new LogEntity({
        message: `Log email sent`,
        level: LogSeverityLevel.low,
        origin: 'sent-email-logs.ts',
      })

      this.logRespository.saveLog(log)
      return true;
    } catch (error) {
      const log = new LogEntity({
        message: `${error}`,
        level: LogSeverityLevel.high,
        origin: 'sent-email-logs.ts',
      })

      this.logRespository.saveLog(log)
      return false;
    }
  };
}
