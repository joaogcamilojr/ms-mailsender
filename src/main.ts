import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const queue = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL ?? 'amqp://localhost:5672'],
        queue: process.env.RABBITMQ_QUEUE ?? 'email_queue',
        prefetchCount: parseInt(process.env.RABBITMQ_PREFETCH_COUNT ?? '1', 10),
        noAck: false,
        queueOptions: {
          durable: true,
        },
        socketOptions: {
          heartbeatIntervalInSeconds: 5,
          reconnectTimeInSeconds: 5,
        },
      },
    },
  );

  await app.listen(process.env.PORT ?? 8085);
  await queue.listen();
}

bootstrap();
