---
title: REST API Quick Start
estimatedTime: 6 minutes
difficulty: beginner
---

## Authenticate

Get your API token by sending your credentials.

```bash
curl -X POST https://api.example.com/auth \
  -H "Content-Type: application/json" \
  -d '{"username": "your-username", "password": "your-password"}'
```

Save the token from the response - you'll need it for all subsequent requests.

## List all resources

Retrieve a list of all users with the token.

```bash
curl -X GET https://api.example.com/users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Create a new resource

Add a new user to the system.

```bash:1-4
curl -X POST https://api.example.com/users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice", "email": "alice@example.com"}'
```

The API returns the created user with an ID.

## Update a resource

Modify an existing user by ID.

```bash
curl -X PATCH https://api.example.com/users/123 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"email": "newemail@example.com"}'
```

## Delete a resource

Remove a user from the system.

```bash
curl -X DELETE https://api.example.com/users/123 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

A successful deletion returns a 204 No Content status.