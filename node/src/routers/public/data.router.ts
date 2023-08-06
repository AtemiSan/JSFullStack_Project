import { Router } from 'express';
import dataController from '../../controllers/data.controller';

const router = Router();

router.post('/getDolgList', dataController.getDolgList);
router.post('/getDepartList', dataController.getDepartList);
router.post('/getRoleList', dataController.getRoleList);

export default router;