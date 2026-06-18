# InterviewAI

Entrevistas simuladas adaptativas com IA, relatório com radar de competências e trilha de evolução. Next.js (App Router) + Anthropic API. Gratuito por padrão.

## Como funciona

- O navegador **nunca** fala com a Anthropic direto. Ele chama `/api/interview` (função serverless), e essa rota — no servidor — usa sua `ANTHROPIC_API_KEY` e monta os prompts. A chave nunca vai pro front.
- Histórico e evolução ficam no `localStorage` do usuário (sem banco). Para histórico multi-dispositivo, troque por um banco (ver "Próximos passos").

## Rodar localmente

```bash
npm install
cp .env.local.example .env.local   # cole sua chave em ANTHROPIC_API_KEY
npm run dev                         # http://localhost:3000
```

Crie a chave em https://console.anthropic.com → Account Settings → API Keys.

## Deploy no Vercel

1. Suba o projeto para um repositório no GitHub/GitLab/Bitbucket.
2. Em https://vercel.com → **Add New → Project** → importe o repositório.
3. Framework: o Vercel detecta **Next.js** automaticamente. Não mude nada.
4. **Settings → Environment Variables** → adicione:
   - `ANTHROPIC_API_KEY` = sua chave (`sk-ant-...`)
   - Marque os ambientes Production, Preview e Development.
5. **Deploy**. Pronto.

> Sempre que mudar a env var, faça um novo deploy (**Redeploy**) para ela valer.

### Alternativa: Vercel AI Gateway

Se quiser observabilidade/troca de provider, use o AI Gateway. Em `app/api/interview/route.js`, troque a criação do client por:

```js
new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: "https://ai-gateway.vercel.sh",
});
```

e defina `AI_GATEWAY_API_KEY` no Vercel.

## ⚠️ Antes de divulgar publicamente (importante)

A rota `/api/interview` é aberta. Sem proteção, qualquer um pode automatizar chamadas e **gastar seus créditos da Anthropic**. Antes de compartilhar o link, adicione pelo menos um destes:

- **Rate limit** por IP (ex.: `@upstash/ratelimit` + Upstash Redis).
- **Login** (ex.: Clerk, Auth.js/NextAuth) e exigir sessão na rota.
- Limite de uso por usuário no front + verificação no back.

## Próximos passos sugeridos

- Histórico multi-dispositivo: Postgres (Neon/Supabase) ou Vercel Postgres, com auth.
- Exportar relatório em PDF.
- Banco de perguntas por área (Capítulo 11 da documentação).
- Análise de vídeo real (backend) — com as ressalvas legais do Capítulo 15.

## Stack

Next.js 14 · React 18 · recharts · @anthropic-ai/sdk · modelo `claude-sonnet-4-6`.
