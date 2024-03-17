const { PrismaClient } = require('@prisma/client');
const express = require('express');

const prisma = new PrismaClient()
const postRouter = express.Router();

postRouter.get('/', async (req, res) => {
  const posts = await prisma.post.findMany({})
  res.json(posts)
})

postRouter.post('/', async (req, res) => {
  const { name, content, phone } = req.body;

  const date = new Date();

  const post = await prisma.post.create({
    data: {
      author: name,
      content,
      phone,
      new: true,
    }
  })

  res.json({
    message: 'created',
    post
  })
})

postRouter.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, content, phone, isNew } = req.body;

  const post = await prisma.post.update({
    where: {
      id
    },
    data: {
      author: name,
      content,
      phone,
      new: isNew,
    }
  })

  res.json({
    message: 'updated',
    post
  })
})

postRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.delete({
    where: {
      id
    }
  })

  res.json({
    message: 'deleted',
    post
  })
})

module.exports = postRouter;
