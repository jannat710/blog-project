# Blog Platform API

## Overview

This project is a Blog Platform API built using Express.js, TypeScript, and MongoDB. It allows users to create, update, delete, and view blogs, featuring role-based access control for Users and Admins to manage their content effectively.

## Features

- **User Management**: Users can register, log in, and perform CRUD operations on their blogs.
- **Role-based Access Control**: Admins can manage users and blogs, including blocking users and deleting any blog.
- **Blog Management**: Users can create, update, and delete their own blogs.
- **Public API**: Public endpoints to fetch all blogs with support for search, sorting, and filtering.
- **Error Handling**: Proper validation and error responses for different types of issues.

## Technology Stack

- **Express.js** for API routing.
- **TypeScript** for type safety and code maintainability.
- **MongoDB** for storing blog posts and user data.
- **Mongoose** for ODM (Object Data Modeling).
- **JWT Authentication** for secure login.
- **Zod** for validation of request bodies.
- **ESLint** for code linting.
- **Prettier** for code formatting.

## Setup

### Prerequisites

- Node.js (>= 16.0.0)
- MongoDB (local or MongoDB Atlas)
- Postman or any API testing tool for testing the API

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jannat710/blog-project
   cd blog-platform
   ```
2. Install dependencies: npm install

### Running the Application

### Development Mode:

```bash
npm run start:dev
```

### Production Mode:

Build the project:

```bash
npm run build
```

Start the project:

```bash
npm run start:prod
```

Linting and Formatting
To lint your code:

```bash
npm run lint
```

To automatically fix linting issues:

```bash
npm run lint:fix
```

To format your code:

```bash
npm run format
```

## API Endpoints

### **1. Authentication**

### Register User:

- POST /api/auth/register
- Body:

```bash
json

{
"name": "John Doe",
"email": "john@example.com",
"password": "securepassword"
}
```

- Response: 201 Created

### Login User

- POST /api/auth/login
- Body:

```bash
json

  {
  "email": "john@example.com",
  "password": "securepassword"
  }
```

- Response: 200 OK with JWT token.

### **2. Blog Management**

### Create Blog:

- POST /api/blogs
- Authorization: Bearer token required.
- Body:

```bash
json

  {
  "title": "My First Blog",
  "content": "This is the content of my blog."
  }
```

- Response: 201 Created

### Update Blog:

- PATCH /api/blogs/:id
- Authorization: Bearer token required.
- Body:

```bash
json

  {
  "title": "Updated Blog Title",
  "content": "Updated content."
  }
```

- Response: 200 OK

### Delete Blog:

- DELETE /api/blogs/:id
- Authorization: Bearer token required.
- Response: 200 OK

### Get All Blogs (Public):

- GET /api/blogs
- Query Params: search, sortBy, sortOrder, filter
- Response: 200 OK

### **3. Admin Actions**

### Block User:

- PATCH /api/admin/users/:userId/block
- Authorization: Bearer admin token required.
- Response: 200 OK

### Delete Blog (Admin):

- DELETE /api/admin/blogs/:id
- Authorization: Bearer admin token required.
- Response: 200 OK

## Live Deployment Link

- #### [Blog Project Live URL](https://blog-project-henna.vercel.app)
