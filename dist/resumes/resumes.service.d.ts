import { Model } from 'mongoose';
import { Resume, ResumeDocument } from './schemas/resume.schema';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
export declare class ResumesService {
    private resumeModel;
    constructor(resumeModel: Model<ResumeDocument>);
    create(createResumeDto: CreateResumeDto): Promise<never>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Resume, {}, import("mongoose").DefaultSchemaOptions> & Resume & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Resume, {}, import("mongoose").DefaultSchemaOptions> & Resume & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, updateResumeDto: UpdateResumeDto): Promise<import("mongoose").Document<unknown, {}, Resume, {}, import("mongoose").DefaultSchemaOptions> & Resume & {
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
