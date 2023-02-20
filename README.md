# Seasonal post action

A GitHub action that creates a seasonal post from data files generated by [read-action](https://github.com/katydecorah/read-action), [bookmark-action](https://github.com/katydecorah/bookmark-action), and [spotify-to-yaml-action](https://github.com/katydecorah/spotify-to-yaml-action).

If you're including playlist data generated by the spotify-to-yaml-action, you'll want to make sure it's schedule to run before this action.

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
        uses: katydecorah/seasonal-post-action@v6.0.0
        with:
          github-username: katydecorah
          github-repository: archive
          source-bookmarks: recipes|_data/recipes.json
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
        uses: katydecorah/seasonal-post-action@v6.0.0
        with:
          github-username: katydecorah
          github-repository: archive
          source-bookmarks: recipes|_data/recipes.json
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
<summary>Uses a custom markdown template (`seasonal-post-template`) and customizes the `posts-directory`, with a manual workflow trigger.</summary>

```yml
name: Uses a custom markdown template (`seasonal-post-template`) and customizes the `posts-directory`, with a manual workflow trigger.

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
        uses: katydecorah/seasonal-post-action@v6.0.0
        with:
          github-username: katydecorah
          github-repository: archive
          seasonal-post-template: .github/actions/seasonal-post-template-basic.md
          posts-directory: books/
          source-bookmarks: recipes|_data/recipes.json
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

- `github-username`: Required. The GitHub username that owns the repository with the data files.

- `github-repository`: Required. The Github repository that has the data files.

- `season-names`: The season names in order by the season that ends in March, June, September, and then December. Default: `Winter,Spring,Summer,Fall`.

- `season-emoji`: Emoji to assign each season in the same order as described by `season-names`. Default: `❄️,🌷,☀️,🍂`.

- `posts-directory`: The path to where you want to save your seasonal post files to in this repository. Default: `notes/_posts/`.

- `seasonal-post-template`: If you'd like to customize the [markdown template](src/template.md), define a path to your own. Example: `seasonal-post-template: .github/actions/seasonal-post-template.md`. The markdown template shows all the available variables and an idea for how you may want to format this file. For now, the templating is simplistic and does not offer functionality outside of this action replacing variable names.

- `source-books`: Define the label and file path for the books data generated by [read-action](https://github.com/katydecorah/read-action). Separate the label and file path with a pipe (`|`). If you do not have books, set this value to `false`. Note: this value will **not** change the variable name in the markdown template, which is `bookYaml` and `bookMarkdown`. Default: `books|_data/read.json`.

- `source-bookmarks`: Define the label and file path for the bookmarks data generated by [bookmark-action](https://github.com/katydecorah/bookmark-action). Separate the label and file path with a pipe (`|`). If you do not have bookmarks, set this value to `false`. Note: this value will **not** change the variable name in the markdown template, which is `bookmarkYaml` and `bookmarkMarkdown`. Default: `bookmarks|_data/bookmarks.json`.

- `source-playlist`: Define the file path for the playlist data generated by [spotify-to-yaml-action](https://github.com/katydecorah/spotify-to-yaml-action). If you do not have playlists, set this value to `false`. Default: `_data/playlists.yml`.
<!-- END GENERATED DOCUMENTATION -->
