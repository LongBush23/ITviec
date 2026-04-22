import mongoose, { HydratedDocument } from 'mongoose';
export type ResumeDocument = HydratedDocument<Resume>;
export declare class Resume {
    email: string;
    userId: mongoose.Schema.Types.ObjectId;
    url: string;
    status: string;
    companyId: mongoose.Schema.Types.ObjectId;
    jobId: mongoose.Schema.Types.ObjectId;
    history: {
        status: string;
        updatedAt: Date;
        updatedBy: {
            _id: mongoose.Schema.Types.ObjectId;
            email: string;
        };
    }[];
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
export declare const ResumeSchema: mongoose.Schema<Resume, mongoose.Model<Resume, any, any, any, any, any, Resume>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Resume, mongoose.Document<unknown, {}, Resume, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<Resume & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    email?: mongoose.SchemaDefinitionProperty<string, Resume, mongoose.Document<unknown, {}, Resume, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Resume & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    userId?: mongoose.SchemaDefinitionProperty<mongoose.Schema.Types.ObjectId, Resume, mongoose.Document<unknown, {}, Resume, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Resume & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    url?: mongoose.SchemaDefinitionProperty<string, Resume, mongoose.Document<unknown, {}, Resume, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Resume & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: mongoose.SchemaDefinitionProperty<string, Resume, mongoose.Document<unknown, {}, Resume, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Resume & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    companyId?: mongoose.SchemaDefinitionProperty<mongoose.Schema.Types.ObjectId, Resume, mongoose.Document<unknown, {}, Resume, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Resume & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    jobId?: mongoose.SchemaDefinitionProperty<mongoose.Schema.Types.ObjectId, Resume, mongoose.Document<unknown, {}, Resume, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Resume & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    history?: mongoose.SchemaDefinitionProperty<{
        status: string;
        updatedAt: Date;
        updatedBy: {
            _id: mongoose.Schema.Types.ObjectId;
            email: string;
        };
    }[], Resume, mongoose.Document<unknown, {}, Resume, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Resume & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isDeleted?: mongoose.SchemaDefinitionProperty<boolean, Resume, mongoose.Document<unknown, {}, Resume, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Resume & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdBy?: mongoose.SchemaDefinitionProperty<{
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }, Resume, mongoose.Document<unknown, {}, Resume, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Resume & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedBy?: mongoose.SchemaDefinitionProperty<{
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }, Resume, mongoose.Document<unknown, {}, Resume, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Resume & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    deletedBy?: mongoose.SchemaDefinitionProperty<{
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }, Resume, mongoose.Document<unknown, {}, Resume, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Resume & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Resume>;
