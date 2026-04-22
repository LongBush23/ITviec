import mongoose, { HydratedDocument } from 'mongoose';
export type JobDocument = HydratedDocument<Job>;
export declare class Job {
    name: string;
    skills: string[];
    company: {
        _id: mongoose.Schema.Types.ObjectId;
        name: string;
    };
    location: string;
    salary: number;
    quantity: number;
    level: string;
    description: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
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
export declare const JobSchema: mongoose.Schema<Job, mongoose.Model<Job, any, any, any, any, any, Job>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Job, mongoose.Document<unknown, {}, Job, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<Job & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: mongoose.SchemaDefinitionProperty<string, Job, mongoose.Document<unknown, {}, Job, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Job & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    skills?: mongoose.SchemaDefinitionProperty<string[], Job, mongoose.Document<unknown, {}, Job, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Job & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    company?: mongoose.SchemaDefinitionProperty<{
        _id: mongoose.Schema.Types.ObjectId;
        name: string;
    }, Job, mongoose.Document<unknown, {}, Job, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Job & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    location?: mongoose.SchemaDefinitionProperty<string, Job, mongoose.Document<unknown, {}, Job, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Job & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    salary?: mongoose.SchemaDefinitionProperty<number, Job, mongoose.Document<unknown, {}, Job, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Job & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    quantity?: mongoose.SchemaDefinitionProperty<number, Job, mongoose.Document<unknown, {}, Job, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Job & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    level?: mongoose.SchemaDefinitionProperty<string, Job, mongoose.Document<unknown, {}, Job, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Job & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: mongoose.SchemaDefinitionProperty<string, Job, mongoose.Document<unknown, {}, Job, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Job & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    startDate?: mongoose.SchemaDefinitionProperty<Date, Job, mongoose.Document<unknown, {}, Job, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Job & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    endDate?: mongoose.SchemaDefinitionProperty<Date, Job, mongoose.Document<unknown, {}, Job, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Job & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isActive?: mongoose.SchemaDefinitionProperty<boolean, Job, mongoose.Document<unknown, {}, Job, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Job & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isDeleted?: mongoose.SchemaDefinitionProperty<boolean, Job, mongoose.Document<unknown, {}, Job, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Job & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdBy?: mongoose.SchemaDefinitionProperty<{
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }, Job, mongoose.Document<unknown, {}, Job, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Job & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedBy?: mongoose.SchemaDefinitionProperty<{
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }, Job, mongoose.Document<unknown, {}, Job, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Job & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    deletedBy?: mongoose.SchemaDefinitionProperty<{
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }, Job, mongoose.Document<unknown, {}, Job, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Job & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Job>;
