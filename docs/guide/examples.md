# Examples

## Basic quick start guide

````markdown
---
title: Quick Start Guide
estimatedTime: 5 minutes
difficulty: beginner
---

## Install the SDK

Install the package from your preferred package manager.

```bash
npm install @mycompany/sdk
```

## Initialize the client

Import and configure the client with your API key.

```javascript:1-4
import { Client } from '@mycompany/sdk';

const client = new Client({
  apiKey: process.env.API_KEY
});
```

This creates a client instance for all API calls.

## Make your first request

Use the client to fetch data from the API.

```javascript:1-3
const response = await client.users.list();
console.log(response.data);
```
````

## Unified code mode example

````markdown
---
title: Python Class Tutorial
mode: unified
difficulty: beginner
---

```python
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email

    def greet(self):
        return f"Hello, {self.name}!"

    def get_email_domain(self):
        return self.email.split('@')[1]
```

## Define the class

We start by defining a User class that will hold user information.

highlight: 1

## Add the constructor

The constructor (`__init__`) initializes the user with a name and email.

highlight: 2-4

## Add a greeting method

The `greet` method returns a personalized greeting message.

highlight: 6-7

## Add email utility

Parse the email to extract the domain name.

highlight: 9-10
````

## Git workflow tutorial

````markdown
---
title: Git Workflow Guide
estimatedTime: 10 minutes
difficulty: intermediate
---

## Clone the repository

First, clone the repository to your local machine.

```bash
git clone https://github.com/username/project.git
cd project
```

## Create a feature branch

Always create a new branch for your changes.

```bash:1
git checkout -b feature/new-feature
```

## Make your changes

Edit files and stage them for commit.

```bash
git add .
git status
```

## Commit your work

Write a descriptive commit message.

```bash:1
git commit -m "Add new feature: user authentication"
```

## Push to remote

Push your branch to the remote repository.

```bash
git push origin feature/new-feature
```

## Create pull request

Open a pull request on GitHub to merge your changes.

Go to your repository and click "New Pull Request".
````

## API documentation example

````markdown
---
title: REST API Quick Start
estimatedTime: 8 minutes
difficulty: beginner
---

## Authentication

Include your API key in the Authorization header.

```bash:1
curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.example.com/users
```

## List resources

Fetch a list of all users.

```bash
curl https://api.example.com/users
```

## Get a single resource

Fetch a specific user by ID.

```bash
curl https://api.example.com/users/123
```

## Create a resource

Create a new user with POST request.

```bash:1-4
curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

## Update a resource

Update an existing user with PATCH.

```bash:1-3
curl -X PATCH https://api.example.com/users/123 \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Jane Doe"}'
```
````

## Try the demo

See these examples in action in the demo app:

```bash
cd demo
npm install
npm run dev
```

The demo includes all these examples with interactive navigation.

## More examples

Check the `examples/` directory in the repository for more:

- `basic-guide.md` - Standard separate mode walkthrough
- `python-class.md` - Unified mode walkthrough
- `git-workflow.md` - Real-world workflow tutorial
- `api-guide.md` - REST API documentation
