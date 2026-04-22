import mongoose, { HydratedDocument } from 'mongoose';
export type CompanyDocument = HydratedDocument<Company>;
export declare class Company {
    name: string;
    address: string;
    description: string;
    logo: string;
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
export declare const CompanySchema: mongoose.Schema<Company, mongoose.Model<Company, any, any, any, any, any, Company>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Company, mongoose.Document<unknown, {}, Company, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<Company & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: mongoose.SchemaDefinitionProperty<string, Company, mongoose.Document<unknown, {}, Company, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Company & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    address?: mongoose.SchemaDefinitionProperty<string, Company, mongoose.Document<unknown, {}, Company, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Company & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: mongoose.SchemaDefinitionProperty<string, Company, mongoose.Document<unknown, {}, Company, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Company & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    logo?: mongoose.SchemaDefinitionProperty<string, Company, mongoose.Document<unknown, {}, Company, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Company & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isDeleted?: mongoose.SchemaDefinitionProperty<boolean, Company, mongoose.Document<unknown, {}, Company, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Company & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdBy?: mongoose.SchemaDefinitionProperty<{
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }, Company, mongoose.Document<unknown, {}, Company, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Company & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedBy?: mongoose.SchemaDefinitionProperty<{
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }, Company, mongoose.Document<unknown, {}, Company, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Company & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    deletedBy?: mongoose.SchemaDefinitionProperty<{
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }, Company, mongoose.Document<unknown, {}, Company, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Company & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Company>;
