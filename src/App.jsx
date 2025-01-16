import { useState } from 'react';
import axios from 'axios';
import { NewspaperIcon, LinkIcon, Loader2Icon } from 'lucide-react';

function App() {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!url) {
      setError('Please enter a valid URL');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSummary('');

      const response = await axios.post('https://article-extractor-and-summarizer.p.rapidapi.com/summarize', 
        { url },
        {
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
          }
        }
      );

      setSummary(response.data.summary);
    } catch (err) {
      setError('Failed to summarize the article. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-12">
          <NewspaperIcon className="w-10 h-10 mr-3 text-blue-400" />
          <h1 className="text-4xl font-bold">Article Summarizer</h1>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter article URL"
              className="w-full pl-12 pr-4 py-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-400"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2Icon className="animate-spin mr-2" />
                Summarizing...
              </>
            ) : (
              'Summarize'
            )}
          </button>
        </form>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {summary && (
          <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">Summary</h2>
            <p className="text-gray-200 leading-relaxed">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;