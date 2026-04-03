# DevForum

DevForum is a full-stack developer Q&A platform built with Next.js, React, TypeScript, MongoDB, and Auth.js. The project focuses on community-driven knowledge sharing by allowing users to sign in, ask technical questions, publish answers, vote on content, save useful posts, browse developer profiles, and explore topic-based tags. It also includes an OpenAI-powered assistant that can help users draft or improve answers inside the editor.

## Live Demo

[Open the deployed app](https://dev-forum-es7zro72p-moamenshehab12-8620s-projects.vercel.app/)

## Project Overview

The goal of DevForum is to recreate the core experience of a modern developer community platform while using a clean and scalable full-stack architecture. The application uses the Next.js App Router, server actions for business logic, API routes for service endpoints, MongoDB with Mongoose for persistence, and Auth.js for both credential-based and OAuth authentication.

This project was built to demonstrate:

- full-stack application development with Next.js 15 and React 19
- authentication using email/password, GitHub, and Google
- schema validation with Zod and form handling with React Hook Form
- reusable database models and server-side data workflows with Mongoose
- AI-enhanced product functionality using the OpenAI SDK
- responsive UI construction with Tailwind CSS and Radix UI primitives

## Core Features

### Authentication and User Access

- Sign up and sign in using credentials
- OAuth authentication with GitHub and Google
- Secure password hashing with `bcryptjs`
- Session management with Auth.js

### Questions and Answers

- Create and edit questions
- Add up to three tags per question
- Write long-form content using a rich markdown editor
- View question details with author, views, answer count, and tags
- Post answers with validation
- Sort answers by newest, oldest, or popularity

### Community Interactions

- Upvote and downvote questions and answers
- Save questions to a personal collection
- Browse community members
- Visit profile pages with user stats, top posts, answers, and top tags
- Explore tags and filter tagged questions

### Search, Filters, and Navigation

- Search questions from the home page
- Filter questions by newest, unanswered, or popularity
- Search and filter saved questions
- Search users in the community page
- Search tags and browse related questions
- Paginated listing views across major pages

### AI-Powered Answer Assistance

- Generate AI-assisted answers from the question title and content
- Improve a draft answer before submitting it
- Return markdown-formatted output directly into the editor

## Tech Stack

### Frontend

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Radix UI
- MDX Editor
- Sonner

### Backend and Data

- Next.js App Router
- Next.js Server Actions
- Next.js API Routes
- MongoDB Atlas
- Mongoose

### Authentication and Validation

- Auth.js / NextAuth
- `bcryptjs`
- Zod
- React Hook Form

### AI and Utilities

- AI SDK
- OpenAI SDK integration
- Day.js
- Pino logger

## Architecture

The codebase is organized around clear responsibilities:

- `app/`: route segments, layouts, and API endpoints
- `components/`: reusable UI components, forms, cards, editor, filters, and navigation
- `database/`: Mongoose models for users, accounts, questions, answers, votes, collections, and tags
- `lib/actions/`: server actions for auth, questions, answers, voting, collections, and users
- `lib/handlers/`: shared request, validation, and error-handling helpers
- `constants/`: route definitions, filters, and static UI states
- `context/`: app-level providers such as theming
- `types/`: shared TypeScript interfaces and action types

### High-Level Flow

1. Users authenticate using credentials or OAuth.
2. Server actions validate incoming data with Zod.
3. The application connects to MongoDB through Mongoose.
4. Data is read or updated through reusable models and actions.
5. Pages render through the App Router using server and client components.
6. The AI endpoint can generate markdown answers that are injected into the editor before submission.

## Main Pages

- `/`: Home feed with search, filters, pagination, and question cards
- `/sign-in`: Sign in page
- `/sign-up`: Registration page
- `/ask-question`: Question creation page with markdown editor and tag input
- `/questions/[id]`: Question details, voting, saving, answers, and answer form
- `/questions/[id]/edit`: Question editing page
- `/collection`: Saved questions for the authenticated user
- `/community`: Browse and search users
- `/profile/[id]`: User profile, top posts, answers, and top tags
- `/tags`: Tag directory
- `/tags/[id]`: Questions associated with a specific tag

## Data Model

The application is centered around these main entities:

- `User`: stores profile details such as name, username, email, bio, image, location, and portfolio
- `Account`: stores authentication provider information and hashed credentials
- `Question`: stores title, content, tags, views, vote counts, answer count, and author
- `Answer`: stores answer content, vote counts, author, and linked question
- `Vote`: tracks a user's upvote or downvote on a question or answer
- `Collection`: stores saved questions for each user
- `Tag` and `TagQuestion`: support tag management and question-tag relationships

## Getting Started

### Prerequisites

Make sure you have the following installed or configured:

- Node.js 20 or newer
- npm
- A MongoDB Atlas database
- A GitHub OAuth app
- A Google OAuth app
- An OpenAI API key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Moamen112/DevForum.git
cd dev-forum
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the project root and add the required environment variables:

```env
AUTH_SECRET=your_auth_secret
AUTH_GITHUB_ID=your_github_client_id
AUTH_GITHUB_SECRET=your_github_client_secret
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
API_BASE_URL=http://localhost:3000/api
```

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

- `npm run dev`: starts the local development server using Turbopack
- `npm run build`: creates a production build
- `npm run start`: starts the production server
- `npm run lint`: runs ESLint

## Environment Variables

| Variable | Description |
| --- | --- |
| `AUTH_SECRET` | Secret used by Auth.js for signing sessions |
| `AUTH_GITHUB_ID` | GitHub OAuth client ID |
| `AUTH_GITHUB_SECRET` | GitHub OAuth client secret |
| `AUTH_GOOGLE_ID` | Google OAuth client ID |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `OPENAI_API_KEY` | API key for AI answer generation |
| `API_BASE_URL` | Base URL used by internal fetch helpers, defaults to local API routes |

## OAuth Callback URLs

When configuring Google and GitHub OAuth, use callback URLs similar to:

### Local Development

- `http://localhost:3000/api/auth/callback/github`
- `http://localhost:3000/api/auth/callback/google`

### Production

- `https://dev-forum-es7zro72p-moamenshehab12-8620s-projects.vercel.app/api/auth/callback/github`
- `https://dev-forum-es7zro72p-moamenshehab12-8620s-projects.vercel.app/api/auth/callback/google`

## Deployment

The project is deployed on Vercel:

- Live URL: [DevForum on Vercel](https://dev-forum-es7zro72p-moamenshehab12-8620s-projects.vercel.app/)

To deploy your own version:

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Add the same environment variables from `.env.local` to the Vercel project settings.
4. Update GitHub and Google OAuth callback URLs to match your deployed domain.
5. Make sure your MongoDB Atlas network access settings allow the deployed app to connect.

## Troubleshooting

### MongoDB SRV / DNS Errors

If you see an error similar to:

```txt
querySrv ENOTFOUND _mongodb._tcp.<your-cluster>.mongodb.net
```

try the following:

- verify that your MongoDB Atlas cluster hostname is correct
- copy a fresh connection string from Atlas instead of reusing an old one
- check whether your current network blocks SRV DNS lookups
- if needed, switch from `mongodb+srv://` to the standard `mongodb://` connection string provided by Atlas

### OAuth Issues

- verify the client ID and secret values in `.env.local`
- confirm callback URLs are exactly the same in the provider dashboard
- restart the development server after changing environment variables

### OpenAI Issues

- make sure `OPENAI_API_KEY` is defined
- confirm your API key has access to the configured model

## Roadmap

Planned or partially scaffolded improvements include:

- implementing the jobs section
- adding a real recommendation algorithm for the recommended feed
- expanding reputation and badge logic
- adding tests for core server actions and API routes
- improving moderation and community management features

## Why This Project Matters

DevForum demonstrates how to build a complete product-style application instead of a single isolated feature. It combines authentication, data modeling, server logic, validation, API integration, AI functionality, and responsive UI design in one cohesive codebase. It is a strong portfolio project for showcasing full-stack engineering skills with modern React and Next.js tooling.
