import { Game } from "../../../api/games";
import GameCard from "./GameCard";

interface GameListProps {
  games: Game[];
  onToggleFavorite: (gameId: string) => void;
  loading: boolean;
}

const GameList: React.FC<GameListProps> = ({
  games,
  onToggleFavorite,
  loading,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-200 rounded-lg aspect-square"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default GameList;
