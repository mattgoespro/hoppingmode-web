import express from 'express';
import requestRateLimiter from './middleware/request-rate-limiter';
import logger from './middleware/logger';
import cors from './middleware/cors';

export default express().use(cors, requestRateLimiter, logger);
