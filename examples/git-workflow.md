---
title: Git Workflow Guide
estimatedTime: 5 minutes
difficulty: beginner
---

## Create a new branch

Start by creating a feature branch from main.

```bash
git checkout -b feature/new-feature
```

This creates and switches to a new branch in one command.

## Make your changes

Stage your modified files for commit.

```bash
git add .
```

The dot means "add all changed files in the current directory."

## Commit with a message

Save your changes with a descriptive commit message.

```bash
git commit -m "feat: add new feature"
```

Use conventional commit prefixes like `feat:`, `fix:`, or `docs:` for clarity.

## Push to remote

Upload your branch to the remote repository.

```bash
git push origin feature/new-feature
```

## Create a pull request

Now go to GitHub and open a pull request to merge your changes into main.

You can do this from the command line too:

```bash
gh pr create --title "Add new feature" --body "Description here"
```

This requires the GitHub CLI (`gh`) to be installed.