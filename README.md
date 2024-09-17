Reference implementation for SmallTransfers

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## env.local

create a file called `.env.local` with the following:

```bash
SMALLTRANSFERS_SECRET_KEY=sk_test_.....
NEXT_PUBLIC_SMALLTRANSFERS_PUBLISHABLE_KEY=pk_test_.....
NEXT_PUBLIC_VERCEL_URL=localhost
SMALLTRANSFERS_PASSWORD=complex_password_at_least_32_characters_long
```

Get the secret key and publishable key from your SmallTransfers dashboard.
