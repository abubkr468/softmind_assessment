import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Softmind Assessment API',
    version: '1.0.0',
  },
  servers: [{ url: 'http://localhost:5001' }],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./src/swagger/docs.ts'],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);

