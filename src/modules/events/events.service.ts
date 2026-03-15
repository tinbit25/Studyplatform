import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventLog } from './schemas/event.schema';

@Injectable()
export class EventsService {
  constructor(@InjectModel(EventLog.name) private eventModel: Model<EventLog>) {}

  async emit(userId: string, eventType: string, metadata: any = {}) {
    const log = new this.eventModel({
      userId,
      eventType,
      metadata,
    });
    return log.save();
  }
}