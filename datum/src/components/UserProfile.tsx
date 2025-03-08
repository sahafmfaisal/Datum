import { useStore } from '../lib/store';
import { Book, Star, Award, Settings } from 'lucide-react';

const ACHIEVEMENTS = [
  {
    id: 'bookworm',
    title: 'Bookworm',
    description: 'Read 10 books',
    icon: Book,
    progress: 7,
    total: 10,
  },
  {
    id: 'critic',
    title: 'Critic',
    description: 'Write 20 reviews',
    icon: Star,
    progress: 15,
    total: 20,
  },
  {
    id: 'expert',
    title: 'Genre Expert',
    description: 'Read 5 books in one genre',
    icon: Award,
    progress: 3,
    total: 5,
  },
];

export function UserProfile() {
  const { user, preferences } = useStore();

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                alt="Profile"
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {user.email?.split('@')[0]}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Member since {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Favorite Genres
                </h3>
                <div className="flex flex-wrap gap-2">
                  {preferences.genres.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Reading Level
                </h3>
                <p className="text-gray-900 dark:text-white capitalize">
                  {preferences.readingLevel}
                </p>
              </div>

              <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <Settings className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Achievements */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ACHIEVEMENTS.map((achievement) => {
                const Icon = achievement.icon;
                const percentage = (achievement.progress / achievement.total) * 100;

                return (
                  <div
                    key={achievement.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <Icon className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {achievement.description}
                        </p>
                        <div className="mt-2">
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {achievement.progress} / {achievement.total}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reading Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Reading Stats
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Books Read
                </h3>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                  27
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Reviews Written
                </h3>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                  15
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Reading Streak
                </h3>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                  7 days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}