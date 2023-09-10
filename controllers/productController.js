const axios = require('axios');
const { PrismaClient } = require('../prisma/generated/client');

const prisma = new PrismaClient();

module.exports = {
  syncDatabase: async () => {
    const products = (await axios.get('https://dummyjson.com/products')).data;

    await Promise.all(
      products.products.map(async (product) => {
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
              create: product.images.map((imageUrl) => ({
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
};
