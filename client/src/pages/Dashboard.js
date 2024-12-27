import React, { useState } from 'react';
import axios from 'axios';
import { Search, Pill, AlertTriangle, BookOpen, Home, Activity } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

const Header = () => (
  <header className="bg-white border-b">
    <nav className="max-w-6xl mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Pill className="h-8 w-8 text-blue-500" />
          <span className="text-xl font-bold">MedSearch</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="/" className="flex items-center gap-2 text-gray-600 hover:text-blue-500">
            <Home className="h-5 w-5" />
            <span>Home</span>
          </a>
          <a href="/events" className="flex items-center gap-2 text-gray-600 hover:text-blue-500">
            <Pill className="h-5 w-5" />
            <span>Drugs</span>
          </a>
          <a href="/monitoring" className="flex items-center gap-2 text-gray-600 hover:text-blue-500">
            <Activity className="h-5 w-5" />
            <span>Monitoring</span>
          </a>
        </div>
      </div>
    </nav>
  </header>
);

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null); // Error state

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null); // Reset error
    try {
      const response = await axios.get(
        `http://localhost:5001/api/drug-labels?search=${searchQuery}`
      );
      setResults(response.data);
    } catch (err) {
      setError('Failed to fetch results. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Drug Information Search</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Search for detailed information about drug dosage, adverse reactions, and indications.
          </p>
        </div>

        <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter drug name..."
              className="w-full pl-14 pr-6 py-4 text-lg rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {error && <p className="text-center text-red-500">{error}</p>}

        {results.length > 0 && !loading && (
          <div className="grid gap-6 md:grid-cols-2">
            {results.map((drug, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-semibold">{drug.name}</h3>
                    {drug.prescription_required && (
                      <span className="text-sm text-blue-500 font-medium">
                        Rx Only
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-gray-400" />
                      <h4 className="font-medium">{drug.generic_name}</h4>
                    </div>
                    <p className="text-gray-600">{drug.indications}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      <h4 className="font-medium">Common Side Effects</h4>
                    </div>
                    <ul className="text-gray-600 space-y-1">
                      {drug.adverse_effects?.map((effect, i) => (
                        <li key={i}>{effect}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && results.length === 0 && searchQuery.trim() && !error && (
          <p className="text-center text-gray-600">
            No results found. Try a different search term.
          </p>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
