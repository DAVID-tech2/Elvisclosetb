import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BannerHero } from '../components/common/BannerHero';
import { INITIAL_BLOG_POSTS } from '../services/storeService';
import { Search, Eye, Clock, ArrowRight, Tag } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPosts = INITIAL_BLOG_POSTS.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || post.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Banner matching screenshot `IMG-20261108-WA0015_082a2b50.jpg` */}
      <BannerHero
        badge="OUR BLOG"
        title="Fashion Insights"
        highlightedText="& Style Tips"
        subtitle="Stay updated with the latest fashion trends, curated style tips and boutique shopping guides."
        rightScript="Dress Better. Feel Greater."
        image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-14">
        {/* Left 2 Columns: Articles Grid */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-3xl border border-gray-100 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-16/10 overflow-hidden bg-neutral-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#F97316] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-3 text-[11px] text-gray-400">
                      <span>{post.publishedAt}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {post.views} Views
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>

                    <Link to={`/blog/${post.slug}`} className="block">
                      <h3 className="text-base font-extrabold text-gray-900 group-hover:text-[#F97316] transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-1">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-xs font-bold text-[#F97316] hover:text-[#EA580C] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Right Column: Search, Categories, Recent Posts matching screenshot */}
        <aside className="space-y-6">
          {/* Search Box */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-3">
            <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider">
              Search Blog
            </h4>
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#F97316] text-gray-900"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-3">
            <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
              Categories
            </h4>
            <div className="space-y-2 text-xs font-bold">
              {[
                { name: 'all', label: 'All Articles', count: 14 },
                { name: 'Fashion Tips', label: 'Fashion Tips', count: 5 },
                { name: 'Style Guide', label: 'Style Guide', count: 4 },
                { name: 'Trends', label: 'Trends', count: 3 },
                { name: 'Shopping Guide', label: 'Shopping Guide', count: 3 },
                { name: 'Lifestyle', label: 'Lifestyle', count: 2 },
              ].map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setSelectedCategory(c.name)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl transition-colors cursor-pointer ${
                    selectedCategory === c.name
                      ? 'bg-orange-50 text-[#F97316]'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-[#F97316]" /> {c.label}
                  </span>
                  <span className="text-gray-400 font-normal">{c.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Posts */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-4">
            <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
              Recent Posts
            </h4>

            <div className="space-y-3">
              {INITIAL_BLOG_POSTS.slice(0, 4).map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="flex items-center gap-3 group"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                  <div className="overflow-hidden">
                    <h5 className="text-xs font-bold text-gray-900 group-hover:text-[#F97316] transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h5>
                    <span className="text-[10px] text-gray-400 mt-1 block">
                      {post.publishedAt}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
