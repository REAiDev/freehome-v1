#!/bin/bash

# Check if branch name is provided
if [ -z "$1" ]; then
  echo "Usage: ./deploy.sh <branch-name>"
  exit 1
fi

BRANCH=$1

# git init
# git remote add origin git@github.com:trucupei/freehome-frontend-home.git
git fetch origin

# Clean untracked files
git clean -fd

# Check if branch exists locally
if git show-ref --verify --quiet refs/heads/$BRANCH; then
  # Branch exists, just checkout and pull
  git checkout $BRANCH
  git pull origin $BRANCH
else
  # Branch doesn't exist, create it from origin
  git checkout -b $BRANCH origin/$BRANCH
fi

npm install
npm run build
mv .git .bk.git
vercel --prod
mv .bk.git .git
