import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Create default Admin user
  const adminEmail = 'admin@toolstore.com';
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin@123456', salt);

    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Quản Trị Viên',
        role: Role.ADMIN,
      },
    });
    console.log(`✅ Created Admin user: ${adminEmail} (password: Admin@123456)`);
  }

  // 2. Create sample Tools and Packages
  const sampleTools = [
    {
      name: 'Tool Tự Động Hóa Facebook Marketing Pro',
      slug: 'tool-tu-dong-hoa-facebook-marketing-pro',
      shortDescription: 'Tự động tương tác, đăng bài group, nuôi tài khoản và gửi tin nhắn tự động hàng loạt.',
      description: 'Phần mềm tự động hóa marketing trên nền tảng Facebook chuyên nghiệp. Giúp tiết kiệm 90% thời gian vận hành chiến dịch, quản lý hàng trăm nick clone không lo checkpoint với cơ chế đổi proxy chuyên sâu và mô phỏng thao tác người dùng thật.',
      iconUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=150',
      packages: [
        { name: 'Gói Trải Nghiệm (1 Tháng)', durationDays: 30, price: 299000 },
        { name: 'Gói Tiết Kiệm (6 Tháng)', durationDays: 180, price: 1490000 },
        { name: 'Gói Bản Quyền Vĩnh Viễn', durationDays: null, price: 2990000 },
      ],
    },
    {
      name: 'Tool Quét & Phân Tích Data Khách Hàng E-Commerce',
      slug: 'tool-quet-phan-tich-data-khach-hang-ecommerce',
      shortDescription: 'Crawl sản phẩm hot trends, quét giá đối thủ và phân tích đánh giá khách hàng trên Shopee/Lazada/TikTok.',
      description: 'Hỗ trợ nhà bán hàng online nắm bắt xu hướng thị trường, tìm sản phẩm win, theo dõi biến động giá của đối thủ và bóc tách dữ liệu khách hàng mục tiêu để chạy quảng cáo tối ưu chuyển đổi.',
      iconUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150',
      packages: [
        { name: 'Gói 1 Tháng', durationDays: 30, price: 399000 },
        { name: 'Gói 1 Năm', durationDays: 365, price: 3200000 },
        { name: 'Gói Vĩnh Viễn Trọn Đời', durationDays: null, price: 4990000 },
      ],
    },
  ];

  for (const item of sampleTools) {
    const existing = await prisma.tool.findUnique({ where: { slug: item.slug } });
    if (!existing) {
      await prisma.tool.create({
        data: {
          name: item.name,
          slug: item.slug,
          shortDescription: item.shortDescription,
          description: item.description,
          iconUrl: item.iconUrl,
          packages: {
            create: item.packages.map((pkg) => ({
              name: pkg.name,
              durationDays: pkg.durationDays,
              price: pkg.price,
              currency: 'VND',
            })),
          },
        },
      });
      console.log(`✅ Seeded tool: ${item.name}`);
    }
  }

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
