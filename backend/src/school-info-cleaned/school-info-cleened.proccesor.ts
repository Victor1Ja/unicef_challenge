import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('schoolInfoCleaned')
export class AudioProcessor {
  private readonly logger = new Logger(AudioProcessor.name);

  @Process('newSchoolData')
  handleTranscode(job: Job) {
    this.logger.debug('Start transcoding...');
    this.logger.debug(job.data);
    this.logger.debug('Transcoding completed');
  }
}
