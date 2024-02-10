## Overview

**PaperWit** is a fullstack Next.js app that allows you to upload any PDF file and have conversations with an AI assistant based on the uploaded file. The AI assistant uses the OpenAI API to generate responses based on the chat context.

## Use

- [X] [Next.js 14](https://nextjs.org/docs)
- [X] [React](https://react.dev/)
- [X] [Typescript](https://www.typescriptlang.org/)
- [X] [Clerk](https://clerk.com/)
- [X] [@clerk/nextjs](https://clerk.com/docs/quickstarts/nextjs)
- [X] [Drizzle ORM](https://orm.drizzle.team/)
- [X] [Drizzle-kit](https://orm.drizzle.team/kit-docs/overview)
- [X] [PostgreSQL](https://www.postgresql.org/)
- [X] [Neon PostgreSQL Serverless](https://neon.tech/)
- [X] [AWS SDK](https://www.npmjs.com/package/aws-sdk)
- [X] [OpenAI API](https://www.npmjs.com/package/openai)
- [X] [Axios](https://www.npmjs.com/package/axios)
- [X] [Pinecone](https://www.pinecone.io/)
- [X] [@tanstack/react-query](https://tanstack.com/query/latest/docs/framework/react/overview)
- [X] [clsx](https://www.npmjs.com/package/clsx)
- [X] [tailwind-merge](https://tailwindcss.com/)
- [X] [shadcn/ui](https://ui.shadcn.com/)
- [X] [Lucide React](https://lucide.dev/)
- [X] [React Dropzone](https://www.npmjs.com/package/react-dropzone)
- [X] [React Hot Toast](https://react-hot-toast.com/)

## Getting Started

### Prerequisites

#### Runtime:
- [**Node.js**](https://nodejs.org/en) - v18.0.0 or newer
  - Javascript package managers: npm, yarn or pnpm
  - (Optional) Use [**nvm**](https://github.com/nvm-sh/nvm) to manage Node.js versioning.

#### User Authentication:
- **Clerk** - Register [here](https://dashboard.clerk.com/sign-in)

#### Database & AI Services:
- [**Neon**](https://neon.tech/) - For serverless PostgreSQL database
- [**Pinecone**](https://www.pinecone.io/) - For the vector database indexing to build knowledgeable AI and querying PDFs
- [**OpenAI**](https://platform.openai.com/overview)

#### Storage:
- [**AWS S3 Bucket**](https://aws.amazon.com/) - To store application assets

#### Additional Notes:
- Remember to create accounts and obtain API keys for each service before proceeding.
- Refer to the official documentation for each service for detailed setup instructions.
- Refer to [.env.example](.env.example) file and replace the placeholders with your obtained API keys and other necessary information.

### Installation

- clone this repository
  ```bash
  git clone https://github.com/rbernanda/PaperWit.git
  ```
- install dependencies
  ```bash
  yarn install
  ```
- run development server
  ```bash
  yarn dev
  ```