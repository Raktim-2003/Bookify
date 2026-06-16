// Event Categories
export const CATEGORIES = [
  {
    id: "tech",
    label: "Technology",
    icon: "💻",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    description:
      "Tech meetups, hackathons, and developer conferences",
  },

  {
    id: "music",
    label: "Music",
    icon: "🎵",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
    description:
      "Concerts, festivals, and live performances",
  },

  {
    id: "sports",
    label: "Sports",
    icon: "⚽",
    image:
      "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d",
    description:
      "Sports events, tournaments, and fitness activities",
  },

  {
    id: "art",
    label: "Art & Culture",
    icon: "🎨",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
    description:
      "Art exhibitions, cultural events, and creative workshops",
  },

  {
    id: "food",
    label: "Food & Drink",
    icon: "🍕",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    description:
      "Food festivals, cooking classes, and culinary experiences",
  },

  {
    id: "business",
    label: "Business",
    icon: "💼",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    description:
      "Networking events, conferences, and startup meetups",
  },

  {
    id: "health",
    label: "Health & Wellness",
    icon: "🧘",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    description:
      "Yoga, meditation, wellness workshops, and health seminars",
  },

  {
    id: "education",
    label: "Education",
    icon: "📚",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
    description:
      "Workshops, seminars, and learning experiences",
  },

  {
    id: "gaming",
    label: "Gaming",
    icon: "🎮",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    description:
      "Gaming tournaments, esports, and gaming conventions",
  },

  {
    id: "networking",
    label: "Networking",
    icon: "🤝",
    image:
      "https://images.unsplash.com/photo-1515169067868-5387ec356754",
    description:
      "Professional networking and community building events",
  },

  {
    id: "outdoor",
    label: "Outdoor & Adventure",
    icon: "🏕️",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    description:
      "Hiking, camping, and outdoor activities",
  },

  {
    id: "community",
    label: "Community",
    icon: "👥",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
    description:
      "Local community gatherings and social events",
  },
];

// Get category by ID
export const getCategoryById = (id) => {
  return CATEGORIES.find((cat) => cat.id === id);
};

// Get category label
export const getCategoryLabel = (id) => {
  const category = getCategoryById(id);
  return category ? category.label : id;
};

// Get category icon
export const getCategoryIcon = (id) => {
  const category = getCategoryById(id);
  return category ? category.icon : "📅";
};

// Get category image
export const getCategoryImage = (id) => {
  const category = getCategoryById(id);

  return (
    category?.image ||
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
  );
};