import React, { useState } from 'react';
import { articles } from './data';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState(articles);

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setQuery(searchText);

    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(searchText.toLowerCase()) ||
      article.content.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredArticles(filtered);
  };

  const clearSearch = () => {
    setQuery('');
    setFilteredArticles(articles);
  };

  return (
    <div className="App">
      <div className="content">
        <div className="search-section">
          <h1>Search</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Type to search..."
              value={query}
              onChange={handleSearch}
            />
            {query && (
              <button className="clear-button" onClick={clearSearch}>
                &times;
              </button>
            )}
          </div>
          <p>{filteredArticles.length} posts were found.</p>
          {filteredArticles.map((article) => (
            <div key={article.id} className="article">
              <h2>{highlightText(article.title, query)}</h2>
              <p>{highlightText(article.content, query)}</p>
            </div>
          ))}
        </div>
        <div className="sidebar">
          <div className="profile-card">
            <h3>bits of code</h3>
            <p>Articles on Frontend Development. All articles are written by Moetassem Wehbe, Frontend Developer and User Interface Designer.</p>
            <button className="twitter-button">
              <i className="twitter-icon" /> Follow @moewb
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function highlightText(text, query) {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span>
        ) : (
          part
        )
      )}
    </>
  );
}

export default App;