import express from 'express';
import { createContest, getContests, getContestById } from '../controller/contestController.js';

const router = express.Router();

router.route('/')
    .post(createContest)
    .get(getContests);
router.route('/:id')
    .get(getContestById);

export default router;