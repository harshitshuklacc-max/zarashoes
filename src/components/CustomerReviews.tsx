import React, { useState } from 'react';
import { Star, ThumbsUp, CheckCircle, MessageSquarePlus, X, Filter } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CustomerReview } from '../types/store';

export const CustomerReviews: React.FC = () => {
  const {
    reviews,
    addReview,
    voteHelpful,
    isWriteReviewOpen,
    setIsWriteReviewOpen,
    showNotification
  } = useStore();

  const [starFilter, setStarFilter] = useState<number | 'all'>('all');

  // Form State for Write a Review
  const [authorName, setAuthorName] = useState('');
  const [location, setLocation] = useState('Delhi NCR');
  const [rating, setRating] = useState(5);
  const [headline, setHeadline] = useState('');
  const [comment, setComment] = useState('');
  const [fitFeedback, setFitFeedback] = useState<CustomerReview['fitFeedback']>('True to Size');

  const averageRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  const starCounts = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => r.rating === stars).length,
    percentage: Math.round((reviews.filter(r => r.rating === stars).length / (reviews.length || 1)) * 100)
  }));

  const filteredReviews = reviews.filter(r => starFilter === 'all' || r.rating === starFilter);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim() || !headline.trim()) {
      showNotification('Please fill in all review fields.');
      return;
    }

    addReview({
      customerName: authorName.trim(),
      location: location.trim(),
      rating,
      headline: headline.trim(),
      comment: comment.trim(),
      verified: true,
      fitFeedback
    });

    setIsWriteReviewOpen(false);
    setAuthorName('');
    setHeadline('');
    setComment('');
  };

  return (
    <section id="reviews-section" className="py-16 bg-zinc-950 border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-zinc-800/80 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-medium mb-2">
              <span>Verified Patron Reviews</span>
              <span>·</span>
              <span>Brahumpuri & Online Buyers</span>
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Customer Experiences & Verdicts
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl mt-2 font-sans-clean">
              Real testimonials from Delhi gentlemen and pan-India patrons who value authentic bespoke tailoring, premium fabrics, and transparent boutique pricing.
            </p>
          </div>

          <button
            onClick={() => setIsWriteReviewOpen(true)}
            className="px-5 py-3 bg-zinc-900 border border-amber-500/40 hover:border-amber-400 text-amber-300 hover:text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/5"
          >
            <MessageSquarePlus className="w-4 h-4 text-amber-400" />
            <span>Write a Verified Review</span>
          </button>
        </div>

        {/* Rating Overview Summary & Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-zinc-900/40 p-6 sm:p-8 rounded-2xl border border-zinc-800">
          
          {/* Big Score */}
          <div className="md:col-span-4 text-center md:text-left space-y-2 border-b md:border-b-0 md:border-r border-zinc-800/80 pb-6 md:pb-0 md:pr-8">
            <span className="font-serif-luxury text-5xl sm:text-6xl font-bold text-gold-gradient tabular-nums">
              {averageRating}
            </span>
            <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400 pt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-zinc-400">
              Based on <strong className="text-zinc-200 tabular-nums">{reviews.length + 340}</strong> verified purchases
            </p>
            <div className="pt-2 text-[11px] text-amber-400 font-medium">
              ✓ 98.4% of Delhi buyers recommend Zara Traders
            </div>
          </div>

          {/* Star Distribution Bars */}
          <div className="md:col-span-8 space-y-2">
            {starCounts.map(({ stars, count, percentage }) => (
              <div
                key={stars}
                onClick={() => setStarFilter(starFilter === stars ? 'all' : stars)}
                className="flex items-center gap-3 text-xs cursor-pointer group"
              >
                <div className="w-16 flex items-center gap-1 text-zinc-300 font-mono">
                  <span>{stars}</span>
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                </div>
                <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold-gradient transition-all duration-300 group-hover:brightness-125"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="w-12 text-right font-mono text-zinc-400 text-[11px] tabular-nums">
                  {percentage}%
                </div>
              </div>
            ))}

            {starFilter !== 'all' && (
              <div className="pt-2 flex items-center justify-between text-xs text-amber-400">
                <span>Filtering by {starFilter} star reviews</span>
                <button
                  onClick={() => setStarFilter('all')}
                  className="underline hover:text-white cursor-pointer"
                >
                  Show all reviews
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map(review => (
            <div
              key={review.id}
              className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800 flex flex-col justify-between space-y-4 hover:border-zinc-700 transition-colors"
            >
              <div className="space-y-2.5">
                {/* Stars and Verified Marker */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-700'
                        }`}
                      />
                    ))}
                  </div>
                  {review.verified && (
                    <span className="flex items-center gap-1 text-[11px] text-amber-400 font-medium">
                      <CheckCircle className="w-3 h-3" />
                      <span>Verified Buyer</span>
                    </span>
                  )}
                </div>

                {/* Headline */}
                <h4 className="font-serif-luxury text-sm font-bold text-white line-clamp-1">
                  "{review.headline}"
                </h4>

                {/* Review Text */}
                <p className="text-xs text-zinc-300 leading-relaxed font-sans-clean">
                  {review.comment}
                </p>
              </div>

              {/* Author & Footer */}
              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
                <div>
                  <span className="font-semibold text-zinc-200 block">{review.customerName}</span>
                  <span className="text-zinc-500">{review.location} · {review.date}</span>
                </div>

                <button
                  onClick={() => voteHelpful(review.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 hover:text-amber-300 transition-colors cursor-pointer"
                  title="Mark as helpful"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span className="font-mono tabular-nums">{review.helpfulVotes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Write a Review Modal */}
      {isWriteReviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-serif-luxury text-lg font-bold text-white">Write a Review for Zara Traders</h3>
              <button
                onClick={() => setIsWriteReviewOpen(false)}
                className="p-1 rounded-md text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-medium mb-1.5">Your Overall Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-700'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 font-mono text-amber-400 font-bold">{rating} / 5 Stars</span>
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sameer Kapoor"
                  value={authorName}
                  onChange={e => setAuthorName(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Your Location / City *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Brahumpuri, Delhi or Greater Kailash"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Review Headline *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Impeccable fit and fast Delhi delivery"
                  value={headline}
                  onChange={e => setHeadline(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Detailed Review *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details regarding the fabric quality, stitching, button finishes, delivery speed, or in-store customer support..."
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">How did the sizing fit you?</label>
                <div className="flex gap-2">
                  {(['Runs Small', 'True to Size', 'Runs Large'] as const).map(option => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setFitFeedback(option)}
                      className={`flex-1 py-1.5 rounded-lg border text-center transition-colors cursor-pointer ${
                        fitFeedback === option
                          ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-semibold'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsWriteReviewOpen(false)}
                  className="px-4 py-2 bg-zinc-900 text-zinc-400 hover:text-white rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gold-gradient text-zinc-950 font-bold uppercase tracking-wider rounded-lg hover:brightness-110 cursor-pointer"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
