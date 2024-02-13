import express from 'express';
import {UploadProfileImage} from '../controller/CloudinaryController.js';

const router = express.Router();


router.post('/uploadprofileimage', UploadProfileImage);

export default router;