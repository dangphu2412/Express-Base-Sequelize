import { SwaggerNode } from '../libs/swaggerNode';

// const getUsers = {
//   tags: ['Users'],
//   description: 'Returns all pets from the system that the user has access to',
//   operationId: 'getPets',
//   security: [
//       {
//           bearerAuth: [],
//       },
//   ],
//   responses: {
//       200: {
//           description: 'A list of pets.',
//           content: {
//               'application/json': {
//                   schema: {
//                       type: 'array',
//                       items: {
//                           pet_name: {
//                               type: 'string',
//                               description: 'Pet Name',
//                           },
//                           pet_age: {
//                               type: 'string',
//                               description: 'Pet Age',
//                           },
//                       },
//                   },
//               },
//           },
//       },
//   },
// };

const options = {
  openapi: '3.0.1',
  info: {
      version: '1.0.0',
      title: 'APIs Document',
      description: 'API description',
      termsOfService: '',
      contact: {
          name: 'Dang Ngoc Phu',
          email: 'dangphu241299@gmail.com',
      },
      // license: {
      //     name: 'Apache 2.0',
      //     url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
      // },
  },
  servers: [
    {
        url: 'http://localhost:3000/api/v1',
        description: 'Local server',
        variables: {
          env: {
              default: 'app-dev',
              description: 'DEV Environment',
          },
          port: {
              enum: [
                  '8443',
                  '3000',
                  '443',
              ],
              default: '3000',
          },
          basePath: {
              default: 'api/v1',
          },
      },
    },
    {
        url: 'https://app-dev.herokuapp.com/api/v1',
        description: 'DEV Env',
    },
    {
        url: 'https://app-uat.herokuapp.com/api/v1',
        description: 'PRE Production',
    },
  ],
  auth: true,
};

export const swaggerConfig = () => SwaggerNode.config(options);
