export const bookFunction = {
  name: 'FindAllBooks',
  description: 'Fetches a list of books using GraphQL API',
  strict: true,
  parameters: {
    type: 'object',
    required: ['query', 'variables'],
    properties: {
      query: {
        type: 'string',
        description: 'The GraphQL query string to fetch the books',
      },
      variables: {
        type: 'object',
        description: 'Variables to be passed with the GraphQL query',
        properties: {
          title: {
            type: 'string',
            description: 'Optional: Name of the author to filter books',
          },
          category: {
            type: 'string',
            description: 'Optional: Genre of books to filter',
          },
          author: {
            type: 'string',
            description: 'Optional: Genre of books to filter',
          }
        },
        additionalProperties: false,
        strict: true,
        required: ["title", "category", "author"]
      },
    },
    additionalProperties: false,
  },
};
