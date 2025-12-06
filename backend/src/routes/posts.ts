import { Router } from 'express';
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from '../controllers/posts.controller';
import { adminAuth } from '../middleware/adminAuth';

const router = Router();

// Public: hanya GET (opsional)
router.get('/', getPosts);
router.get('/:id', getPostById);

// Admin: CRUD penuh
router.post('/', adminAuth, createPost);
router.put('/:id', adminAuth, updatePost);
router.delete('/:id', adminAuth, deletePost);

export default router;