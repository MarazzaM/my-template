This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the dependencies:

```bash
npm install
```
Copy .env.example in .env

```bash
cp .env.example .env
```

Check that the docker daemon is running, then run

```bash
docker compose up -d
```
To run the schema

```bash
prisma migrate dev
```
Seed the db with 

```bash
npm run seed
```

To start the dev server run 
```bash
npm run dev
```

Pg should run in 6500
Pgadmin in 5050 to check the db
React in 3000 by default, could change if the port is in use
