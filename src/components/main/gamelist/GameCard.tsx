import { Game } from "../../../api/games";
import FavoriteIcon from "../../../assets/svg/favorite";

interface GameCardProps {
  game: Game;
  onToggleFavorite: (gameId: string) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onToggleFavorite }) => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg">
      <img
        src={game.img}
        alt={game.name}
        className="w-full aspect-square object-cover"
      />
      <div>
        <button
          onClick={() => onToggleFavorite(game.id)}
          className="absolute top-0 right-0 p-0.5"
        >
          <FavoriteIcon isFavorite={game.isFavorite} />
        </button>
      </div>
    </div>
  );
};

export default GameCard;
