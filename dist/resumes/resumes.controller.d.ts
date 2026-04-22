import { ResumesService } from './resumes.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
export declare class ResumesController {
    private readonly resumesService;
    constructor(resumesService: ResumesService);
    create(createResumeDto: CreateResumeDto): Promise<never>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/resume.schema").Resume, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/resume.schema").Resume & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/resume.schema").Resume, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/resume.schema").Resume & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, updateResumeDto: UpdateResumeDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/resume.schema").Resume, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/resume.schema").Resume & {
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
