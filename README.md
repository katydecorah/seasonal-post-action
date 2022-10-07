# Seasonal post action

A GitHub action that creates a seasonal Jekyll post from data files.

<!-- START GENERATED DOCUMENTATION -->

## Set up the workflow

To use this action, create a new workflow in `.github/workflows` and modify it as needed:

```yml
name: Seasonal post

on:
  workflow_dispatch: # enables run button on github.com
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
          GitHubRepository: has
        env:
          TOKEN: ${{ secrets.TOKEN }}
          # SETDATE: "2021-06-20"
      - name: Commit files
        run: |
          git pull
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add -A && git commit -m "${{ env.season }}"
          git push
```


## Action options

- `GitHubUsername`: Required. The GitHub username that owns the repository with the data files.
- `GitHubRepository`: Required. The Github repository that has the data files.
<!-- END GENERATED DOCUMENTATION -->
````
