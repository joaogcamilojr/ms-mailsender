import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import 'dotenv/config';

import awsConfig from './config/aws.config';
import emailConfig from './config/email.config';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [awsConfig, emailConfig],
    }),
    MailModule,
  ],
})
export class AppModule {}
