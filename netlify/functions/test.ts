import type { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  const query = event.queryStringParameters;
  return {
    body: JSON.stringify(query),
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
  };
};
