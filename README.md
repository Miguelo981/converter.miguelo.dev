# converter.miguelo.dev

An image format converter built with Next.js. It allows users to convert images from one format to another seamlessly.

## Installation

To get started with the project, follow these steps:

Clone the repository:

```shell
git clone https://github.com/Miguelo981/converter.miguelo.dev.git
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration

The project requires two environment variables to be set:

- NEXT_PUBLIC_MAX_FILE_SIZE: This variable specifies the maximum file size (in bytes) allowed for image uploads.
- NEXT_PUBLIC_TIMEOUT_MS: This variable sets the timeout duration (in milliseconds) for image conversion requests.
You can configure these variables by creating a .env.local file in the project root and adding the following lines:

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
