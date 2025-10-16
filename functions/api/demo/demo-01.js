export async function onRequest(context) {

  const request = context.request;

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method == 'GET') {
      return new Response("You get what you ask for");
    }

    if (request.method == 'POST') {
      try {
        let input = await context.request.formData();
        let pretty = JSON.stringify([...input], null, 2);
        return new Response(pretty, {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        });
      } catch (err) {
        return new Response("Error parsing JSON content", { status: 400 });
      }
    }
  
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
}
