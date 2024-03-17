const { PrismaClient } = require('@prisma/client');
const express = require('express');

const prisma = new PrismaClient()
const postRouter = express.Router();

function updateContent(prev, next) {
  const date = new Date;
  const dateString = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  return `\t${dateString}\n${next}\n\n${prev}`
}

function createContent(content) {
  const date = new Date;
  const dateString = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  return `\t${dateString}\n${content}`
}

postRouter.get('/', async (req, res) => {
  const posts = await prisma.post.findMany({})
  res.json(posts)
})

postRouter.post('/', async (req, res) => {
  const { name, content, phone } = req.body;

  const prev = await prisma.post.findFirst({
    where: {
      author: name,
      phone
    }
  })

  if (prev) {
    const updatedContent = updateContent(prev.content, content);

    const post = await prisma.post.update({
      where: {
        id: prev.id,
      },
      data: {
        author: name,
        content: updatedContent,
        phone,
        isNew: true
      }
    })

    res.json({
      message: 'updated',
      post
    })

  } else {
    const createdContent = createContent(content)

    const post = await prisma.post.create({
      data: {
        author: name,
        content: createdContent,
        phone,
        isNew: true,
      }
    })

    res.json({
      message: 'created',
      post
    })
  }
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
      isNew,
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
