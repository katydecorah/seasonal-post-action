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
        uses: katydecorah/seasonal-post-action@v5.4.0
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

 ### Additional example workflows

<details>
<summary>Manually trigger the action</summary>

```yml
name: Manually trigger the action

on:
  workflow_dispatch:
    inputs:
      date:
        description: Set a specific date to run the action (YYYY-MM-DD), leave blank for today.
        type: string

jobs:
  seasonal_post:
    runs-on: macOS-latest
    name: Write seasonal post
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Write seasonal post
        uses: katydecorah/seasonal-post-action@v5.4.0
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

</details>

<details>
<summary>Uses a custom markdown template (`SeasonalPostTemplate`) and customizes the `PostsDir`, with a manual workflow trigger.</summary>

```yml
name: Uses a custom markdown template (`SeasonalPostTemplate`) and customizes the `PostsDir`, with a manual workflow trigger.

on:
  workflow_dispatch:
    inputs:
      date:
        description: Set a specific date to run the action (YYYY-MM-DD), leave blank for today.
        type: string

jobs:
  seasonal_post:
    runs-on: macOS-latest
    name: Write seasonal post
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Write seasonal post
        uses: katydecorah/seasonal-post-action@v5.4.0
        with:
          GitHubUsername: katydecorah
          GitHubRepository: archive
          SeasonalPostTemplate: .github/actions/seasonal-post-template-basic.md
          PostsDir: books/
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

</details>


## Action options

- `GitHubUsername`: Required. The GitHub username that owns the repository with the data files.

- `GitHubRepository`: Required. The Github repository that has the data files.

- `SeasonNames`: The season names in order by the season that ends in March, June, September, and then December. Default: `Winter,Spring,Summer,Fall`.

- `SeasonEmoji`: Emoji to assign each season in the same order as described by `SeasonNames`. Default: `❄️,🌷,☀️,🍂`.

- `PostsDir`: The path to where you want to save your seasonal post files to in this repository. Default: `notes/_posts/`.

- `SeasonalPostTemplate`: If you'd like to customize the [markdown template](src/template.md), define a path to your own. Example: `SeasonalPostTemplate: .github/actions/seasonal-post-template.md`. The markdown template shows all the available variables and an idea for how you may want to format this file. For now, the templating is simplistic and does not offer functionality outside of this action replacing variable names.
<!-- END GENERATED DOCUMENTATION -->
