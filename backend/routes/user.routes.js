const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient()
const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  const users = await prisma.user.findMany({})
  res.json(users)
})

userRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: 'Заполните обязательные поля'
      })
    }

    const user = await prisma.user.findFirst({
      where: email
    })

    const isPasswordCorrect = user && (
      await bcrypt.compare(password, user.password)
    )

    const secret = process.env.JWT_SECRET

    if (user && isPasswordCorrect && secret) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '1d' })
      })
    } else {
      return res.status(400).json({
        message: 'Неверный логин или парооль'
      })
    }

  } catch {
    res.status(500).json({ message: 'Что-то пошло не так'})
  }
})

userRouter.post('/register', async (req, res) => {
  try {
    const { email, password, name, phone, isAdmin } = req.body;
    if (!email || !password || !name || !phone) {
      return res.status(400).json({ message: 'Заполните обязательные поля'});
    }

    const registeredUser = await prisma.user.findFirst({
      where: {
        email
      }
    })

    if (registeredUser) {
      return res.status(400).json({ message: 'Пользователь c таким email уже существует'})
    }

    const admin = isAdmin ? true : false

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        isAdmin: admin
      }
    })

    const secret = process.env.JWT_SECRET;

    if (user && secret) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '1d'})
      })
    } else {
      return res.status(400).json({ message: 'He удалось создать пользователя'})
    }
  } catch {
    res.status(400).json({ message: 'Что-то пошло не так'})
  }
})

userRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: {
      id
    }
  })

  res.json({
    message: 'deleted',
    user
  })
})

module.exports = userRouter;
