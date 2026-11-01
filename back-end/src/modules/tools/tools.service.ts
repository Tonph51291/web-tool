import { prisma } from '../../config/database.js';
import { ApiError } from '../../utils/apiError.js';
import {
  CreateToolInput,
  UpdateToolInput,
  CreatePackageInput,
  UpdatePackageInput,
} from './tools.validation.js';

const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export class ToolsService {
  static async listTools(onlyActive = true) {
    return prisma.tool.findMany({
      where: onlyActive ? { isActive: true } : undefined,
      include: {
        packages: {
          where: onlyActive ? { isActive: true } : undefined,
          orderBy: { price: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async getToolByIdOrSlug(idOrSlug: string, onlyActive = true) {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);

    const tool = await prisma.tool.findFirst({
      where: {
        OR: isUuid ? [{ id: idOrSlug }, { slug: idOrSlug }] : [{ slug: idOrSlug }],
        ...(onlyActive ? { isActive: true } : {}),
      },
      include: {
        packages: {
          where: onlyActive ? { isActive: true } : undefined,
          orderBy: { price: 'asc' },
        },
      },
    });

    if (!tool) {
      throw ApiError.notFound('Không tìm thấy tool phần mềm yêu cầu');
    }

    return tool;
  }

  static async createTool(data: CreateToolInput) {
    const slug = data.slug ? slugify(data.slug) : slugify(data.name);

    const existingTool = await prisma.tool.findUnique({ where: { slug } });
    if (existingTool) {
      throw ApiError.conflict(`Tool với định danh (slug) '${slug}' đã tồn tại`);
    }

    return prisma.tool.create({
      data: {
        name: data.name,
        slug,
        shortDescription: data.shortDescription,
        description: data.description,
        iconUrl: data.iconUrl || null,
        packages: data.packages?.length
          ? {
              create: data.packages.map((pkg) => ({
                name: pkg.name,
                durationDays: pkg.durationDays ?? null,
                price: pkg.price,
                currency: pkg.currency || 'VND',
              })),
            }
          : undefined,
      },
      include: {
        packages: true,
      },
    });
  }

  static async updateTool(id: string, data: UpdateToolInput) {
    const tool = await prisma.tool.findUnique({ where: { id } });
    if (!tool) {
      throw ApiError.notFound('Tool không tồn tại');
    }

    let slug = tool.slug;
    if (data.slug) {
      slug = slugify(data.slug);
      if (slug !== tool.slug) {
        const existing = await prisma.tool.findUnique({ where: { slug } });
        if (existing) {
          throw ApiError.conflict(`Định danh (slug) '${slug}' đã tồn tại`);
        }
      }
    }

    return prisma.tool.update({
      where: { id },
      data: {
        name: data.name,
        slug,
        shortDescription: data.shortDescription,
        description: data.description,
        iconUrl: data.iconUrl !== undefined ? data.iconUrl || null : undefined,
        isActive: data.isActive,
      },
      include: {
        packages: true,
      },
    });
  }

  static async deleteTool(id: string) {
    const tool = await prisma.tool.findUnique({ where: { id } });
    if (!tool) {
      throw ApiError.notFound('Tool không tồn tại');
    }

    return prisma.tool.delete({
      where: { id },
    });
  }

  static async createPackage(data: CreatePackageInput) {
    const tool = await prisma.tool.findUnique({ where: { id: data.toolId } });
    if (!tool) {
      throw ApiError.notFound('Tool không tồn tại để thêm gói bản quyền');
    }

    return prisma.toolPackage.create({
      data: {
        toolId: data.toolId,
        name: data.name,
        durationDays: data.durationDays ?? null,
        price: data.price,
        currency: data.currency || 'VND',
      },
    });
  }

  static async updatePackage(id: string, data: UpdatePackageInput) {
    const pkg = await prisma.toolPackage.findUnique({ where: { id } });
    if (!pkg) {
      throw ApiError.notFound('Gói bản quyền không tồn tại');
    }

    return prisma.toolPackage.update({
      where: { id },
      data: {
        name: data.name,
        durationDays: data.durationDays !== undefined ? data.durationDays : undefined,
        price: data.price,
        currency: data.currency,
        isActive: data.isActive,
      },
    });
  }

  static async deletePackage(id: string) {
    const pkg = await prisma.toolPackage.findUnique({ where: { id } });
    if (!pkg) {
      throw ApiError.notFound('Gói bản quyền không tồn tại');
    }

    return prisma.toolPackage.delete({
      where: { id },
    });
  }
}
