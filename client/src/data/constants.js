import image01 from '../assets/hostelImages/image01.jpg';
import image02 from '../assets/hostelImages/image02.jpg';
import image03 from '../assets/hostelImages/image03.jpg';

export const SLIDES = [
  {
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    icon: '🏢',
    title: 'Welcome to Modern Hostel Living',
    subtitle: 'Your home away from home with world-class facilities',
    buttonText: 'Explore Features',
    buttonLink: 'features',
    image: image01,
    imageAlt: 'Welcome to Modern Hostel Living'
  },
  {
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    icon: '🛏️',
    title: 'Comfortable Rooms & Amenities',
    subtitle: 'Experience premium comfort with modern amenities',
    buttonText: 'View Gallery',
    buttonLink: 'gallery',
    image: image02,
    imageAlt: 'Comfortable Rooms and Amenities'
  },
  {
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    icon: '👥',
    title: 'Community & Support',
    subtitle: 'Join a vibrant community with 24/7 support',
    buttonText: 'Read Reviews',
    buttonLink: 'testimonials',
    image: image03,
    imageAlt: 'Community and Support'
  }
];

export const FEATURES = [
  {
    icon: '🔐',
    title: 'Secure Environment',
    description: '24/7 security with CCTV surveillance and biometric access control for your safety'
  },
  {
    icon: '📶',
    title: 'High-Speed WiFi',
    description: 'Unlimited high-speed internet connectivity in all rooms and common areas'
  },
  {
    icon: '🍽️',
    title: 'Quality Meals',
    description: 'Nutritious and delicious meals prepared with hygiene and variety in mind'
  },
  {
    icon: '🧺',
    title: 'Laundry Service',
    description: 'Convenient laundry facilities and services to keep your wardrobe fresh'
  },
  {
    icon: '📚',
    title: 'Study Rooms',
    description: 'Quiet study spaces with comfortable seating and proper lighting'
  },
  {
    icon: '💪',
    title: 'Fitness Center',
    description: 'Well-equipped gym and recreation facilities for your wellness'
  }
];

export const GALLERY_ITEMS = [
  {
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    icon: '🛏️',
    title: 'Deluxe Rooms',
    description: 'Spacious and comfortable'
  },
  {
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    icon: '🍴',
    title: 'Dining Area',
    description: 'Clean and hygienic'
  },
  {
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    icon: '🛋️',
    title: 'Common Area',
    description: 'Relax and socialize'
  },
  {
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    icon: '📖',
    title: 'Study Room',
    description: 'Focus on your goals'
  },
  {
    gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    icon: '🏋️',
    title: 'Fitness Center',
    description: 'Stay healthy and fit'
  },
  {
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    icon: '🅿️',
    title: 'Parking Area',
    description: 'Safe vehicle parking'
  }
];

 export const HOSTELS_DATA = {
  girls: [
    {
      id: 1,
      name: "Gangotri Hostel ",
      image: "https://hbtu.ac.in/wp-content/uploads/2024/11/GH3.jpg",
      description: "Premium accommodation with 24/7 security and modern amenities",
      facilities: ["WiFi", "Laundry", "Study Room", "Dining Hall"],
      rating: 4.8,
      rooms: "Single, Double, Triple"
    },
    {
      id: 2,
      name: "Mandakini Hostel Girls",
      image: "https://hbtu.ac.in/wp-content/uploads/2024/11/GH2.jpg",
      description: "Comfortable living with homely environment and caring staff",
      facilities: ["WiFi", "Gym", "Common Room", "Parking"],
      rating: 4.6,
      rooms: "Double, Triple"
    },
    {
      id: 3,
      name: "Alakhanda Hostel ",
      image: "https://hbtu.ac.in/wp-content/uploads/2024/11/GH1.jpg",
      description: "Modern facilities with focus on safety and comfort",
      facilities: ["WiFi", "Library", "CCTV", "Medical Room"],
      rating: 4.7,
      rooms: "Single, Double"
    },
     {
      id: 4,
      name: "Bhagirathi Hostel",
      image: "https://hbtu.ac.in/wp-content/uploads/2024/11/GH4.jpg",
      description: "Modern facilities with focus on safety and comfort",
      facilities: ["WiFi", "Library", "CCTV", "Medical Room"],
      rating: 4.7,
      rooms: "Single, Double"
    }
  ],
  boys: [
    {
      id: 1,
      name: "Abdul Kalam Hostel",
      image: "https://hbtu.ac.in/wp-content/uploads/2024/11/WCH1.jpg",
      description: "Spacious rooms with sports facilities and study environment",
      facilities: ["WiFi", "Sports", "Study Room", "Cafeteria"],
      rating: 4.5,
      rooms: "Single, Double, Triple, Dormitory"
    },
    {
      id: 2,
      name: "Visvesaraya Hostel",
      image: "https://hbtu.ac.in/wp-content/uploads/2024/11/WCH2.jpg",
      description: "Affordable accommodation with all essential facilities",
      facilities: ["WiFi", "Common Room", "Parking", "Dining"],
      rating: 4.3,
      rooms: "Double, Triple, Dormitory"
    },
    {
      id: 3,
      name: "Raman Hostel Boys",
      image: "https://hbtu.ac.in/wp-content/uploads/2024/11/WCH3.jpg",
      description: "Modern infrastructure with tech-friendly environment",
      facilities: ["WiFi", "Gym", "Library", "Computer Lab"],
      rating: 4.6,
      rooms: "Single, Double"
    },
    {
      id: 4,
      name: "Vishwakarma Hostel",
      image: "https://hbtu.ac.in/wp-content/uploads/2024/11/WCH4.jpg",
      description: "Spacious rooms with sports facilities and study environment",
      facilities: ["WiFi", "Sports", "Study Room", "Cafeteria"],
      rating: 4.5,
      rooms: "Single, Double, Triple, Dormitory"
    },
    {
      id: 5,
      name: "Shridhracharya Hostel",
      image: "https://hbtu.ac.in/wp-content/uploads/2024/11/LVOld.jpg",
      description: "Affordable accommodation with all essential facilities",
      facilities: ["WiFi", "Common Room", "Parking", "Dining"],
      rating: 4.3,
      rooms: "Double, Triple, Dormitory"
    },
    {
      id: 6,
      name: "Ramanujam Hostel",
      image: "https://hbtu.ac.in/wp-content/uploads/2024/11/LVNew.jpg",
      description: "Modern infrastructure with tech-friendly environment",
      facilities: ["WiFi", "Gym", "Library", "Computer Lab"],
      rating: 4.6,
      rooms: "Single, Double"
    },
     {
      id: 7,
      name: "Ambedkar Hostel Boys",
      image: "https://hbtu.ac.in/wp-content/uploads/2024/11/hbtuhostels.jpg",
      description: "Spacious rooms with sports facilities and study environment",
      facilities: ["WiFi", "Sports", "Study Room", "Cafeteria"],
      rating: 4.5,
      rooms: "Single, Double, Triple, Dormitory"
    },
    {
      id: 8,
      name: "Aryabhatt Hostel",
      image: "https://hbtu.ac.in/wp-content/uploads/2024/11/GH5.jpg",
      description: "Affordable accommodation with all essential facilities",
      facilities: ["WiFi", "Common Room", "Parking", "Dining"],
      rating: 4.3,
      rooms: "Double, Triple, Dormitory"
    }
    
  ]
};

export const TESTIMONIALS = [
  {
    name: 'Rahul Sharma',
    role: 'Engineering Student',
    avatar: 'RS',
    text: "The best hostel experience I've had! The facilities are top-notch, and the staff is incredibly supportive. The WiFi is super fast, which is perfect for my online classes.",
    rating: 5
  },
  {
    name: 'Priya Kapoor',
    role: 'Medical Student',
    avatar: 'PK',
    text: "Safety was my primary concern, and this hostel exceeded my expectations. The 24/7 security and girls-only floor make me feel completely safe. Highly recommended!",
    rating: 5
  },
  {
    name: 'Amit Verma',
    role: 'MBA Student',
    avatar: 'AV',
    text: "From the food quality to the study rooms, everything is well-maintained. The community here is amazing, and I've made friends for life. Great value for money!",
    rating: 5
  }
];


// Image URLs for Gallery
export const GALLERY_IMAGES = {
  'Deluxe Rooms': [
    'https://content.jdmagicbox.com/comp/kanpur/p9/0512px512.x512.160602172259.s9p9/catalogue/shri-g-boys-hostel-and-pg-kaka-deo-kanpur-paying-guest-accommodations-for-men-1adekpdjzn.jpg',
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=500',
    'https://i.redd.it/4rwoqd3fd0jd1.jpeg'
  ],
  'Dining Area': [
    'https://hbtu.ac.in/wp-content/uploads/2024/11/canteen.jpg',
    'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=500',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500'
  ],
  'Common Area': [
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500',
    'https://images.unsplash.com/photo-1555854876-c77ea81c9b10?w=500',
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500'
  ],
  'Study Room': [
    'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=500',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500'
  ],
  'Fitness Center': [
    'https://tripuratimes.com/ImagesForAll/IMG-20250407-WA0063.jpg',
    'https://hbtu.ac.in/wp-content/uploads/2024/11/gym2.jpg',
    'https://hbtu.ac.in/wp-content/uploads/2024/11/gym3.jpg'
  ],
  'Parking Area': [
    'https://images.unsplash.com/photo-1551524164-6ca64fb04d4d?w=500',
    'https://images.unsplash.com/photo-1547869850-c4275c5b889f?w=500',
    'https://images.unsplash.com/photo-1577702318058-0cd623a1d459?w=500'
  ]
};