This is a [Next.js](https://nextjs.org/) E-Commerce site (in progress).

Using MongoDB, next-auth, Tailwindcss.

[View Demo Page](https://nextjs-ecommerce-sunyrora.vercel.app/)

[<img src='./doc/img/demo.png' height='200' />](https://nextjs-ecommerce-sunyrora.vercel.app/)

## Configuration

Create .env.development(.env.local for production build) on the root and define these values:

> `MONGO_URI`=[Your MongoDB URI]

> `GOOGLE_CLIENT_ID`=[GOOGLE CLIENT ID created from Google APIs & Services - [OAuth Credntials](https://console.cloud.google.com/apis/dashboard?)]

> `GOOGLE_CLIENT_SECRET`=[The value from OAuth Credntials like above]

> `NEXTAUTH_SECRET`=[SHA hash]
>
> > [Read this documentation](https://next-auth.js.org/configuration/options#secret)

> > You don't need this value for development.

## Run

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
