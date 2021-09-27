# Seasonal post action

A GitHub action that creates a seasonal Jekyll post from data files.

## Set up

Create `.github/workflows/seasonal.yml` file using the following template:

<!-- START GENERATED SETUP -->

```yml
name: Seasonal post

on: [push]

jobs:
  seasonal_post:
    runs-on: macOS-latest
    name: Write seasonal post
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Write seasonal post
        uses: katydecorah/seasonal-post-action@v0.1.0
        env:
          TOKEN: ${{ secrets.TOKEN }}
      - name: Commit files
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add -A && git commit -m "${{ env.season }}"
          git push "https://${GITHUB_ACTOR}:${{secrets.GITHUB_TOKEN}}@github.com/${GITHUB_REPOSITORY}.git" HEAD:${GITHUB_REF}
```

<!-- END GENERATED SETUP -->
