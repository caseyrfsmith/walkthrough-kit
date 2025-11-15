---
title: Quick Start Guide
estimatedTime: 5 minutes
difficulty: beginner
---

## Step 1: Install the SDK

Install the package from your preferred package manager.

```bash
npm install @mycompany/sdk
```

## Step 2: Initialize the client

Import and configure the client with your API key.

```javascript:1-4
import { Client } from '@mycompany/sdk';

const client = new Client({
  apiKey: process.env.API_KEY
});
```

This creates a client instance that you'll use for all API calls.

## Step 3: Make your first request

Now you can start making API calls.

```javascript:1-5
const response = await client.users.list({
  limit: 10
});

console.log(response.data);
```

The response includes pagination data and the requested users.
