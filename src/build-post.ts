export function buildPost({
  frontmatter,
  season,
  bookText,
  playlistText,
  recipeText,
}) {
  return `${frontmatter}

The books, music, and recipes I enjoyed this ${season.toLowerCase()}.

## Books

${bookText}

## Playlist

${playlistText}

## Recipes

${recipeText}
`;
}
