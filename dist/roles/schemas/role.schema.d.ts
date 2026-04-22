import mongoose, { HydratedDocument } from 'mongoose';
export type RoleDocument = HydratedDocument<Role>;
export declare class Role {
    name: string;
    description: string;
    isActive: boolean;
    permissions: mongoose.Schema.Types.ObjectId[];
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
export declare const RoleSchema: mongoose.Schema<Role, mongoose.Model<Role, any, any, any, any, any, Role>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Role, mongoose.Document<unknown, {}, Role, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<Role & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: mongoose.SchemaDefinitionProperty<string, Role, mongoose.Document<unknown, {}, Role, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Role & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: mongoose.SchemaDefinitionProperty<string, Role, mongoose.Document<unknown, {}, Role, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Role & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isActive?: mongoose.SchemaDefinitionProperty<boolean, Role, mongoose.Document<unknown, {}, Role, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Role & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    permissions?: mongoose.SchemaDefinitionProperty<mongoose.Schema.Types.ObjectId[], Role, mongoose.Document<unknown, {}, Role, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Role & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isDeleted?: mongoose.SchemaDefinitionProperty<boolean, Role, mongoose.Document<unknown, {}, Role, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Role & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdBy?: mongoose.SchemaDefinitionProperty<{
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }, Role, mongoose.Document<unknown, {}, Role, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Role & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedBy?: mongoose.SchemaDefinitionProperty<{
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }, Role, mongoose.Document<unknown, {}, Role, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Role & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    deletedBy?: mongoose.SchemaDefinitionProperty<{
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }, Role, mongoose.Document<unknown, {}, Role, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Role & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Role>;
