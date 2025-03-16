import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../lib/store';
import { supabase } from '../lib/supabase';
import { Upload, Loader } from 'lucide-react';

const GENRES = [
  'Fiction', 'Non-Fiction', 'Mystery', 'Science Fiction',
  'Fantasy', 'Romance', 'Thriller', 'Horror', 'Biography',
  'History', 'Science', 'Technology', 'Self-Help', 'Poetry'
];

const CATEGORIES = [
  'Bestsellers', 'Classics', 'Contemporary', 'Award Winners',
  'Young Adult', 'Children', 'Academic', 'Religious',
  'Business', 'Art', 'Cooking', 'Travel', 'Sports', 'Music'
];

const READER_TYPES = [
  { id: 'casual', label: 'Casual Reader', description: 'Reading for leisure and entertainment' },
  { id: 'avid', label: 'Avid Reader', description: 'Regular reading habit, diverse interests' },
  { id: 'professional', label: 'Professional', description: 'Reading for work or specific expertise' },
  { id: 'scholar', label: 'Scholar', description: 'Academic or research-focused reading' }
];

const READING_LEVELS = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' }
];

export function OnboardingForm() {
  const navigate = useNavigate();
  const { user, setPreferences } = useStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    readerType: 'casual',
    readingLevel: 'intermediate',
    selectedGenres: [],
    favoriteCategories: [],
    profileImage: null
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(fileName);

      setFormData(prev => ({ ...prev, profileImage: publicUrl }));
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: preferencesError } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          name: formData.name,
          age: parseInt(formData.age),
          gender: formData.gender,
          reader_type: formData.readerType,
          reading_level: formData.readingLevel,
          genres: formData.selectedGenres,
          favorite_categories: formData.favoriteCategories,
          profile_url: formData.profileImage ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.gender}-${formData.age}`
        });

      if (preferencesError) throw preferencesError;

      setPreferences({
        name: formData.name,
        age: parseInt(formData.age),
        gender: formData.gender,
        readerType: formData.readerType,
        readingLevel: formData.readingLevel,
        genres: formData.selectedGenres,
        favoriteCategories: formData.favoriteCategories,
        profileUrl: formData.profileImage
      });

      navigate('/');
    } catch (err) {
      console.error('Error saving preferences:', err);
      setError('Failed to save preferences. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSelection = (array: string[], item: string) => {
    return array.includes(item)
      ? array.filter(i => i !== item)
      : [...array, item];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Complete Your Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  min="13"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Profile Picture
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="profile-image"
                    />
                    <label
                      htmlFor="profile-image"
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      <Upload className="w-5 h-5" />
                      <span>Upload</span>
                    </label>
                  </div>
                  {formData.profileImage && (
                    <img
                      src={formData.profileImage}
                      alt="Profile preview"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Reading Preferences */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Reading Preferences
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Reader Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {READER_TYPES.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, readerType: type.id }))}
                    className={`p-4 rounded-lg text-left transition-colors ${formData.readerType === type.id
                        ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
                        : 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                      } border`}
                  >
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {type.label}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {type.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Reading Level
              </label>
              <div className="flex gap-4">
                {READING_LEVELS.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, readingLevel: id }))}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                      ${formData.readingLevel === id
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                      }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Favorite Genres
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {GENRES.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      selectedGenres: toggleSelection(prev.selectedGenres, genre)
                    }))}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                      ${formData.selectedGenres.includes(genre)
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                      }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Favorite Categories
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      favoriteCategories: toggleSelection(prev.favoriteCategories, category)
                    }))}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                      ${formData.favoriteCategories.includes(category)
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader className="w-5 h-5 animate-spin mr-2" />
                Saving...
              </div>
            ) : (
              'Complete Profile'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}