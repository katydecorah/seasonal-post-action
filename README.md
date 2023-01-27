# Seasonal post action

A GitHub action that creates a seasonal Jekyll post from data files.

<!-- START GENERATED DOCUMENTATION -->

## Set up the workflow

To use this action, create a new workflow in `.github/workflows` and modify it as needed:

```yml
name: Seasonal post

# Grant the action permission to write to the repository
permissions:
  contents: write
  pull-requests: write

on:
  workflow_dispatch:
    inputs:
      date:
        description: Set a specific date to run the action (YYYY-MM-DD), leave blank for today.
        type: string
  schedule:
    - cron: "00 02 20 Mar,Jun,Sep,Dec *"

jobs:
  seasonal_post:
    runs-on: macOS-latest
    name: Write seasonal post
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Write seasonal post
        uses: katydecorah/seasonal-post-action@v5.2.1
        with:
          GitHubUsername: katydecorah
          GitHubRepository: archive
        env:
          TOKEN: ${{ secrets.TOKEN }}
      - name: Commit files
        run: |
          git pull
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add -A && git commit -m "${{ env.seasonEmoji }} ${{ env.season }}"
          git push
```

## Action options

- `GitHubUsername`: Required. The GitHub username that owns the repository with the data files.

- `GitHubRepository`: Required. The Github repository that has the data files.

- `SeasonEmoji`: Emoji to assign each season (winter, spring, summer, fall). Default: `❄️,🌷,☀️,🍂`.

## Trigger the action

To trigger the action, [create a workflow dispatch event](https://docs.github.com/en/rest/actions/workflows#create-a-workflow-dispatch-event) with the following body parameters:

```js
{ 
  "ref": "main", // Required. The git reference for the workflow, a branch or tag name.
  "inputs": {
    "date": "", // Set a specific date to run the action (YYYY-MM-DD), leave blank for today.
  }
}
```
<!-- END GENERATED DOCUMENTATION -->
