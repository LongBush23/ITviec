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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeSchema = exports.Resume = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
let Resume = class Resume {
    email;
    userId;
    url;
    status;
    companyId;
    jobId;
    history;
    isDeleted;
    createdBy;
    updatedBy;
    deletedBy;
};
exports.Resume = Resume;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Resume.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], Resume.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Resume.prototype, "url", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['PENDING', 'REVIEWING', 'APPROVED', 'REJECTED'],
        default: 'PENDING',
    }),
    __metadata("design:type", String)
], Resume.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Company' }),
    __metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], Resume.prototype, "companyId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Job' }),
    __metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], Resume.prototype, "jobId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                status: String,
                updatedAt: Date,
                updatedBy: {
                    _id: mongoose_2.default.Schema.Types.ObjectId,
                    email: String,
                },
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], Resume.prototype, "history", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Resume.prototype, "isDeleted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Resume.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Resume.prototype, "updatedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Resume.prototype, "deletedBy", void 0);
exports.Resume = Resume = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Resume);
exports.ResumeSchema = mongoose_1.SchemaFactory.createForClass(Resume);
//# sourceMappingURL=resume.schema.js.map