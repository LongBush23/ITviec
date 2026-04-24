import { Model, Schema } from 'mongoose';

export type SoftDeleteModel<T> = Model<T> & {
  softDelete(filter: Record<string, any>): Promise<{ deleted: number }>;
  restore(filter: Record<string, any>): Promise<{ restored: number }>;
};

export function softDeletePlugin(schema: Schema) {
  if (!schema.path('isDeleted')) {
    schema.add({ isDeleted: { type: Boolean, default: false } });
  }
  if (!schema.path('deletedAt')) {
    schema.add({ deletedAt: { type: Date, default: null } });
  }

  (schema.statics as any).softDelete = async function (
    filter: Record<string, any>,
  ) {
    const result = await this.updateMany(filter, {
      isDeleted: true,
      deletedAt: new Date(),
    });
    return { deleted: result.modifiedCount };
  };

  (schema.statics as any).restore = async function (
    filter: Record<string, any>,
  ) {
    const result = await this.updateMany(filter, {
      isDeleted: false,
      deletedAt: null,
    });
    return { restored: result.modifiedCount };
  };

  schema.pre(
    ['find', 'findOne', 'findOneAndUpdate', 'countDocuments'],
    function () {
      const filter = this.getFilter();
      if (!('isDeleted' in filter)) {
        this.where({ isDeleted: { $ne: true } });
      }
    },
  );
}
