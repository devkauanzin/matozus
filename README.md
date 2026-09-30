# Matozu's Hamburgueria

Site estático da hamburgueria. A aplicação não usa framework nem dependências externas de runtime; as imagens e o vídeo usados pelo site ficam em `assets/`.

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Abra `http://localhost:3000`.

## Build

```bash
npm run build
```

Os arquivos prontos para publicação são gerados em `dist/`.

## Deploy

O projeto pode ser publicado na Vercel. A configuração em `vercel.json` executa o build e publica `dist/`. Para canonical, Open Graph absoluto e sitemap, configure `SITE_URL` com o domínio de produção nas variáveis de ambiente da Vercel.

## Pedidos pelo WhatsApp

O número comercial informado está em `app.js`, na configuração `CONFIG.whatsappNumber`, somente com dígitos e código do país. Não há variáveis de ambiente necessárias para executar o site.

A taxa de entrega não foi fornecida. No checkout, pedidos para entrega mostram o total como “a confirmar com a equipe”.

## Cardápio

Os produtos e preços presentes no site foram transcritos dos materiais recebidos. Doces e bebidas aparecem como “cardápio em atualização” onde não foram fornecidos itens e preços. A composição de Doce de Leite Premium, Duplo Premium e Empanado Premium deve ser confirmada com a equipe.
