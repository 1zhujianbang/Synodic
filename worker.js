export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname === '/endpoint') {
      const origin = request.headers.get('Origin')
      const corsHeaders = {
        'Access-Control-Allow-Origin': origin ?? '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        'Access-Control-Max-Age': '86400',
      }

      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: corsHeaders })
      }

      if (request.method !== 'POST') {
        return new Response('Method Not Allowed', {
          status: 405,
          headers: { ...corsHeaders, Allow: 'POST, OPTIONS' },
        })
      }

      const auth = request.headers.get('Authorization') ?? ''
      const expected = `Bearer ${env.TOKEN ?? ''}`
      if (!env.TOKEN || auth !== expected) {
        return new Response('Unauthorized', { status: 401, headers: corsHeaders })
      }

      let payload
      try {
        payload = await request.json()
      } catch {
        return new Response('Bad Request', { status: 400, headers: corsHeaders })
      }

      if (payload?.point === 'ping') {
        return Response.json(
          {
            ok: true,
            point: 'pong',
            ts: new Date().toISOString(),
          },
          { headers: corsHeaders },
        )
      }

      return Response.json(
        {
          ok: false,
          error: 'unknown_point',
        },
        { status: 400, headers: corsHeaders },
      )
    }

    return env.ASSETS.fetch(request)
  },
}
