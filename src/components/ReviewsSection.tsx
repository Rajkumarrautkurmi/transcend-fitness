import React, { useState, useEffect } from "react";
import { Star, ThumbsUp, MessageSquare, Send, Award, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Review } from "../types";

const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Aditya Gupta",
    rating: 5,
    timeAgo: "2 years ago",
    content: "The trainers are very friendly and funny. He will transform your body in 3 months. If you're near kuleshwor you should join this gym cause every thing in this gym there is really fun and useful. I recommend you to come and join this gym.",
    likes: 12,
    isLocalGuide: false,
    avatarUrl: "https://picsum.photos/seed/aditya/100/100",
  },
  {
    id: "rev-2",
    author: "Divya Bikram Shrestha",
    rating: 5,
    timeAgo: "2 years ago",
    content: "One the best fitness centre @ kuleshwor!! All the members of club are so friendly. Don’t wanna miss a single day without exercise. Yeah Buddy!",
    likes: 18,
    isLocalGuide: true,
    avatarUrl: "https://picsum.photos/seed/divya/100/100",
  },
  {
    id: "rev-3",
    author: "Aditya Gupta",
    rating: 5,
    timeAgo: "2 years ago",
    content: "Very friendly environment, and most reasonable equipments for workout.",
    likes: 8,
    isLocalGuide: false,
    avatarUrl: "https://picsum.photos/seed/aditya_1/100/100",
  },
];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("transcend_gym_reviews");
    if (saved) {
      try {
        setReviews(JSON.parse(saved));
      } catch (e) {
        setReviews(INITIAL_REVIEWS);
      }
    } else {
      setReviews(INITIAL_REVIEWS);
      localStorage.setItem("transcend_gym_reviews", JSON.stringify(INITIAL_REVIEWS));
    }
  }, []);

  const saveReviews = (updated: Review[]) => {
    setReviews(updated);
    localStorage.setItem("transcend_gym_reviews", JSON.stringify(updated));
  };

  const handleLike = (id: string) => {
    const updated = reviews.map((r) => {
      if (r.id === id) {
        const hasLiked = !r.hasLiked;
        return {
          ...r,
          likes: hasLiked ? r.likes + 1 : r.likes - 1,
          hasLiked,
        };
      }
      return r;
    });
    saveReviews(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      rating,
      timeAgo: "Just now",
      content: content.trim(),
      likes: 0,
      isLocalGuide: false,
      avatarUrl: `https://picsum.photos/seed/${encodeURIComponent(author)}/100/100`,
    };

    const updated = [newReview, ...reviews];
    saveReviews(updated);

    // Reset form
    setAuthor("");
    setRating(5);
    setContent("");
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
    }, 2500);
  };

  // Average Rating
  const averageRating = 4.9;
  const totalReviewsCount = reviews.length;

  return (
    <div className="bg-zinc-900 border border-zinc-850 rounded-2xl p-6 shadow-xl" id="gym-reviews">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-8 pb-6 border-b border-zinc-850">
        {/* Rating Breakdown */}
        <div className="flex items-center gap-6">
          <div className="text-center bg-zinc-950 px-5 py-4 rounded-xl border border-zinc-850">
            <div className="text-5xl font-black text-white tracking-tight">{averageRating}</div>
            <div className="flex justify-center gap-0.5 my-1.5 text-[#ccff00]">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-current text-[#ccff00]" />
              ))}
            </div>
            <div className="text-xs font-bold text-zinc-400">({totalReviewsCount} Reviews)</div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Member Testimonials</h3>
            <p className="text-zinc-400 text-sm mt-1 max-w-md">
              Read real transformation stories and physical training reviews shared by the Transcend Health Fitness club members.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-white font-bold py-2.5 px-5 rounded-xl text-sm cursor-pointer transition-all flex items-center gap-2 self-start lg:self-center"
        >
          <MessageSquare className="w-4 h-4 text-[#ccff00]" />
          Write a Review
        </button>
      </div>

      {/* Write Review Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mb-8"
          >
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 mb-4">
              {submitted ? (
                <div className="py-6 text-center space-y-2">
                  <CheckCircle className="w-12 h-12 text-[#ccff00] mx-auto animate-bounce" />
                  <h4 className="text-white font-bold text-lg">Thank You For Your Review!</h4>
                  <p className="text-zinc-400 text-xs">Your validation keeps our fitness community going strong.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h4 className="text-white font-bold text-sm">Write your physical fitness review</h4>
                  
                  {/* Rating selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-400 text-xs font-bold">Your Rating:</span>
                    <div className="flex gap-1 text-zinc-700">
                      {[1, 2, 3, 4, 5].map((starValue) => (
                        <button
                          key={starValue}
                          type="button"
                          onClick={() => setRating(starValue)}
                          onMouseEnter={() => setHoverRating(starValue)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-0.5 cursor-pointer outline-none focus:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-6 h-6 transition-colors ${
                              (hoverRating || rating) >= starValue
                                ? "fill-current text-[#ccff00]"
                                : "text-zinc-700"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <label className="block text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="e.g. Aditya Gupta"
                        className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ccff00]"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-1.5">
                        Review Content
                      </label>
                      <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Share your physical fitness experience at Transcend Gym..."
                        rows={3}
                        className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#ccff00] resize-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-2 text-zinc-400 text-xs font-bold hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#ccff00] text-black font-bold text-xs py-2 px-5 rounded-lg cursor-pointer hover:bg-[#b5e000] flex items-center gap-1.5 shadow-md"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Post Review
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((r) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-zinc-950/60 border border-zinc-850 hover:border-zinc-800 p-5 rounded-2xl transition-all duration-300 flex flex-col md:flex-row gap-4 items-start"
          >
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full border border-zinc-800 bg-zinc-900 flex-shrink-0 overflow-hidden">
              <img
                src={r.avatarUrl}
                alt={r.author}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Content */}
            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-white font-extrabold text-sm">{r.author}</span>
                  {r.isLocalGuide && (
                    <span className="bg-amber-400/10 text-amber-400 border border-amber-400/20 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded flex items-center gap-1">
                      <Award className="w-2.5 h-2.5" />
                      Local Guide
                    </span>
                  )}
                </div>
                <span className="text-zinc-500 text-xs font-medium font-mono">{r.timeAgo}</span>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 text-[#ccff00]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < r.rating ? "fill-current" : "text-zinc-800"
                    }`}
                  />
                ))}
              </div>

              {/* Message */}
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-normal">
                {r.content}
              </p>

              {/* Likes/Actions */}
              <div className="flex items-center gap-4 pt-2">
                <button
                  onClick={() => handleLike(r.id)}
                  className={`flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer ${
                    r.hasLiked ? "text-[#ccff00]" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${r.hasLiked ? "fill-current" : ""}`} />
                  <span>{r.likes} Likes</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
