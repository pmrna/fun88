import { fetchGames, Game } from "./games";

import fun from "../assets/logo/F1M5_Logo.webp";
import matrix from "../assets/logo/EM.webp";
import hacksaw from "../assets/logo/HACKSAW.webp";
import habanero from "../assets/logo/HAB.webp";
import ezugi from "../assets/logo/EZG.webp";
interface GameProvider {
  id: number;
  name: string;
  games: Game[];
  img: string;
}

export const fetchProviderWithGames = async (): Promise<GameProvider[]> => {
  const games = await fetchGames();

  const providers: GameProvider[] = [
    { id: 1, name: "fun88", games: [], img: fun },
    { id: 2, name: "EveryMatrix", games: [], img: matrix },
    { id: 3, name: "HacksawGaming", games: [], img: hacksaw },
    { id: 4, name: "Habanero", games: [], img: habanero },
    { id: 5, name: "Ezugi", games: [], img: ezugi },
  ];

  providers.forEach((provider) => {
    provider.games = games.filter((game) =>
      game.provider.some((p) => p === provider.name)
    );
  });

  return providers;
};

export type { GameProvider };
