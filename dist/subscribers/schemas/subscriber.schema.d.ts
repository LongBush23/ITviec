import mongoose, { HydratedDocument } from 'mongoose';
export type SubscriberDocument = HydratedDocument<Subscriber>;
export declare class Subscriber {
    email: string;
    name: string;
    skills: string[];
    isDeleted: boolean;
    createdBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };
    updatedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };
    deletedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };
}
export declare const SubscriberSchema: mongoose.Schema<Subscriber, mongoose.Model<Subscriber, any, any, any, any, any, Subscriber>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Subscriber, mongoose.Document<unknown, {}, Subscriber, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<Subscriber & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    email?: mongoose.SchemaDefinitionProperty<string, Subscriber, mongoose.Document<unknown, {}, Subscriber, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Subscriber & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    name?: mongoose.SchemaDefinitionProperty<string, Subscriber, mongoose.Document<unknown, {}, Subscriber, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Subscriber & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    skills?: mongoose.SchemaDefinitionProperty<string[], Subscriber, mongoose.Document<unknown, {}, Subscriber, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Subscriber & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isDeleted?: mongoose.SchemaDefinitionProperty<boolean, Subscriber, mongoose.Document<unknown, {}, Subscriber, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Subscriber & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdBy?: mongoose.SchemaDefinitionProperty<{
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }, Subscriber, mongoose.Document<unknown, {}, Subscriber, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Subscriber & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedBy?: mongoose.SchemaDefinitionProperty<{
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }, Subscriber, mongoose.Document<unknown, {}, Subscriber, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Subscriber & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    deletedBy?: mongoose.SchemaDefinitionProperty<{
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }, Subscriber, mongoose.Document<unknown, {}, Subscriber, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Subscriber & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Subscriber>;
