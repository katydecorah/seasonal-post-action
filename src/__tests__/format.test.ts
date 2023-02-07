import { readFileSync } from "fs";
import { formatBooks, formatPlaylist, formatRecipes } from "../format";

const recipes = JSON.parse(
  readFileSync("./src/__tests__/fixtures/recipes.json", "utf-8")
);

export const { recipeYaml, recipeMarkdown } = formatRecipes({
  recipeData: recipes,
  start: "2021-09-21",
  end: "2021-12-20",
});

it("recipeMarkdown", () => {
  expect(recipeMarkdown).toMatchInlineSnapshot(`
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

const playlist = JSON.parse(
  readFileSync("./src/__tests__/fixtures/playlists.json", "utf-8")
);

export const { playlistYaml, playlistMarkdown } = formatPlaylist({
  playlistData: playlist,
  name: "2021 Fall",
});

it("playlistMarkdown", () => {
  expect(playlistMarkdown).toMatchInlineSnapshot(`
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

const books = JSON.parse(
  readFileSync("./src/__tests__/fixtures/books.json", "utf-8")
);

export const { bookYaml, bookMarkdown } = formatBooks({
  bookData: books,
  start: "2021-09-21",
  end: "2021-12-20",
});

it("bookMarkdown", () => {
  expect(bookMarkdown).toMatchInlineSnapshot(`
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
