import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'API Documentation',
    description: 'API 문서',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes/index.ts']; 

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
  require('./app.ts'); 
});
