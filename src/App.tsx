import { useState, useEffect, useCallback } from "react";
import "./App.css";
import ImageBanner from "./components/main/banner/ImageBanner";
import TopNavBar from "./components/main/TopNavBar";
import BottomNavBar from "./components/main/BottomNavBar";
import NotificationReminder from "./components/main/banner/NotificationReminder";
import FilterBar from "./components/main/FilterBar";
import {
  Game,
  fetchGames,
  fetchGamesByCategory,
  fetchGamesByProvider,
  searchGames,
  toggleFavorite,
} from "./api/games";
import { fetchProviderWithGames, GameProvider } from "./api/provider";
import GameList from "./components/main/gamelist/GameList";

// Import banner images
import image1 from "./assets/images/banner.webp";
import image2 from "./assets/images/banner.webp";
import image3 from "./assets/images/banner.webp";

const BANNER_IMAGES = [image1, image2, image3] as const;

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [gameProviders, setGameProviders] = useState<GameProvider[]>([]);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);

  // Handle game providers
  const fetchGamesForProviders = useCallback(async (providers: string[]) => {
    try {
      if (providers.length === 0) {
        const allGames = await fetchGames();
        setGames(allGames);
      } else {
        const gamesByProviders = await Promise.all(
          providers.map((provider) => fetchGamesByProvider(provider))
        );
        const uniqueGames = Array.from(
          new Map(
            gamesByProviders.flat().map((game) => [game.id, game])
          ).values()
        );
        setGames(uniqueGames);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to filter games by provider"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch games on mount
  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        const data = await fetchGames();
        setGames(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load games");
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  // Fetch Game Providers
  useEffect(() => {
    const loadProviders = async () => {
      try {
        const providersData = await fetchProviderWithGames();
        setGameProviders(providersData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load providers"
        );
      }
    };

    loadProviders();
  }, []);

  useEffect(() => {
    if (selectedProviders.length > 0) {
      setLoading(true);
      fetchGamesForProviders(selectedProviders);
    }
  }, [selectedProviders, fetchGamesForProviders]);

  // Handle provider change
  const handleProviderChange = useCallback((providerName: string) => {
    setSelectedProviders((prev) =>
      prev.includes(providerName)
        ? prev.filter((p) => p !== providerName)
        : [...prev, providerName]
    );
  }, []);

  // Handle favorite toggle
  const handleToggleFavorite = async (gameId: string) => {
    try {
      const updatedGame = await toggleFavorite(gameId);
      setGames((prevGames) =>
        prevGames.map((game) =>
          game.id === updatedGame.id ? updatedGame : game
        )
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update favorite status"
      );
    }
  };

  // Handle category change
  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category === "start" ? null : category);
    setLoading(true);

    try {
      const newGames =
        category === "start" || !category
          ? await fetchGames()
          : await fetchGamesByCategory([category]);

      setGames(newGames);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to filter games by category"
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setLoading(true);

    try {
      const newGames = query ? await searchGames(query) : await fetchGames();

      setGames(newGames);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to search games");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <TopNavBar />
      </header>

      <main className="pt-16 pb-20">
        <div className="max-w-[1400px] mx-auto px-4">
          <section>
            <ImageBanner imageUrls={BANNER_IMAGES} />
          </section>

          <section className="mb-4">
            <NotificationReminder />
          </section>

          <section className="mb-4">
            <FilterBar
              onCategoryChange={handleCategoryChange}
              onSearch={handleSearch}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              providers={gameProviders}
              selectedProvider={selectedProviders}
              onProviderChange={handleProviderChange}
            />
          </section>

          <section>
            <GameList
              games={games}
              onToggleFavorite={handleToggleFavorite}
              loading={loading}
            />
          </section>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg">
        <BottomNavBar />
      </footer>
    </div>
  );
}

export default App;
