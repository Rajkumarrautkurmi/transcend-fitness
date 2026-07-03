export interface Review {
  id: string;
  author: string;
  rating: number;
  timeAgo: string;
  content: string;
  avatarUrl?: string;
  isLocalGuide?: boolean;
  likes: number;
  hasLiked?: boolean;
}

export interface WorkoutDay {
  day: string;
  focus: string;
  exercises: { name: string; sets: string; reps: string }[];
}

export interface WorkoutPlan {
  level: string;
  goal: string;
  description: string;
  schedule: WorkoutDay[];
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  popular?: boolean;
  features: string[];
  color: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}
