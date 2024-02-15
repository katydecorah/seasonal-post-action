import { readFileSync } from "fs";
import { formatBooks, formatPlaylist, formatBookmarks } from "../format";

const recipes = JSON.parse(
  readFileSync("./src/__tests__/fixtures/recipes.json", "utf-8")
);

export const { bookmarkYaml, bookmarks } = formatBookmarks({
  bookmarkKeyName: "bookmarks",
  bookmarkData: recipes,
  start: "2021-09-21",
  end: "2021-12-20",
});

it("bookmarks", () => {
  expect(bookmarks).toMatchInlineSnapshot(`
    [
      {
        "image": undefined,
        "site": "NYT Cooking",
        "title": "Gyeran Bap (Egg Rice) Recipe",
        "url": "https://cooking.nytimes.com/recipes/1022530-gyeran-bap-egg-rice",
      },
      {
        "image": undefined,
        "site": "NYT Cooking",
        "title": "Breakfast Burritos Recipe",
        "url": "https://cooking.nytimes.com/recipes/1022540-breakfast-burritos",
      },
      {
        "image": "bookmark-pressure-cooker-pot-roast-recipe.jpg",
        "site": "NYT Cooking",
        "title": "Pressure Cooker Pot Roast Recipe",
        "url": "https://cooking.nytimes.com/recipes/1020846-pressure-cooker-pot-roast",
      },
      {
        "image": "bookmark-cinnamon-maple-applesauce-recipe.jpg",
        "site": "NYT Cooking",
        "title": "Cinnamon-Maple Applesauce Recipe",
        "url": "https://cooking.nytimes.com/recipes/1022568-cinnamon-maple-applesauce",
      },
      {
        "image": "bookmark-apple-pie-filling-recipe.jpg",
        "site": "NYT Cooking",
        "title": "Apple Pie Filling Recipe",
        "url": "https://cooking.nytimes.com/recipes/1021576-apple-pie-filling",
      },
      {
        "image": "bookmark-perfect-pie-crust-recipe.jpg",
        "site": "NYT Cooking",
        "title": "Perfect Pie Crust Recipe",
        "url": "https://cooking.nytimes.com/recipes/1019713-perfect-pie-crust",
      },
      {
        "image": "bookmark-creamy-pasta-with-smoked-bacon-and-peas-recipe.jpg",
        "site": "NYT Cooking",
        "title": "Creamy Pasta With Smoked Bacon and Peas Recipe",
        "url": "https://cooking.nytimes.com/recipes/1012805-creamy-pasta-with-smoked-bacon-and-peas",
      },
      {
        "image": "bookmark-cornmeal-blueberry-pancakes-recipe.jpg",
        "site": "NYT Cooking",
        "title": "Cornmeal-Blueberry Pancakes Recipe",
        "url": "https://cooking.nytimes.com/recipes/1018177-cornmeal-blueberry-pancakes",
      },
      {
        "image": "bookmark-lemon-poppy-seed-pancakes-with-greek-yogurt-and-jam-recipe.jpg",
        "site": "NYT Cooking",
        "title": "Lemon Poppy-Seed Pancakes with Greek Yogurt and Jam Recipe",
        "url": "https://cooking.nytimes.com/recipes/12417-lemon-poppy-seed-pancakes-with-greek-yogurt-and-jam",
      },
      {
        "image": "bookmark-bacon-and-shallot-potato-salad-recipe.jpg",
        "site": "NYT Cooking",
        "title": "Bacon and Shallot Potato Salad Recipe",
        "url": "https://cooking.nytimes.com/recipes/1017404-bacon-and-shallot-potato-salad",
      },
      {
        "image": "bookmark-roasted-green-beans-with-pancetta-and-lemon-zest-recipe.jpg",
        "site": "NYT Cooking",
        "title": "Roasted Green Beans With Pancetta and Lemon Zest Recipe",
        "url": "https://cooking.nytimes.com/recipes/1020573-roasted-green-beans-with-pancetta-and-lemon-zest",
      },
      {
        "image": "bookmark-pickle-brined-fried-chicken-sandwich-recipe.jpg",
        "site": "NYT Cooking",
        "title": "Pickle-Brined Fried Chicken Sandwich Recipe",
        "url": "https://cooking.nytimes.com/recipes/1020385-pickle-brined-fried-chicken-sandwich",
      },
      {
        "image": "bookmark-rice-noodles-with-seared-pork-carrots-and-herbs-recipe.jpg",
        "site": "NYT Cooking",
        "title": "Rice Noodles With Seared Pork, Carrots and Herbs Recipe",
        "url": "https://cooking.nytimes.com/recipes/1019646-rice-noodles-with-seared-pork-carrots-and-herbs",
      },
      {
        "image": "bookmark-orange-cardamom-pancakes-recipe.jpg",
        "site": "NYT Cooking",
        "title": "Orange-Cardamom Pancakes Recipe",
        "url": "https://cooking.nytimes.com/recipes/1019947-orange-cardamom-pancakes",
      },
      {
        "image": "bookmark-small-batch-buttermilk-biscuits-recipe.jpg",
        "site": "NYT Cooking",
        "title": "Small-Batch Buttermilk Biscuits Recipe",
        "url": "https://cooking.nytimes.com/recipes/1021862-small-batch-buttermilk-biscuits",
      },
      {
        "image": "bookmark-sheet-pan-chicken-fajitas-recipe.jpg",
        "site": "NYT Cooking",
        "title": "Sheet-Pan Chicken Fajitas Recipe",
        "url": "https://cooking.nytimes.com/recipes/1020092-sheet-pan-chicken-fajitas",
      },
      {
        "image": "bookmark-ginger-scallion-chicken-recipe.jpg",
        "site": "NYT Cooking",
        "title": "Ginger-Scallion Chicken Recipe",
        "url": "https://cooking.nytimes.com/recipes/1019283-ginger-scallion-chicken",
      },
      {
        "image": "bookmark-moroccan-spiced-chicken-meatballs-recipe.jpg",
        "site": "NYT Cooking",
        "title": "Moroccan-Spiced Chicken Meatballs Recipe",
        "url": "https://cooking.nytimes.com/recipes/1022719-moroccan-spiced-chicken-meatballs",
      },
      {
        "image": "bookmark-mushroom-pasta-stir-fry-recipe.jpg",
        "site": "NYT Cooking",
        "title": "Mushroom Pasta Stir-Fry Recipe",
        "url": "https://cooking.nytimes.com/recipes/1022121-mushroom-pasta-stir-fry",
      },
      {
        "image": "bookmark-sheet-pan-crispy-pork-schnitzel-recipe.jpg",
        "site": "NYT Cooking",
        "title": "Sheet-Pan Crispy Pork Schnitzel Recipe",
        "url": "https://cooking.nytimes.com/recipes/1022582-sheet-pan-crispy-pork-schnitzel",
      },
      {
        "image": "bookmark-sugar-cookies-recipe.jpg",
        "site": "NYT Cooking",
        "title": "Sugar Cookies Recipe",
        "url": "https://cooking.nytimes.com/recipes/1018383-sugar-cookies",
      },
      {
        "image": "bookmark-the-fluffiest-royal-icing-recipe.jpg",
        "site": "NYT Cooking",
        "title": "The Fluffiest Royal Icing Recipe",
        "url": "https://cooking.nytimes.com/recipes/1019785-the-fluffiest-royal-icing",
      },
    ]
  `);
});

const playlist = JSON.parse(
  readFileSync("./src/__tests__/fixtures/playlists.json", "utf-8")
);

export const { playlistYaml, playlistTracks } = formatPlaylist({
  playlistData: playlist,
  name: "2021 Fall",
});

it("playlistTracks", () => {
  expect(playlistTracks).toMatchInlineSnapshot(`
    [
      {
        "album": "one hand on the steering wheel the other sewing a garden",
        "artist": "Ada Lea",
        "track": "can't stop me from dying",
      },
      {
        "album": "No Shadow",
        "artist": "Hyd",
        "track": "No Shadow",
      },
      {
        "album": "Trip To Japan",
        "artist": "The Shacks",
        "track": "Trip To Japan",
      },
      {
        "album": "Keeper",
        "artist": "Hana Vu",
        "track": "Maker",
      },
      {
        "album": "Doomin' Sun",
        "artist": "Bachelor, Jay Som, Palehound",
        "track": "Anything at All",
      },
      {
        "album": "Would You Mind Please Pulling Me Close?",
        "artist": "Tasha",
        "track": "Would You Mind Please Pulling Me Close?",
      },
      {
        "album": "Genesis",
        "artist": "Spencer.",
        "track": "Genesis",
      },
      {
        "album": "Old Peel",
        "artist": "Aldous Harding",
        "track": "Old Peel",
      },
      {
        "album": "Everybody's Birthday",
        "artist": "Hana Vu",
        "track": "Everybody's Birthday",
      },
      {
        "album": "The Baby",
        "artist": "Samia",
        "track": "Big Wheel",
      },
      {
        "album": "-io",
        "artist": "Circuit des Yeux",
        "track": "Dogma",
      },
      {
        "album": "private LIFE",
        "artist": "Virginia Wing",
        "track": "I'm Holding Out For Something",
      },
      {
        "album": "Blue Weekend",
        "artist": "Wolf Alice",
        "track": "Delicious Things",
      },
      {
        "album": "Bottle Episode",
        "artist": "Mandy, Indiana",
        "track": "Bottle Episode",
      },
      {
        "album": "The Gaping Mouth",
        "artist": "Lowertown",
        "track": "The Gaping Mouth",
      },
      {
        "album": "Fantasize Your Ghost",
        "artist": "Ohmme",
        "track": "3 2 4 3",
      },
      {
        "album": "You Think It's Like This But Really It's Like This",
        "artist": "Mirah",
        "track": "Of Pressure",
      },
      {
        "album": "When the Sun Comes Up",
        "artist": "Greta Morgan",
        "track": "When the Sun Comes Up",
      },
      {
        "album": "Ceremony",
        "artist": "Anna von Hausswolff",
        "track": "Mountains Crave",
      },
    ]
  `);
});

const bookData = JSON.parse(
  readFileSync("./src/__tests__/fixtures/books.json", "utf-8")
);

export const { bookYaml, books } = formatBooks({
  bookKeyName: "books",
  bookData,
  start: "2021-09-21",
  end: "2021-12-20",
});

it("books", () => {
  expect(books).toMatchInlineSnapshot(`
    [
      {
        "authors": "Emily Henry",
        "isbn": "9781984806758",
        "title": "People We Meet on Vacation",
        "url": "https://books.google.com/books/about/People_We_Meet_on_Vacation.html?hl=&id=5fooEAAAQBAJ",
      },
      {
        "authors": "Sally Rooney",
        "isbn": "9780374602611",
        "title": "Beautiful World, Where Are You",
        "url": "https://play.google.com/store/books/details?id=sL4SEAAAQBAJ",
      },
      {
        "authors": "Akwaeke Emezi",
        "isbn": "9780802165565",
        "title": "Freshwater",
        "url": "https://play.google.com/store/books/details?id=_eUoDwAAQBAJ",
      },
      {
        "authors": "Donika Kelly",
        "isbn": "9781644450536",
        "title": "The Renunciations",
        "url": "https://books.google.com/books/about/The_Renunciations.html?hl=&id=_xC-zQEACAAJ",
      },
      {
        "authors": "Helen Hoang",
        "isbn": "9780593197837",
        "title": "The Heart Principle",
        "url": "https://books.google.com/books/about/The_Heart_Principle.html?hl=&id=fzc7EAAAQBAJ",
      },
      {
        "authors": "Ottessa Moshfegh",
        "isbn": "9780143128755",
        "title": "Eileen",
        "url": "https://books.google.com/books/about/Eileen.html?hl=&id=AKqvDAAAQBAJ",
      },
      {
        "authors": "Amir Levine, Rachel Heller",
        "isbn": "9781585429134",
        "title": "Attached",
        "url": "https://books.google.com/books/about/Attached.html?hl=&id=_O0oDwAAQBAJ",
      },
      {
        "authors": "Shirley Jackson",
        "isbn": "9780606415545",
        "title": "The Haunting of Hill House",
        "url": "https://books.google.com/books/about/The_Haunting_of_Hill_House.html?hl=&id=8v3mwAEACAAJ",
      },
      {
        "authors": "Rumaan Alam",
        "isbn": "9780062667656",
        "title": "Leave the World Behind",
        "url": "https://play.google.com/store/books/details?id=UyTIDwAAQBAJ",
      },
      {
        "authors": "Jonny Sun",
        "isbn": "9780062880864",
        "title": "Goodbye, Again",
        "url": "https://play.google.com/store/books/details?id=MWinDwAAQBAJ",
      },
      {
        "authors": "Judson Brewer",
        "isbn": "9780593330456",
        "title": "Unwinding Anxiety",
        "url": "https://play.google.com/store/books/details?id=GxACEAAAQBAJ",
      },
      {
        "authors": "Cherie Dimaline",
        "isbn": "9780062975966",
        "title": "Empire of Wild",
        "url": "https://play.google.com/store/books/details?id=O5K5DwAAQBAJ",
      },
      {
        "authors": "Emily Henry",
        "isbn": "9781984806734",
        "title": "Beach Read",
        "url": "https://books.google.com/books/about/Beach_Read.html?hl=&id=vDTgDwAAQBAJ",
      },
      {
        "authors": "Nichole Perkins",
        "isbn": "9781538702741",
        "title": "Sometimes I Trip on How Happy We Could Be",
        "url": "https://books.google.com/books/about/Sometimes_I_Trip_on_How_Happy_We_Could_B.html?hl=&id=qD8czgEACAAJ",
      },
      {
        "authors": "Matt Haig",
        "isbn": "9780525559481",
        "title": "The Midnight Library",
        "url": "https://play.google.com/store/books/details?id=nNjTDwAAQBAJ",
      },
      {
        "authors": "Michael Pollan",
        "isbn": "9780593296905",
        "title": "This Is Your Mind on Plants",
        "url": "https://books.google.com/books/about/This_Is_Your_Mind_on_Plants.html?hl=&id=Fxs3EAAAQBAJ",
      },
    ]
  `);
});
