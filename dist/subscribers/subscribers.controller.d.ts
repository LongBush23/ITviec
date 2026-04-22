import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
export declare class SubscribersController {
    private readonly subscribersService;
    constructor(subscribersService: SubscribersService);
    create(createSubscriberDto: CreateSubscriberDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/subscriber.schema").Subscriber, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/subscriber.schema").Subscriber & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/subscriber.schema").Subscriber, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/subscriber.schema").Subscriber & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/subscriber.schema").Subscriber, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/subscriber.schema").Subscriber & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/subscriber.schema").Subscriber, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/subscriber.schema").Subscriber & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, updateSubscriberDto: UpdateSubscriberDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/subscriber.schema").Subscriber, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/subscriber.schema").Subscriber & {
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
