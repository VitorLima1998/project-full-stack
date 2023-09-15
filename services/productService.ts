import axios from 'axios';
import { PrismaClient } from '../prisma/generated/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export default {
  syncDatabase: async () => {
    const products = (await axios.get('https://dummyjson.com/products')).data;

    await Promise.all(
      products.products.map(async (product: any) => {
        await prisma.product.create({
          data: {
            title: product.title,
            description: product.description,
            price: product.price,
            discountPercentage: product.discountPercentage,
            rating: product.rating,
            stock: product.stock,
            brand: product.brand,
            category: product.category,
            thumbnail: product.thumbnail,
            images: {
              create: product.images.map((imageUrl: string) => ({
                url: imageUrl,
              })),
            },
          },
        });
      })
    );
    return products;
  },

  getAll: async () => {
    const products = await prisma.product.findMany({
      include: {
        images: true,
      },
    });
    return products;
  },

  create: async (req: Request, res: Response) => {
    const {
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      images,
    } = req.body;

    const newProduct = await prisma.product.create({
      data: {
        title,
        description,
        price,
        discountPercentage,
        rating,
        stock,
        brand,
        category,
        thumbnail,
        images: {
          createMany: {
            data: images.map((imageUrl: string) => ({
              url: imageUrl,
            })),
          },
        },
      },
      include: {
        images: true,
      },
    });
    return newProduct;
  },
};
