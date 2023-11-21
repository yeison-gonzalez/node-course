import { CronService } from "./cron-service";

describe('cron-service.ts', () => {
  const mockTick = jest.fn();

  it('should create a job', () => {
    const job = CronService.createJob('* * * * * *', mockTick)

    setTimeout(() => {
      expect(mockTick).toHaveBeenCalledTimes(2);
      job.stop();
    }, 2000)
  })
});
