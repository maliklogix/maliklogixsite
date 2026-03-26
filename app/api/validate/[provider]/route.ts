import { NextResponse } from 'next/server';

type ResultType = {
  success: boolean;
  status: number;
  type: string;
  message: string;
  details?: any;
};

const providers: Record<string, (key: string) => Promise<ResultType>> = {
  // ═══════════════════════ AI MODELS ═══════════════════════
  openai: async (key) => {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Say hi' }],
        max_tokens: 5,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      const msg = data.error?.message || JSON.stringify(data.error || data);
      let type = 'error';
      if (res.status === 401) type = 'invalid';
      if (res.status === 429) type = 'rate_limited';
      if (res.status === 402) type = 'insufficient_credits';
      return { success: false, status: res.status, type, message: msg };
    }
    return {
      success: true, status: 200, type: 'valid',
      message: 'API key is valid',
      details: {
        model: data.model,
        usage: data.usage,
        organization: res.headers.get('openai-organization') || 'N/A',
      },
    };
  },

  anthropic: async (key) => {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 5,
        messages: [{ role: 'user', content: 'Say hi' }],
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      const msg = data.error?.message || JSON.stringify(data.error || data);
      const type = res.status === 401 ? 'invalid' : res.status === 429 ? 'rate_limited' : 'error';
      return { success: false, status: res.status, type, message: msg };
    }
    return {
      success: true, status: 200, type: 'valid',
      message: 'API key is valid',
      details: { model: data.model, usage: data.usage },
    };
  },

  gemini: async (key) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(key)}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'Say hi' }] }],
        generationConfig: { maxOutputTokens: 5 },
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      const msg = data.error?.message || JSON.stringify(data.error || data);
      const type = res.status === 400 ? 'invalid' : res.status === 429 ? 'rate_limited' : res.status === 403 ? 'api_disabled' : 'error';
      return { success: false, status: res.status, type, message: msg };
    }
    return {
      success: true, status: 200, type: 'valid',
      message: 'API key is valid',
      details: { model: 'gemini-2.0-flash', candidates: data.candidates?.length || 0 },
    };
  },

  mistral: async (key) => {
    const res = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: [{ role: 'user', content: 'Say hi' }],
        max_tokens: 5,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      const msg = data.error?.message || data.message || JSON.stringify(data);
      const type = res.status === 401 ? 'invalid' : res.status === 429 ? 'rate_limited' : 'error';
      return { success: false, status: res.status, type, message: msg };
    }
    return {
      success: true, status: 200, type: 'valid',
      message: 'API key is valid',
      details: { model: data.model, usage: data.usage },
    };
  },

  deepseek: async (key) => {
    const res = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: 'Say hi' }],
        max_tokens: 5,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      const msg = data.error?.message || data.message || JSON.stringify(data);
      const type = res.status === 401 ? 'invalid' : res.status === 429 ? 'rate_limited' : 'error';
      return { success: false, status: res.status, type, message: msg };
    }
    return {
      success: true, status: 200, type: 'valid',
      message: 'API key is valid',
      details: { model: data.model, usage: data.usage },
    };
  },

  groq: async (key) => {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: 'Say hi' }],
        max_tokens: 5,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      const msg = data.error?.message || JSON.stringify(data.error || data);
      const type = res.status === 401 ? 'invalid' : res.status === 429 ? 'rate_limited' : 'error';
      return { success: false, status: res.status, type, message: msg };
    }
    return {
      success: true, status: 200, type: 'valid',
      message: 'API key is valid',
      details: {
        model: data.model,
        usage: data.usage,
        system_fingerprint: data.system_fingerprint,
      },
    };
  },

  cohere: async (key) => {
    const res = await fetch('https://api.cohere.com/v2/chat', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'command-r',
        messages: [{ role: 'user', content: 'Say hi' }],
        max_tokens: 5,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      const msg = data.message || JSON.stringify(data);
      const type = res.status === 401 ? 'invalid' : res.status === 429 ? 'rate_limited' : 'error';
      return { success: false, status: res.status, type, message: msg };
    }
    return {
      success: true, status: 200, type: 'valid',
      message: 'API key is valid',
      details: { model: data.model || 'command-r' },
    };
  },

  // ═══════════════════════ IMAGE GENERATION ═══════════════════════
  leonardo: async (key) => {
    const res = await fetch('https://cloud.leonardo.ai/api/rest/v1/me', {
      headers: { 'Authorization': `Bearer ${key}` },
    });
    const data = await res.json();
    if (!res.ok) {
      const msg = data.error || data.message || JSON.stringify(data);
      const type = res.status === 401 ? 'invalid' : res.status === 403 ? 'forbidden' : 'error';
      return { success: false, status: res.status, type, message: msg };
    }
    const info = data.user_details?.[0] || data;
    return {
      success: true, status: 200, type: 'valid',
      message: 'API key is valid',
      details: {
        username: info.user?.username || 'N/A',
        tokenRenewalDate: info.tokenRenewalDate || 'N/A',
        apiConcurrencySlots: info.apiConcurrencySlots || 'N/A',
      },
    };
  },

  fal: async (key) => {
    const res = await fetch('https://queue.fal.run/fal-ai/flux/schnell', {
      method: 'POST',
      headers: { 'Authorization': `Key ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'test',
        image_size: { width: 256, height: 256 },
        num_images: 1,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      const msg = data.detail || data.message || JSON.stringify(data);
      const type = res.status === 401 ? 'invalid' : res.status === 403 ? 'forbidden' : 'error';
      return { success: false, status: res.status, type, message: msg };
    }
    return {
      success: true, status: 200, type: 'valid',
      message: 'API key is valid — job submitted successfully',
      details: { request_id: data.request_id || 'Accepted', status: data.status || 'IN_QUEUE' },
    };
  },

  // ═══════════════════════ SOCIAL & PLATFORMS ═══════════════════════
  facebook: async (key) => {
    const res = await fetch(`https://graph.facebook.com/v19.0/me?access_token=${encodeURIComponent(key)}`);
    const data = await res.json();
    if (data.error) {
      let type = 'invalid';
      if (data.error.code === 190) type = 'expired';
      return { success: false, status: 400, type, message: data.error.message };
    }
    return {
      success: true, status: 200, type: 'valid',
      message: 'Access token is valid',
      details: { name: data.name, id: data.id },
    };
  },

  youtube: async (key) => {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=1&key=${encodeURIComponent(key)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) {
      const msg = data.error?.message || JSON.stringify(data.error || data);
      const type = res.status === 400 ? 'invalid' : res.status === 403 ? 'quota_exceeded' : 'error';
      return { success: false, status: res.status, type, message: msg };
    }
    const video = data.items?.[0];
    return {
      success: true, status: 200, type: 'valid',
      message: 'API key is valid',
      details: {
        totalResults: data.pageInfo?.totalResults || 0,
        sampleVideo: video?.snippet?.title || 'N/A',
      },
    };
  },

  linkedin: async (key) => {
    const res = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: { 'Authorization': `Bearer ${key}` },
    });
    const data = await res.json();
    if (!res.ok) {
      const msg = data.message || JSON.stringify(data);
      return { success: false, status: res.status, type: 'invalid', message: msg };
    }
    return {
      success: true, status: 200, type: 'valid',
      message: 'Access token is valid',
      details: { name: data.name || `${data.given_name} ${data.family_name}`, email: data.email },
    };
  },

  tiktok: async (key) => {
    const res = await fetch('https://open.tiktokapis.com/v2/user/info/?fields=display_name,avatar_url', {
      headers: { 'Authorization': `Bearer ${key}` },
    });
    const data = await res.json();
    if (!res.ok || data.error?.code) {
      const msg = data.error?.message || JSON.stringify(data);
      return { success: false, status: res.status, type: 'invalid', message: msg };
    }
    return {
      success: true, status: 200, type: 'valid',
      message: 'Access token is valid',
      details: { display_name: data.data?.user?.display_name || 'N/A' },
    };
  },

  pinterest: async (key) => {
    const res = await fetch('https://api.pinterest.com/v5/user_account', {
      headers: { 'Authorization': `Bearer ${key}` },
    });
    const data = await res.json();
    if (!res.ok) {
      const msg = data.message || JSON.stringify(data);
      return { success: false, status: res.status, type: 'invalid', message: msg };
    }
    return {
      success: true, status: 200, type: 'valid',
      message: 'Access token is valid',
      details: { username: data.username, account_type: data.account_type },
    };
  },

  stripe: async (key) => {
    const res = await fetch('https://api.stripe.com/v1/balance', {
      headers: { 'Authorization': `Bearer ${key}` },
    });
    const data = await res.json();
    if (!res.ok) {
      const msg = data.error?.message || JSON.stringify(data.error || data);
      return { success: false, status: res.status, type: 'invalid', message: msg };
    }
    const isTest = key.startsWith('sk_test_') || key.startsWith('rk_test_');
    const available = data.available || [];
    return {
      success: true, status: 200, type: 'valid',
      message: `API key is valid (${isTest ? 'Test Mode' : 'Live Mode'})`,
      details: {
        mode: isTest ? 'test' : 'live',
        livemode: data.livemode,
        balance: available.map((b: any) => `${(b.amount / 100).toFixed(2)} ${b.currency.toUpperCase()}`).join(', ') || '0.00',
      },
    };
  },
};

export async function POST(req: Request, { params }: { params: Promise<{ provider: string }> }) {
  const { provider } = await params;

  try {
    const body = await req.json();
    const key = body.key?.trim();

    if (!key) {
      return NextResponse.json({ success: false, status: 400, type: 'error', message: 'API key is required', responseTime: 0 }, { status: 400 });
    }

    const handler = providers[provider];
    if (!handler) {
      return NextResponse.json({ success: false, status: 404, type: 'error', message: `Unknown provider: ${provider}`, responseTime: 0 }, { status: 404 });
    }

    const start = Date.now();
    try {
      const result = await handler(key);
      const responseTime = Date.now() - start;
      return NextResponse.json({ ...result, responseTime }, { status: 200 });
    } catch (err: any) {
      return NextResponse.json({
        success: false,
        status: 500,
        type: 'error',
        message: `Connection failed: ${err.message}`,
        responseTime: Date.now() - start,
      }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, status: 400, type: 'error', message: 'Invalid request', responseTime: 0 }, { status: 400 });
  }
}
