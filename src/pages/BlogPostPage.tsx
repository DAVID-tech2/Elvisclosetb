import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { INITIAL_BLOG_POSTS } from '../services/storeService';
import { ArrowLeft, Clock, Eye, User, Share2, Tag } from 'lucide-react';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = INITIAL_BLOG_POSTS.find((p) => p.slug === slug) || INITIAL_BLOG_POSTS[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#F97316] mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Blog
      </Link>

      <article className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-100 shadow-xs space-y-6">
        <div>
          <span className="inline-block text-[11px] font-black uppercase tracking-widest text-[#F97316] bg-orange-100/70 px-3 py-1 rounded-full mb-3">
            {post.category}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-gray-900 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mt-4 pt-4 border-t border-gray-100">
            <span className="flex items-center gap-1 font-bold text-gray-800">
              <User className="w-4 h-4 text-[#F97316]" /> {post.author}
            </span>
            <span>•</span>
            <span>{post.publishedAt}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {post.readTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" /> {post.views} Views
            </span>
          </div>
        </div>

        <div className="aspect-16/9 rounded-2xl overflow-hidden shadow-sm">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div className="text-sm text-gray-700 leading-relaxed space-y-4 pt-4">
          <p className="text-base font-medium text-gray-900 leading-relaxed">
            {post.excerpt}
          </p>
          <p>{post.content}</p>
          <p>
            When assembling your seasonal rotation in Uganda, remember that confidence is the ultimate finishing touch. Whether stepping out into Mukono for weekend errands or arriving in Kampala for high-stakes business meetings, intentional styling empowers your everyday presence.
          </p>
        </div>

        <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#F97316]" />
            <span className="text-xs font-bold text-gray-700">Tags: Fashion, Uganda, Style Guide</span>
          </div>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: post.title, url: window.location.href });
              }
            }}
            className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" /> Share Article
          </button>
        </div>
      </article>
    </div>
  );
};
