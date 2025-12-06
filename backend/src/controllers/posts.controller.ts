//src/controllers/posts.controller.ts

import { Request, Response } from 'express';
import { createSupabaseClient } from '../lib/supabase';

// GET /api/posts
export const getPosts = async (req: Request, res: Response) => {
  try {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    console.error('Get posts error:', err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// GET /api/posts/:id
export const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error?.code === 'PGRST116') {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (error) throw error;

    res.json(data);
  } catch (err: any) {
    console.error('Get post error:', err);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

// POST /api/posts
export const createPost = async (req: Request, res: Response) => {
  const { 
    title, 
    slug, 
    content, 
    excerpt = '', 
    image_url = '',
    type = 'blog',        // ✅ default 'blog'
    status = 'draft'      // ✅ default 'draft'
  } = req.body;

  if (!title || !slug || !content) {
    return res.status(400).json({ error: 'Missing required fields: title, slug, content' });
  }

  // Validasi type
  if (type !== 'blog' && type !== 'page') {
    return res.status(400).json({ error: "Invalid 'type'. Must be 'blog' or 'page'." });
  }

  // Validasi status
  if (status !== 'draft' && status !== 'published') {
    return res.status(400).json({ error: "Invalid 'status'. Must be 'draft' or 'published'." });
  }

  try {
    const supabase = createSupabaseClient();
    const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

    const { data, error } = await supabase
      .from('posts')
      .insert([{ 
        title, 
        slug, 
        content, 
        excerpt, 
        image_url, 
        date: today,
        type,           // ✅ disertakan
        status          // ✅ disertakan
      }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err: any) {
    console.error('Create post error:', err);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

// PUT /api/posts/:id
export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { 
    title, 
    slug, 
    content, 
    excerpt, 
    image_url,
    type,
    status
  } = req.body;

  if (!title || !slug || !content) {
    return res.status(400).json({ error: 'Missing required fields: title, slug, content' });
  }

  // Validasi opsional type dan status jika dikirim
  if (type !== undefined && type !== 'blog' && type !== 'page') {
    return res.status(400).json({ error: "Invalid 'type'. Must be 'blog' or 'page'." });
  }

  if (status !== undefined && status !== 'draft' && status !== 'published') {
    return res.status(400).json({ error: "Invalid 'status'. Must be 'draft' or 'published'." });
  }

  try {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from('posts')
      .update({ 
        title, 
        slug, 
        content, 
        excerpt, 
        image_url,
        ...(type !== undefined && { type }),
        ...(status !== undefined && { status })
      })
      .eq('id', id)
      .select()
      .single();

    if (error?.code === 'PGRST116') {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (error) throw error;

    res.json(data);
  } catch (err: any) {
    console.error('Update post error:', err);
    res.status(500).json({ error: 'Failed to update post' });
  }
};

// DELETE /api/posts/:id
export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const supabase = createSupabaseClient();
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error?.code === 'PGRST116') {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (error) throw error;

    res.status(204).send();
  } catch (err: any) {
    console.error('Delete post error:', err);
    res.status(500).json({ error: 'Failed to delete post' });
  }
};