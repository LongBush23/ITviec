import { CreateResumeDto } from './create-resume.dto';
declare const UpdateResumeDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateResumeDto>>;
export declare class UpdateResumeDto extends UpdateResumeDto_base {
    status?: string;
}
export {};
