"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const resume_schema_1 = require("./schemas/resume.schema");
let ResumesService = class ResumesService {
    resumeModel;
    constructor(resumeModel) {
        this.resumeModel = resumeModel;
    }
    async create(createResumeDto) {
        return this.resumeModel.create(createResumeDto);
    }
    async findAll() {
        return this.resumeModel.find({ isDeleted: false }).lean();
    }
    async findOne(id) {
        const resume = await this.resumeModel
            .findOne({ _id: id, isDeleted: false })
            .lean();
        if (!resume)
            throw new common_1.NotFoundException(`Resume ${id} not found`);
        return resume;
    }
    async update(id, updateResumeDto) {
        const { status, ...rest } = updateResumeDto;
        const updateData = { ...rest };
        if (status) {
            updateData['$push'] = {
                history: { status, updatedAt: new Date() },
            };
            updateData['status'] = status;
        }
        const resume = await this.resumeModel
            .findOneAndUpdate({ _id: id, isDeleted: false }, updateData, { new: true })
            .lean();
        if (!resume)
            throw new common_1.NotFoundException(`Resume ${id} not found`);
        return resume;
    }
    async remove(id) {
        const resume = await this.resumeModel
            .findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true })
            .lean();
        if (!resume)
            throw new common_1.NotFoundException(`Resume ${id} not found`);
        return { message: `Resume ${id} has been deleted` };
    }
};
exports.ResumesService = ResumesService;
exports.ResumesService = ResumesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(resume_schema_1.Resume.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ResumesService);
//# sourceMappingURL=resumes.service.js.map