import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsService } from './events.service';
import { EventLog, EventLogSchema } from './schemas/event.schema';

@Global() // Makes EventsService available everywhere
@Module({
  imports: [
    MongooseModule.forFeature([{ name: EventLog.name, schema: EventLogSchema }]),
  ],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}