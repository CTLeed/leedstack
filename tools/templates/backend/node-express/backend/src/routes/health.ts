import { Router } from 'express';

const router = Router();

interface HealthStatus {
  status: 'UP' | 'DOWN';
  timestamp: string;
  uptime: number;
  environment: string;
  version: string;
  checks?: {
    database?: 'UP' | 'DOWN';
    memory?: {
      used: number;
      total: number;
      percentage: number;
    };
  };
}

router.get('/', (req, res) => {
  const health: HealthStatus = {
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0',
  };

  // Add memory usage
  const memUsage = process.memoryUsage();
  health.checks = {
    memory: {
      used: Math.round(memUsage.heapUsed / 1024 / 1024), // MB
      total: Math.round(memUsage.heapTotal / 1024 / 1024), // MB
      percentage: Math.round((memUsage.heapUsed / memUsage.heapTotal) * 100),
    },
  };

  res.json(health);
});

// Liveness probe (K8s compatible)
router.get('/live', (req, res) => {
  res.json({ status: 'UP' });
});

// Readiness probe (K8s compatible)
router.get('/ready', (req, res) => {
  // Add database check here if needed
  res.json({ status: 'UP' });
});

export default router;
