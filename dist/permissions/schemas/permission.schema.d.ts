import mongoose, { HydratedDocument } from 'mongoose';
export type PermissionDocument = HydratedDocument<Permission>;
export declare class Permission {
    name: string;
    path: string;
    method: string;
    description: string;
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
export declare const PermissionSchema: mongoose.Schema<Permission, mongoose.Model<Permission, any, any, any, any, any, Permission>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Permission, mongoose.Document<unknown, {}, Permission, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<Permission & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: mongoose.SchemaDefinitionProperty<string, Permission, mongoose.Document<unknown, {}, Permission, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Permission & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    path?: mongoose.SchemaDefinitionProperty<string, Permission, mongoose.Document<unknown, {}, Permission, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Permission & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    method?: mongoose.SchemaDefinitionProperty<string, Permission, mongoose.Document<unknown, {}, Permission, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Permission & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: mongoose.SchemaDefinitionProperty<string, Permission, mongoose.Document<unknown, {}, Permission, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Permission & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isDeleted?: mongoose.SchemaDefinitionProperty<boolean, Permission, mongoose.Document<unknown, {}, Permission, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Permission & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdBy?: mongoose.SchemaDefinitionProperty<{
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }, Permission, mongoose.Document<unknown, {}, Permission, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Permission & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedBy?: mongoose.SchemaDefinitionProperty<{
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }, Permission, mongoose.Document<unknown, {}, Permission, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Permission & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    deletedBy?: mongoose.SchemaDefinitionProperty<{
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }, Permission, mongoose.Document<unknown, {}, Permission, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Permission & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Permission>;
