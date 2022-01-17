# Seasonal post action

A GitHub action that creates a seasonal Jekyll post from data files.


<!-- START GENERATED DOCUMENTATION -->

## Set up the workflow

To use this action, create a new workflow in `.github/workflows` and modify it as needed:

```yml
name: Seasonal post

on: push

jobs:
  seasonal_post:
    runs-on: macOS-latest
    name: Write seasonal post
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Write seasonal post
        uses: katydecorah/seasonal-post-action@v2.0.0
        env:
          TOKEN: ${{ secrets.TOKEN }}
      - name: Commit files
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git commit -am "${{ env.season }}"
          git push
```<!-- END GENERATED DOCUMENTATION -->
