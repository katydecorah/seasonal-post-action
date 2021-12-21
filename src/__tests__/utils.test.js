import {
  findSeason,
  formatFrontMatter,
  formatBooks,
  formatRecipes,
  formatPlaylist,
  buildPost,
} from "../utils.js";
import { readFileSync } from "fs";

const books = JSON.parse(
  readFileSync("./src/__tests__/fixtures/books.json", "utf-8")
);
const { bookYaml, bookText } = formatBooks({
  bookData: books,
  start: "2021-09-21",
  end: "2021-12-20",
});
const recipes = JSON.parse(
  readFileSync("./src/__tests__/fixtures/recipes.json", "utf-8")
);
const { recipeYaml, recipeText } = formatRecipes({
  recipeData: recipes,
  start: "2021-09-21",
  end: "2021-12-20",
});

const playlist = JSON.parse(
  readFileSync("./src/__tests__/fixtures/playlists.json", "utf-8")
);

const { playlistYaml, playlistText } = formatPlaylist({
  playlistData: playlist,
  name: "2021 Fall",
});

const frontmatter = formatFrontMatter({
  year: 2021,
  season: "Fall",
  image: "",
  bookYaml,
  recipeYaml,
  playlistYaml,
});

it("findSeason", () => {
  jest.useFakeTimers().setSystemTime(new Date("2021-3-20").getTime());
  expect(findSeason()).toMatchInlineSnapshot(`
    Object {
      "end": "2021-03-20",
      "name": "2020/2021 Winter",
      "season": "Winter",
      "start": "2020-12-21",
      "year": 2021,
    }
  `);

  jest.useFakeTimers().setSystemTime(new Date("2021-6-20").getTime());
  expect(findSeason()).toMatchInlineSnapshot(`
    Object {
      "end": "2021-06-20",
      "name": "2021 Spring",
      "season": "Spring",
      "start": "2021-03-21",
      "year": 2021,
    }
  `);

  jest.useFakeTimers().setSystemTime(new Date("2021-9-20").getTime());
  expect(findSeason()).toMatchInlineSnapshot(`
    Object {
      "end": "2021-09-20",
      "name": "2021 Summer",
      "season": "Summer",
      "start": "2021-06-21",
      "year": 2021,
    }
  `);

  jest.useFakeTimers().setSystemTime(new Date("2021-12-20").getTime());
  expect(findSeason()).toMatchInlineSnapshot(`
    Object {
      "end": "2021-12-20",
      "name": "2021 Fall",
      "season": "Fall",
      "start": "2021-09-21",
      "year": 2021,
    }
  `);
});

it("playlistText", () => {
  expect(playlistText).toMatchInlineSnapshot(`
    "- can't stop me from dying - Ada Lea
    - No Shadow - Hyd
    - Trip To Japan - The Shacks
    - Maker - Hana Vu
    - Anything at All - Bachelor, Jay Som, Palehound
    - Would You Mind Please Pulling Me Close? - Tasha
    - Genesis - Spencer.
    - Old Peel - Aldous Harding
    - Everybody's Birthday - Hana Vu
    - Big Wheel - Samia
    - Dogma - Circuit des Yeux
    - I'm Holding Out For Something - Virginia Wing
    - Delicious Things - Wolf Alice
    - Bottle Episode - Mandy, Indiana
    - The Gaping Mouth - Lowertown
    - 3 2 4 3 - Ohmme
    - Of Pressure - Mirah
    - When the Sun Comes Up - Greta Morgan
    - Mountains Crave - Anna von Hausswolff"
  `);
});

it("bookText", () => {
  expect(bookText).toMatchInlineSnapshot(`
    "- [People We Meet on Vacation](https://books.google.com/books/about/People_We_Meet_on_Vacation.html?hl=&id=5fooEAAAQBAJ) - Emily Henry
    - [Beautiful World, Where Are You](https://play.google.com/store/books/details?id=sL4SEAAAQBAJ) - Sally Rooney
    - [Freshwater](https://play.google.com/store/books/details?id=_eUoDwAAQBAJ) - Akwaeke Emezi
    - [The Renunciations](https://books.google.com/books/about/The_Renunciations.html?hl=&id=_xC-zQEACAAJ) - Donika Kelly
    - [The Heart Principle](https://books.google.com/books/about/The_Heart_Principle.html?hl=&id=fzc7EAAAQBAJ) - Helen Hoang
    - [Eileen](https://books.google.com/books/about/Eileen.html?hl=&id=AKqvDAAAQBAJ) - Ottessa Moshfegh
    - [Attached](https://books.google.com/books/about/Attached.html?hl=&id=_O0oDwAAQBAJ) - Amir Levine, Rachel Heller
    - [The Haunting of Hill House](https://books.google.com/books/about/The_Haunting_of_Hill_House.html?hl=&id=8v3mwAEACAAJ) - Shirley Jackson
    - [Leave the World Behind](https://play.google.com/store/books/details?id=UyTIDwAAQBAJ) - Rumaan Alam
    - [Goodbye, Again](https://play.google.com/store/books/details?id=MWinDwAAQBAJ) - Jonny Sun
    - [Unwinding Anxiety](https://play.google.com/store/books/details?id=GxACEAAAQBAJ) - Judson Brewer
    - [Empire of Wild](https://play.google.com/store/books/details?id=O5K5DwAAQBAJ) - Cherie Dimaline
    - [Beach Read](https://books.google.com/books/about/Beach_Read.html?hl=&id=vDTgDwAAQBAJ) - Emily Henry
    - [Sometimes I Trip on How Happy We Could Be](https://books.google.com/books/about/Sometimes_I_Trip_on_How_Happy_We_Could_B.html?hl=&id=qD8czgEACAAJ) - Nichole Perkins
    - [The Midnight Library](https://play.google.com/store/books/details?id=nNjTDwAAQBAJ) - Matt Haig
    - [The Paper Palace](https://books.google.com/books/about/The_Paper_Palace.html?hl=&id=qQMyEAAAQBAJ) - Miranda Cowley Heller
    - [This Is Your Mind on Plants](https://books.google.com/books/about/This_Is_Your_Mind_on_Plants.html?hl=&id=Fxs3EAAAQBAJ) - Michael Pollan"
  `);
});

it("recipeText", () => {
  expect(recipeText).toMatchInlineSnapshot(`
    "- [Gyeran Bap (Egg Rice) Recipe](https://cooking.nytimes.com/recipes/1022530-gyeran-bap-egg-rice) - NYT Cooking
    - [Breakfast Burritos Recipe](https://cooking.nytimes.com/recipes/1022540-breakfast-burritos) - NYT Cooking
    - [Pressure Cooker Pot Roast Recipe](https://cooking.nytimes.com/recipes/1020846-pressure-cooker-pot-roast) - NYT Cooking
    - [Cinnamon-Maple Applesauce Recipe](https://cooking.nytimes.com/recipes/1022568-cinnamon-maple-applesauce) - NYT Cooking
    - [Apple Pie Filling Recipe](https://cooking.nytimes.com/recipes/1021576-apple-pie-filling) - NYT Cooking
    - [Perfect Pie Crust Recipe](https://cooking.nytimes.com/recipes/1019713-perfect-pie-crust) - NYT Cooking
    - [Creamy Pasta With Smoked Bacon and Peas Recipe](https://cooking.nytimes.com/recipes/1012805-creamy-pasta-with-smoked-bacon-and-peas) - NYT Cooking
    - [Cornmeal-Blueberry Pancakes Recipe](https://cooking.nytimes.com/recipes/1018177-cornmeal-blueberry-pancakes) - NYT Cooking
    - [Lemon Poppy-Seed Pancakes with Greek Yogurt and Jam Recipe](https://cooking.nytimes.com/recipes/12417-lemon-poppy-seed-pancakes-with-greek-yogurt-and-jam) - NYT Cooking
    - [Bacon and Shallot Potato Salad Recipe](https://cooking.nytimes.com/recipes/1017404-bacon-and-shallot-potato-salad) - NYT Cooking
    - [Roasted Green Beans With Pancetta and Lemon Zest Recipe](https://cooking.nytimes.com/recipes/1020573-roasted-green-beans-with-pancetta-and-lemon-zest) - NYT Cooking
    - [Pickle-Brined Fried Chicken Sandwich Recipe](https://cooking.nytimes.com/recipes/1020385-pickle-brined-fried-chicken-sandwich) - NYT Cooking
    - [Rice Noodles With Seared Pork, Carrots and Herbs Recipe](https://cooking.nytimes.com/recipes/1019646-rice-noodles-with-seared-pork-carrots-and-herbs) - NYT Cooking
    - [Orange-Cardamom Pancakes Recipe](https://cooking.nytimes.com/recipes/1019947-orange-cardamom-pancakes) - NYT Cooking
    - [Small-Batch Buttermilk Biscuits Recipe](https://cooking.nytimes.com/recipes/1021862-small-batch-buttermilk-biscuits) - NYT Cooking
    - [Sheet-Pan Chicken Fajitas Recipe](https://cooking.nytimes.com/recipes/1020092-sheet-pan-chicken-fajitas) - NYT Cooking
    - [Ginger-Scallion Chicken Recipe](https://cooking.nytimes.com/recipes/1019283-ginger-scallion-chicken) - NYT Cooking
    - [Moroccan-Spiced Chicken Meatballs Recipe](https://cooking.nytimes.com/recipes/1022719-moroccan-spiced-chicken-meatballs) - NYT Cooking
    - [Mushroom Pasta Stir-Fry Recipe](https://cooking.nytimes.com/recipes/1022121-mushroom-pasta-stir-fry) - NYT Cooking
    - [Sheet-Pan Crispy Pork Schnitzel Recipe](https://cooking.nytimes.com/recipes/1022582-sheet-pan-crispy-pork-schnitzel) - NYT Cooking
    - [Sugar Cookies Recipe](https://cooking.nytimes.com/recipes/1018383-sugar-cookies) - NYT Cooking
    - [The Fluffiest Royal Icing Recipe](https://cooking.nytimes.com/recipes/1019785-the-fluffiest-royal-icing) - NYT Cooking"
  `);
});

it("formatFrontMatter", () => {
  expect(frontmatter).toMatchInlineSnapshot(`
    "---
    title: 2021 Fall
    image: 
    type: season
    books:
      - title: People We Meet on Vacation
        authors: Emily Henry
        url: >-
          https://books.google.com/books/about/People_We_Meet_on_Vacation.html?hl=&id=5fooEAAAQBAJ
        isbn: '9781984806758'
      - title: Beautiful World, Where Are You
        authors: Sally Rooney
        url: https://play.google.com/store/books/details?id=sL4SEAAAQBAJ
        isbn: '9780374602611'
      - title: Freshwater
        authors: Akwaeke Emezi
        url: https://play.google.com/store/books/details?id=_eUoDwAAQBAJ
        isbn: '9780802165565'
      - title: The Renunciations
        authors: Donika Kelly
        url: >-
          https://books.google.com/books/about/The_Renunciations.html?hl=&id=_xC-zQEACAAJ
        isbn: '9781644450536'
      - title: The Heart Principle
        authors: Helen Hoang
        url: >-
          https://books.google.com/books/about/The_Heart_Principle.html?hl=&id=fzc7EAAAQBAJ
        isbn: '9780593197837'
      - title: Eileen
        authors: Ottessa Moshfegh
        url: https://books.google.com/books/about/Eileen.html?hl=&id=AKqvDAAAQBAJ
        isbn: '9780143128755'
      - title: Attached
        authors: Amir Levine, Rachel Heller
        url: https://books.google.com/books/about/Attached.html?hl=&id=_O0oDwAAQBAJ
        isbn: '9781585429134'
      - title: The Haunting of Hill House
        authors: Shirley Jackson
        url: >-
          https://books.google.com/books/about/The_Haunting_of_Hill_House.html?hl=&id=8v3mwAEACAAJ
        isbn: '9780606415545'
      - title: Leave the World Behind
        authors: Rumaan Alam
        url: https://play.google.com/store/books/details?id=UyTIDwAAQBAJ
        isbn: '9780062667656'
      - title: Goodbye, Again
        authors: Jonny Sun
        url: https://play.google.com/store/books/details?id=MWinDwAAQBAJ
        isbn: '9780062880864'
      - title: Unwinding Anxiety
        authors: Judson Brewer
        url: https://play.google.com/store/books/details?id=GxACEAAAQBAJ
        isbn: '9780593330456'
      - title: Empire of Wild
        authors: Cherie Dimaline
        url: https://play.google.com/store/books/details?id=O5K5DwAAQBAJ
        isbn: '9780062975966'
      - title: Beach Read
        authors: Emily Henry
        url: https://books.google.com/books/about/Beach_Read.html?hl=&id=vDTgDwAAQBAJ
        isbn: '9781984806734'
      - title: Sometimes I Trip on How Happy We Could Be
        authors: Nichole Perkins
        url: >-
          https://books.google.com/books/about/Sometimes_I_Trip_on_How_Happy_We_Could_B.html?hl=&id=qD8czgEACAAJ
        isbn: '9781538702741'
      - title: The Midnight Library
        authors: Matt Haig
        url: https://play.google.com/store/books/details?id=nNjTDwAAQBAJ
        isbn: '9780525559481'
      - title: The Paper Palace
        authors: Miranda Cowley Heller
        url: >-
          https://books.google.com/books/about/The_Paper_Palace.html?hl=&id=qQMyEAAAQBAJ
        isbn: '9780593329825'
      - title: This Is Your Mind on Plants
        authors: Michael Pollan
        url: >-
          https://books.google.com/books/about/This_Is_Your_Mind_on_Plants.html?hl=&id=Fxs3EAAAQBAJ
        isbn: '9780593296905'

    recipes:
      - title: Gyeran Bap (Egg Rice) Recipe
        site: NYT Cooking
        url: https://cooking.nytimes.com/recipes/1022530-gyeran-bap-egg-rice
      - title: Breakfast Burritos Recipe
        site: NYT Cooking
        url: https://cooking.nytimes.com/recipes/1022540-breakfast-burritos
      - title: Pressure Cooker Pot Roast Recipe
        site: NYT Cooking
        url: https://cooking.nytimes.com/recipes/1020846-pressure-cooker-pot-roast
      - title: Cinnamon-Maple Applesauce Recipe
        site: NYT Cooking
        url: https://cooking.nytimes.com/recipes/1022568-cinnamon-maple-applesauce
      - title: Apple Pie Filling Recipe
        site: NYT Cooking
        url: https://cooking.nytimes.com/recipes/1021576-apple-pie-filling
      - title: Perfect Pie Crust Recipe
        site: NYT Cooking
        url: https://cooking.nytimes.com/recipes/1019713-perfect-pie-crust
      - title: Creamy Pasta With Smoked Bacon and Peas Recipe
        site: NYT Cooking
        url: >-
          https://cooking.nytimes.com/recipes/1012805-creamy-pasta-with-smoked-bacon-and-peas
      - title: Cornmeal-Blueberry Pancakes Recipe
        site: NYT Cooking
        url: https://cooking.nytimes.com/recipes/1018177-cornmeal-blueberry-pancakes
      - title: Lemon Poppy-Seed Pancakes with Greek Yogurt and Jam Recipe
        site: NYT Cooking
        url: >-
          https://cooking.nytimes.com/recipes/12417-lemon-poppy-seed-pancakes-with-greek-yogurt-and-jam
      - title: Bacon and Shallot Potato Salad Recipe
        site: NYT Cooking
        url: https://cooking.nytimes.com/recipes/1017404-bacon-and-shallot-potato-salad
      - title: Roasted Green Beans With Pancetta and Lemon Zest Recipe
        site: NYT Cooking
        url: >-
          https://cooking.nytimes.com/recipes/1020573-roasted-green-beans-with-pancetta-and-lemon-zest
      - title: Pickle-Brined Fried Chicken Sandwich Recipe
        site: NYT Cooking
        url: >-
          https://cooking.nytimes.com/recipes/1020385-pickle-brined-fried-chicken-sandwich
      - title: Rice Noodles With Seared Pork, Carrots and Herbs Recipe
        site: NYT Cooking
        url: >-
          https://cooking.nytimes.com/recipes/1019646-rice-noodles-with-seared-pork-carrots-and-herbs
      - title: Orange-Cardamom Pancakes Recipe
        site: NYT Cooking
        url: https://cooking.nytimes.com/recipes/1019947-orange-cardamom-pancakes
      - title: Small-Batch Buttermilk Biscuits Recipe
        site: NYT Cooking
        url: >-
          https://cooking.nytimes.com/recipes/1021862-small-batch-buttermilk-biscuits
      - title: Sheet-Pan Chicken Fajitas Recipe
        site: NYT Cooking
        url: https://cooking.nytimes.com/recipes/1020092-sheet-pan-chicken-fajitas
      - title: Ginger-Scallion Chicken Recipe
        site: NYT Cooking
        url: https://cooking.nytimes.com/recipes/1019283-ginger-scallion-chicken
      - title: Moroccan-Spiced Chicken Meatballs Recipe
        site: NYT Cooking
        url: >-
          https://cooking.nytimes.com/recipes/1022719-moroccan-spiced-chicken-meatballs
      - title: Mushroom Pasta Stir-Fry Recipe
        site: NYT Cooking
        url: https://cooking.nytimes.com/recipes/1022121-mushroom-pasta-stir-fry
      - title: \\"Sheet-Pan Crispy Pork Schnitzel\\\\_ Recipe\\"
        site: NYT Cooking
        url: >-
          https://cooking.nytimes.com/recipes/1022582-sheet-pan-crispy-pork-schnitzel
      - title: Sugar Cookies Recipe
        site: NYT Cooking
        url: https://cooking.nytimes.com/recipes/1018383-sugar-cookies
      - title: The Fluffiest Royal Icing Recipe
        site: NYT Cooking
        url: https://cooking.nytimes.com/recipes/1019785-the-fluffiest-royal-icing

    playlist: 2021 Fall
    spotify: https://open.spotify.com/playlist/2YnPs9UNBkJpswmsRNwQ1o
    tracks:
      - track: can't stop me from dying
        artist: Ada Lea
        album: one hand on the steering wheel the other sewing a garden
      - track: No Shadow
        artist: Hyd
        album: No Shadow
      - track: Trip To Japan
        artist: The Shacks
        album: Trip To Japan
      - track: Maker
        artist: Hana Vu
        album: Keeper
      - track: Anything at All
        artist: Bachelor, Jay Som, Palehound
        album: Doomin' Sun
      - track: Would You Mind Please Pulling Me Close?
        artist: Tasha
        album: Would You Mind Please Pulling Me Close?
      - track: Genesis
        artist: Spencer.
        album: Genesis
      - track: Old Peel
        artist: Aldous Harding
        album: Old Peel
      - track: Everybody's Birthday
        artist: Hana Vu
        album: Everybody's Birthday
      - track: Big Wheel
        artist: Samia
        album: The Baby
      - track: Dogma
        artist: Circuit des Yeux
        album: '-io'
      - track: I'm Holding Out For Something
        artist: Virginia Wing
        album: private LIFE
      - track: Delicious Things
        artist: Wolf Alice
        album: Blue Weekend
      - track: Bottle Episode
        artist: Mandy, Indiana
        album: Bottle Episode
      - track: The Gaping Mouth
        artist: Lowertown
        album: The Gaping Mouth
      - track: 3 2 4 3
        artist: Ohmme
        album: Fantasize Your Ghost
      - track: Of Pressure
        artist: Mirah
        album: You Think It's Like This But Really It's Like This
      - track: When the Sun Comes Up
        artist: Greta Morgan
        album: When the Sun Comes Up
      - track: Mountains Crave
        artist: Anna von Hausswolff
        album: Ceremony

    ---"
  `);
});

it("buildPost", () => {
  expect(
    buildPost({
      frontmatter,
      season: "2021 Fall",
      bookText,
      playlistText,
      recipeText,
    })
  ).toMatchInlineSnapshot(`
    "---
    title: 2021 Fall
    image: 
    type: season
    books:
      - title: People We Meet on Vacation
        authors: Emily Henry
        url: >-
          https://books.google.com/books/about/People_We_Meet_on_Vacation.html?hl=&id=5fooEAAAQBAJ
        isbn: '9781984806758'
      - title: Beautiful World, Where Are You
        authors: Sally Rooney
        url: https://play.google.com/store/books/details?id=sL4SEAAAQBAJ
        isbn: '9780374602611'
      - title: Freshwater
        authors: Akwaeke Emezi
        url: https://play.google.com/store/books/details?id=_eUoDwAAQBAJ
        isbn: '9780802165565'
      - title: The Renunciations
        authors: Donika Kelly
        url: >-
          https://books.google.com/books/about/The_Renunciations.html?hl=&id=_xC-zQEACAAJ
        isbn: '9781644450536'
      - title: The Heart Principle
        authors: Helen Hoang
        url: >-
          https://books.google.com/books/about/The_Heart_Principle.html?hl=&id=fzc7EAAAQBAJ
        isbn: '9780593197837'
      - title: Eileen
        authors: Ottessa Moshfegh
        url: https://books.google.com/books/about/Eileen.html?hl=&id=AKqvDAAAQBAJ
        isbn: '9780143128755'
      - title: Attached
        authors: Amir Levine, Rachel Heller
        url: https://books.google.com/books/about/Attached.html?hl=&id=_O0oDwAAQBAJ
        isbn: '9781585429134'
      - title: The Haunting of Hill House
        authors: Shirley Jackson
        url: >-
          https://books.google.com/books/about/The_Haunting_of_Hill_House.html?hl=&id=8v3mwAEACAAJ
        isbn: '9780606415545'
      - title: Leave the World Behind
        authors: Rumaan Alam
        url: https://play.google.com/store/books/details?id=UyTIDwAAQBAJ
        isbn: '9780062667656'
      - title: Goodbye, Again
        authors: Jonny Sun
        url: https://play.google.com/store/books/details?id=MWinDwAAQBAJ
        isbn: '9780062880864'
      - title: Unwinding Anxiety
        authors: Judson Brewer
        url: https://play.google.com/store/books/details?id=GxACEAAAQBAJ
        isbn: '9780593330456'
      - title: Empire of Wild
        authors: Cherie Dimaline
        url: https://play.google.com/store/books/details?id=O5K5DwAAQBAJ
        isbn: '9780062975966'
      - title: Beach Read
        authors: Emily Henry
        url: https://books.google.com/books/about/Beach_Read.html?hl=&id=vDTgDwAAQBAJ
        isbn: '9781984806734'
      - title: Sometimes I Trip on How Happy We Could Be
        authors: Nichole Perkins
        url: >-
          https://books.google.com/books/about/Sometimes_I_Trip_on_How_Happy_We_Could_B.html?hl=&id=qD8czgEACAAJ
        isbn: '9781538702741'
      - title: The Midnight Library
        authors: Matt Haig
        url: https://play.google.com/store/books/details?id=nNjTDwAAQBAJ
        isbn: '9780525559481'
      - title: The Paper Palace
        authors: Miranda Cowley Heller
        url: >-
          https://books.google.com/books/about/The_Paper_Palace.html?hl=&id=qQMyEAAAQBAJ
        isbn: '9780593329825'
      - title: This Is Your Mind on Plants
        authors: Michael Pollan
        url: >-
          https://books.google.com/books/about/This_Is_Your_Mind_on_Plants.html?hl=&id=Fxs3EAAAQBAJ
        isbn: '9780593296905'

    recipes:
      - title: Gyeran Bap (Egg Rice) Recipe
        site: NYT Cooking
        url: https://cooking.nytimes.com/recipes/1022530-gyeran-bap-egg-rice
      - title: Breakfast Burritos Recipe
        site: NYT Cooking
        url: https://cooking.nytimes.com/recipes/1022540-breakfast-burritos
      - title: Pressure Cooker Pot Roast Recipe
        site: NYT Cooking
        url: https://cooking.nytimes.com/recipes/1020846-pressure-cooker-pot-roast
      - title: Cinnamon-Maple Applesauce Recipe
        site: NYT Cooking
        url: https://cooking.nytimes.com/recipes/1022568-cinnamon-maple-applesauce
      - title: Apple Pie Filling Recipe
        site: NYT Cooking
        url: https://cooking.nytimes.com/recipes/1021576-apple-pie-filling
      - title: Perfect Pie Crust Recipe
        site: NYT Cooking
        url: https://cooking.nytimes.com/recipes/1019713-perfect-pie-crust
      - title: Creamy Pasta With Smoked Bacon and Peas Recipe
        site: NYT Cooking
        url: >-
          https://cooking.nytimes.com/recipes/1012805-creamy-pasta-with-smoked-bacon-and-peas
      - title: Cornmeal-Blueberry Pancakes Recipe
        site: NYT Cooking
        url: https://cooking.nytimes.com/recipes/1018177-cornmeal-blueberry-pancakes
      - title: Lemon Poppy-Seed Pancakes with Greek Yogurt and Jam Recipe
        site: NYT Cooking
        url: >-
          https://cooking.nytimes.com/recipes/12417-lemon-poppy-seed-pancakes-with-greek-yogurt-and-jam
      - title: Bacon and Shallot Potato Salad Recipe
        site: NYT Cooking
        url: https://cooking.nytimes.com/recipes/1017404-bacon-and-shallot-potato-salad
      - title: Roasted Green Beans With Pancetta and Lemon Zest Recipe
        site: NYT Cooking
        url: >-
          https://cooking.nytimes.com/recipes/1020573-roasted-green-beans-with-pancetta-and-lemon-zest
      - title: Pickle-Brined Fried Chicken Sandwich Recipe
        site: NYT Cooking
        url: >-
          https://cooking.nytimes.com/recipes/1020385-pickle-brined-fried-chicken-sandwich
      - title: Rice Noodles With Seared Pork, Carrots and Herbs Recipe
        site: NYT Cooking
        url: >-
          https://cooking.nytimes.com/recipes/1019646-rice-noodles-with-seared-pork-carrots-and-herbs
      - title: Orange-Cardamom Pancakes Recipe
        site: NYT Cooking
        url: https://cooking.nytimes.com/recipes/1019947-orange-cardamom-pancakes
      - title: Small-Batch Buttermilk Biscuits Recipe
        site: NYT Cooking
        url: >-
          https://cooking.nytimes.com/recipes/1021862-small-batch-buttermilk-biscuits
      - title: Sheet-Pan Chicken Fajitas Recipe
        site: NYT Cooking
        url: https://cooking.nytimes.com/recipes/1020092-sheet-pan-chicken-fajitas
      - title: Ginger-Scallion Chicken Recipe
        site: NYT Cooking
        url: https://cooking.nytimes.com/recipes/1019283-ginger-scallion-chicken
      - title: Moroccan-Spiced Chicken Meatballs Recipe
        site: NYT Cooking
        url: >-
          https://cooking.nytimes.com/recipes/1022719-moroccan-spiced-chicken-meatballs
      - title: Mushroom Pasta Stir-Fry Recipe
        site: NYT Cooking
        url: https://cooking.nytimes.com/recipes/1022121-mushroom-pasta-stir-fry
      - title: \\"Sheet-Pan Crispy Pork Schnitzel\\\\_ Recipe\\"
        site: NYT Cooking
        url: >-
          https://cooking.nytimes.com/recipes/1022582-sheet-pan-crispy-pork-schnitzel
      - title: Sugar Cookies Recipe
        site: NYT Cooking
        url: https://cooking.nytimes.com/recipes/1018383-sugar-cookies
      - title: The Fluffiest Royal Icing Recipe
        site: NYT Cooking
        url: https://cooking.nytimes.com/recipes/1019785-the-fluffiest-royal-icing

    playlist: 2021 Fall
    spotify: https://open.spotify.com/playlist/2YnPs9UNBkJpswmsRNwQ1o
    tracks:
      - track: can't stop me from dying
        artist: Ada Lea
        album: one hand on the steering wheel the other sewing a garden
      - track: No Shadow
        artist: Hyd
        album: No Shadow
      - track: Trip To Japan
        artist: The Shacks
        album: Trip To Japan
      - track: Maker
        artist: Hana Vu
        album: Keeper
      - track: Anything at All
        artist: Bachelor, Jay Som, Palehound
        album: Doomin' Sun
      - track: Would You Mind Please Pulling Me Close?
        artist: Tasha
        album: Would You Mind Please Pulling Me Close?
      - track: Genesis
        artist: Spencer.
        album: Genesis
      - track: Old Peel
        artist: Aldous Harding
        album: Old Peel
      - track: Everybody's Birthday
        artist: Hana Vu
        album: Everybody's Birthday
      - track: Big Wheel
        artist: Samia
        album: The Baby
      - track: Dogma
        artist: Circuit des Yeux
        album: '-io'
      - track: I'm Holding Out For Something
        artist: Virginia Wing
        album: private LIFE
      - track: Delicious Things
        artist: Wolf Alice
        album: Blue Weekend
      - track: Bottle Episode
        artist: Mandy, Indiana
        album: Bottle Episode
      - track: The Gaping Mouth
        artist: Lowertown
        album: The Gaping Mouth
      - track: 3 2 4 3
        artist: Ohmme
        album: Fantasize Your Ghost
      - track: Of Pressure
        artist: Mirah
        album: You Think It's Like This But Really It's Like This
      - track: When the Sun Comes Up
        artist: Greta Morgan
        album: When the Sun Comes Up
      - track: Mountains Crave
        artist: Anna von Hausswolff
        album: Ceremony

    ---

    The books, music, and recipes I enjoyed this 2021 fall.

    ## Books

    - [People We Meet on Vacation](https://books.google.com/books/about/People_We_Meet_on_Vacation.html?hl=&id=5fooEAAAQBAJ) - Emily Henry
    - [Beautiful World, Where Are You](https://play.google.com/store/books/details?id=sL4SEAAAQBAJ) - Sally Rooney
    - [Freshwater](https://play.google.com/store/books/details?id=_eUoDwAAQBAJ) - Akwaeke Emezi
    - [The Renunciations](https://books.google.com/books/about/The_Renunciations.html?hl=&id=_xC-zQEACAAJ) - Donika Kelly
    - [The Heart Principle](https://books.google.com/books/about/The_Heart_Principle.html?hl=&id=fzc7EAAAQBAJ) - Helen Hoang
    - [Eileen](https://books.google.com/books/about/Eileen.html?hl=&id=AKqvDAAAQBAJ) - Ottessa Moshfegh
    - [Attached](https://books.google.com/books/about/Attached.html?hl=&id=_O0oDwAAQBAJ) - Amir Levine, Rachel Heller
    - [The Haunting of Hill House](https://books.google.com/books/about/The_Haunting_of_Hill_House.html?hl=&id=8v3mwAEACAAJ) - Shirley Jackson
    - [Leave the World Behind](https://play.google.com/store/books/details?id=UyTIDwAAQBAJ) - Rumaan Alam
    - [Goodbye, Again](https://play.google.com/store/books/details?id=MWinDwAAQBAJ) - Jonny Sun
    - [Unwinding Anxiety](https://play.google.com/store/books/details?id=GxACEAAAQBAJ) - Judson Brewer
    - [Empire of Wild](https://play.google.com/store/books/details?id=O5K5DwAAQBAJ) - Cherie Dimaline
    - [Beach Read](https://books.google.com/books/about/Beach_Read.html?hl=&id=vDTgDwAAQBAJ) - Emily Henry
    - [Sometimes I Trip on How Happy We Could Be](https://books.google.com/books/about/Sometimes_I_Trip_on_How_Happy_We_Could_B.html?hl=&id=qD8czgEACAAJ) - Nichole Perkins
    - [The Midnight Library](https://play.google.com/store/books/details?id=nNjTDwAAQBAJ) - Matt Haig
    - [The Paper Palace](https://books.google.com/books/about/The_Paper_Palace.html?hl=&id=qQMyEAAAQBAJ) - Miranda Cowley Heller
    - [This Is Your Mind on Plants](https://books.google.com/books/about/This_Is_Your_Mind_on_Plants.html?hl=&id=Fxs3EAAAQBAJ) - Michael Pollan

    ## Playlist

    - can't stop me from dying - Ada Lea
    - No Shadow - Hyd
    - Trip To Japan - The Shacks
    - Maker - Hana Vu
    - Anything at All - Bachelor, Jay Som, Palehound
    - Would You Mind Please Pulling Me Close? - Tasha
    - Genesis - Spencer.
    - Old Peel - Aldous Harding
    - Everybody's Birthday - Hana Vu
    - Big Wheel - Samia
    - Dogma - Circuit des Yeux
    - I'm Holding Out For Something - Virginia Wing
    - Delicious Things - Wolf Alice
    - Bottle Episode - Mandy, Indiana
    - The Gaping Mouth - Lowertown
    - 3 2 4 3 - Ohmme
    - Of Pressure - Mirah
    - When the Sun Comes Up - Greta Morgan
    - Mountains Crave - Anna von Hausswolff

    ## Recipes

    - [Gyeran Bap (Egg Rice) Recipe](https://cooking.nytimes.com/recipes/1022530-gyeran-bap-egg-rice) - NYT Cooking
    - [Breakfast Burritos Recipe](https://cooking.nytimes.com/recipes/1022540-breakfast-burritos) - NYT Cooking
    - [Pressure Cooker Pot Roast Recipe](https://cooking.nytimes.com/recipes/1020846-pressure-cooker-pot-roast) - NYT Cooking
    - [Cinnamon-Maple Applesauce Recipe](https://cooking.nytimes.com/recipes/1022568-cinnamon-maple-applesauce) - NYT Cooking
    - [Apple Pie Filling Recipe](https://cooking.nytimes.com/recipes/1021576-apple-pie-filling) - NYT Cooking
    - [Perfect Pie Crust Recipe](https://cooking.nytimes.com/recipes/1019713-perfect-pie-crust) - NYT Cooking
    - [Creamy Pasta With Smoked Bacon and Peas Recipe](https://cooking.nytimes.com/recipes/1012805-creamy-pasta-with-smoked-bacon-and-peas) - NYT Cooking
    - [Cornmeal-Blueberry Pancakes Recipe](https://cooking.nytimes.com/recipes/1018177-cornmeal-blueberry-pancakes) - NYT Cooking
    - [Lemon Poppy-Seed Pancakes with Greek Yogurt and Jam Recipe](https://cooking.nytimes.com/recipes/12417-lemon-poppy-seed-pancakes-with-greek-yogurt-and-jam) - NYT Cooking
    - [Bacon and Shallot Potato Salad Recipe](https://cooking.nytimes.com/recipes/1017404-bacon-and-shallot-potato-salad) - NYT Cooking
    - [Roasted Green Beans With Pancetta and Lemon Zest Recipe](https://cooking.nytimes.com/recipes/1020573-roasted-green-beans-with-pancetta-and-lemon-zest) - NYT Cooking
    - [Pickle-Brined Fried Chicken Sandwich Recipe](https://cooking.nytimes.com/recipes/1020385-pickle-brined-fried-chicken-sandwich) - NYT Cooking
    - [Rice Noodles With Seared Pork, Carrots and Herbs Recipe](https://cooking.nytimes.com/recipes/1019646-rice-noodles-with-seared-pork-carrots-and-herbs) - NYT Cooking
    - [Orange-Cardamom Pancakes Recipe](https://cooking.nytimes.com/recipes/1019947-orange-cardamom-pancakes) - NYT Cooking
    - [Small-Batch Buttermilk Biscuits Recipe](https://cooking.nytimes.com/recipes/1021862-small-batch-buttermilk-biscuits) - NYT Cooking
    - [Sheet-Pan Chicken Fajitas Recipe](https://cooking.nytimes.com/recipes/1020092-sheet-pan-chicken-fajitas) - NYT Cooking
    - [Ginger-Scallion Chicken Recipe](https://cooking.nytimes.com/recipes/1019283-ginger-scallion-chicken) - NYT Cooking
    - [Moroccan-Spiced Chicken Meatballs Recipe](https://cooking.nytimes.com/recipes/1022719-moroccan-spiced-chicken-meatballs) - NYT Cooking
    - [Mushroom Pasta Stir-Fry Recipe](https://cooking.nytimes.com/recipes/1022121-mushroom-pasta-stir-fry) - NYT Cooking
    - [Sheet-Pan Crispy Pork Schnitzel Recipe](https://cooking.nytimes.com/recipes/1022582-sheet-pan-crispy-pork-schnitzel) - NYT Cooking
    - [Sugar Cookies Recipe](https://cooking.nytimes.com/recipes/1018383-sugar-cookies) - NYT Cooking
    - [The Fluffiest Royal Icing Recipe](https://cooking.nytimes.com/recipes/1019785-the-fluffiest-royal-icing) - NYT Cooking
    "
  `);
});
