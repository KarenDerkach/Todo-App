This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

##  Task Manager Project Description

Your objective is to create a very simple task manager using this Next.JS bootstrapped project
Development steps, please keep in mind that we are assessing the ability of a dev to create commits for each successful step
1. Fork this project into your own GitHub repo.
2. Using the provided API fetch the list of todos and create a simple table for these todos
 Your todo list needs to be able to update a record (and return the list of records updated) and delete a record (and return the list of records without the deleted one)
3. Add firebase (or any other cloud DB) to store the tasks and change the API so that it communicates with that DB
 Credentials should be stored in an [.env var](https://nextjs.org/docs/basic-features/environment-variables) and used in the API as a server-side rendered item and not in the client front end
4. Deploy to Vercel, add credentials, test, and share the link back with us
5. Optional Bonus: add login/login auth with JWT and auth users that will use the todo list

Design: https://www.figma.com/file/e2z5BD5mtYQjAlHAWAnCF4/Double-slash-Take-Away-Test
Font: https://fonts.google.com/specimen/Poppins

## Getting Started With Next.JS

First, run the development server:

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
