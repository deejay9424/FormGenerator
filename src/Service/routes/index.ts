import { Router } from 'express';
import FormRouter from './Form';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/form', FormRouter);

// Export the base-router
export default router;
