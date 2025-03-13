import React, { useState, useRef } from 'react';
import { useStore } from '../lib/store';

const GENRES = [
  'Fiction', 'Non-Fiction', 'Mystery', 'Science Fiction',
  'Fantasy', 'Romance', 'Thriller', 'Horror', 'Biography',
  'History', 'Science', 'Technology', 'Self-Help', 'Poetry'
];

const READING_LEVELS = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' }
];

const GENDER_OPTIONS = [
  { id: 'male', label: 'Male' },
  { id: 'female', label: 'Female' },
  { id: 'non-binary', label: 'Non-Binary' },
  { id: 'prefer-not-to-say', label: 'Prefer not to say' }
];

export function OnboardingForm() {
  // Existing state
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [readingLevel, setReadingLevel] = useState('intermediate');
  
  // New state for user profile information
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [useGeneratedAvatar, setUseGeneratedAvatar] = useState(true);
  
  // For file upload
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Store functions
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const setPreferences = useStore((state) => state.setPreferences);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save user preferences
    setPreferences({
      genres: selectedGenres,
      readingLevel,
    });
    
    // Update user metadata if user exists
    if (user) {
      // In a real implementation, you would update the user's metadata in Supabase
      // For now, we'll just simulate this by updating the local user object
      const updatedUser = {
        ...user,
        user_metadata: {
          ...user.user_metadata,
          name,
          age: parseInt(age) || 0,
          gender,
          profileImage: useGeneratedAvatar ? generateAvatarUrl() : profileImage,
        }
      };
      setUser(updatedUser);
    }
  };

  // Toggle genre selection
  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };
  
  // Generate avatar URL based on user information
  const generateAvatarUrl = (): string => {
    // This uses the DiceBear API to generate an avatar based on user info
    // Different styles: adventurer, avataaars, bottts, initials, etc.
    const style = getAvatarStyleFromPreferences();
    const seed = `${name}-${gender}-${selectedGenres.join('-')}`;
    return `https://avatars.dicebear.com/api/${style}/${encodeURIComponent(seed)}.svg`;
  };
  
  // Choose avatar style based on book preferences
  const getAvatarStyleFromPreferences = (): string => {
    if (selectedGenres.includes('Fantasy') || selectedGenres.includes('Science Fiction')) {
      return 'bottts';
    } else if (selectedGenres.includes('Mystery') || selectedGenres.includes('Thriller')) {
      return 'micah';
    } else if (selectedGenres.includes('Romance')) {
      return 'avataaars';
    } else {
      return 'initials';
    }
  };
  
  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
        setUseGeneratedAvatar(false);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  // Switch back to generated avatar
  const handleUseGeneratedAvatar = () => {
    setUseGeneratedAvatar(true);
  };

  // Initialize form with existing user data if available
  React.useEffect(() => {
    if (user?.user_metadata) {
      const metadata = user.user_metadata;
      if (metadata.name) setName(metadata.name);
      if (metadata.age) setAge(metadata.age.toString());
      if (metadata.gender) setGender(metadata.gender);
      if (metadata.profileImage) {
        setProfileImage(metadata.profileImage);
        setUseGeneratedAvatar(false);
      }
    }
  }, [user]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      {/* Personal Information Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Personal Information
        </h2>
        
        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          
          {/* Age Field */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Age
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              min="1"
              max="120"
              required
            />
          </div>
          
          {/* Gender Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gender
            </label>
            <div className="grid grid-cols-2 gap-3">
              {GENDER_OPTIONS.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setGender(id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${gender === id
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile Image Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Profile Picture
        </h2>
        
        <div className="flex flex-col items-center space-y-4">
          {/* Profile Image Preview */}
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
            {profileImage && !useGeneratedAvatar ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              name && <img src={generateAvatarUrl()} alt="Generated Avatar" className="w-full h-full" />
            )}
          </div>
          
          {/* Image Upload Options */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleUploadClick}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
            >
              Upload Photo
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            
            <button
              type="button"
              onClick={handleUseGeneratedAvatar}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${useGeneratedAvatar
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                }`}
            >
              Use Generated Avatar
            </button>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your avatar will be generated based on your name, gender, and reading preferences.
          </p>
        </div>
      </div>
      
      {/* Reading Preferences Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Reading Preferences
        </h2>
        
        {/* Genres Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Select your favorite genres
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {GENRES.map((genre) => (
              <button
                key={genre}
                type="button"
                onClick={() => toggleGenre(genre)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${selectedGenres.includes(genre)
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                  }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
        
        {/* Reading Level Selection */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Select your reading level
          </h3>
          <div className="flex flex-wrap gap-4">
            {READING_LEVELS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setReadingLevel(id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${readingLevel === id
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Complete Profile
      </button>
    </form>
  );
}