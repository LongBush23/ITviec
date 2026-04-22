import { Model } from 'mongoose';
import { Subscriber, SubscriberDocument } from './schemas/subscriber.schema';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
export declare class SubscribersService {
    private subscriberModel;
    constructor(subscriberModel: Model<SubscriberDocument>);
    create(createSubscriberDto: CreateSubscriberDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Subscriber, {}, import("mongoose").DefaultSchemaOptions> & Subscriber & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Subscriber, {}, import("mongoose").DefaultSchemaOptions> & Subscriber & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Subscriber, {}, import("mongoose").DefaultSchemaOptions> & Subscriber & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Subscriber, {}, import("mongoose").DefaultSchemaOptions> & Subscriber & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, updateSubscriberDto: UpdateSubscriberDto): Promise<import("mongoose").Document<unknown, {}, Subscriber, {}, import("mongoose").DefaultSchemaOptions> & Subscriber & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
