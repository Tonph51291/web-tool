import { createApp } from './app.js';
import { env } from './config/env.js';
import { prisma } from './config/database.js';

const startServer = async () => {
  const app = createApp();

  const server = app.listen(env.PORT, () => {
    console.log('====================================================');
    console.log(`🚀 Web Ban Tool API Server is running on port ${env.PORT}`);
    console.log(`📡 Environment: ${env.NODE_ENV}`);
    console.log(`🌐 Frontend Origin: ${env.FRONTEND_URL}`);
    console.log(`🔐 Database: PostgreSQL (Prisma ORM)`);
    console.log(`📁 Proofs Upload: ${env.UPLOAD_DIR}`);
    console.log('====================================================');
  });

  const shutdown = async (signal: string) => {
    console.log(`\n🛑 Received ${signal}. Gracefully shutting down...`);
    server.close(async () => {
      console.log('🔒 HTTP server closed');
      try {
        await prisma.$disconnect();
        console.log('💾 Database connection closed');
      } catch (err) {
        console.error('Error during database disconnect:', err);
      }
      process.exit(0);
    });

    // Force exit after 10 seconds if graceful shutdown fails
    setTimeout(() => {
      console.error('❌ Force shutdown timeout reached');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  process.on('unhandledRejection', (reason) => {
    console.error('💥 Unhandled Rejection:', reason);
  });

  process.on('uncaughtException', (err) => {
    console.error('💥 Uncaught Exception:', err);
    process.exit(1);
  });
};

startServer().catch((error) => {
  console.error('❌ Fatal error during server startup:', error);
  process.exit(1);
});
