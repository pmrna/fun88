// using the same image for all the games.
import gameWolf from "../assets/icon/game3.webp";
import gameSugar from "../assets/icon/game2.webp";
import gameShaolin from "../assets/icon/game4.webp";
import gameMaya from "../assets/icon/game9.webp";
import gameBeach from "../assets/icon/game10.webp";

interface Game {
  id: string;
  name: string;
  img: string;
  provider: string[];
  category: string[];
  isFavorite?: boolean;
}

const games: Game[] = [
  {
    id: "1",
    name: "Big Bad Wolf",
    img: gameWolf,
    provider: ["fun88"],
    category: ["slots", "new"],
    isFavorite: false,
  },
  {
    id: "2",
    name: "Sugar Rush",
    img: gameSugar,
    provider: ["EveryMatrix", "fun88"],
    category: ["slots", "new"],
    isFavorite: false,
  },
  {
    id: "3",
    name: "Shaolin Crew",
    img: gameShaolin,
    provider: ["HacksawGaming", "fun88"],
    category: ["slots", "new"],
    isFavorite: false,
  },
  {
    id: "4",
    name: "Maya Jackpot",
    img: gameMaya,
    provider: ["Habanero", "fun88"],
    category: ["slots", "live", "jackpots"],
    isFavorite: false,
  },
  {
    id: "5",
    name: "Beach Life",
    img: gameBeach,
    provider: ["Ezugi", "fun88"],
    category: ["jackpots"],
    isFavorite: false,
  },
];

// Helper function to simulate API delay
const withDelay = <T>(data: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 1000);
  });
};

// Fetch all games
export const fetchGames = (): Promise<Game[]> => {
  return withDelay(games);
};

// Fetch games by categories (can handle multiple categories)
export const fetchGamesByCategory = (categories: string[]): Promise<Game[]> => {
  const filteredGames = games.filter((game) =>
    game.category.some((cat) => categories.includes(cat))
  );
  return withDelay(filteredGames);
};

// Fetch games by provider
export const fetchGamesByProvider = (provider: string): Promise<Game[]> => {
  const filteredGames = games.filter((game) =>
    game.provider.some((p) => provider.includes(p))
  );
  return withDelay(filteredGames);
};

// Search games by name
export const searchGames = (query: string): Promise<Game[]> => {
  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(query.toLowerCase())
  );
  return withDelay(filteredGames);
};

// Toggle favorite status
export const toggleFavorite = (gameId: string): Promise<Game> => {
  const gameIndex = games.findIndex((game) => game.id === gameId);
  if (gameIndex === -1) {
    return Promise.reject(new Error("Game not found"));
  }

  games[gameIndex].isFavorite = !games[gameIndex].isFavorite;

  return withDelay(games[gameIndex]);
};

// Get favorite games
export const getFavorites = (): Promise<Game[]> => {
  const favorites = games.filter((game) => game.isFavorite);
  return withDelay(favorites);
};

export type { Game };
