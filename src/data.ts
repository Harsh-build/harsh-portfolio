export interface NavItem {
  href: string;
  label: string;
}

export const Mo: NavItem[] = [
  { href: "#hero", label: "Home" },
  { href: "#thumbnails", label: "Social" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Work" },
  { href: "#thumbnail-designs", label: "Designs" },
  { href: "#contact", label: "Contact" }
];

export interface SocialThumbnail {
  id: number;
  img: string;
  rotate: string;
  size: string;
  badge: string | null;
}

export const Lo: SocialThumbnail[] = [
  {
    id: 1,
    img: "https://static.readdy.ai/image/bd5fa4b03e8d7e05e5fd4605c41d9faf/a0ab65181fba6d0bd5a47780ffe6d413.jpeg",
    rotate: "-rotate-2",
    size: "col-span-1 row-span-1",
    badge: null
  },
  {
    id: 2,
    img: "https://readdy.ai/api/search-image?query=Epic%20sports%20YouTube%20thumbnail%20footballer%20action%20shot%20dramatic%20stadium%20lighting%20orange%20glow%20black%20background%20bold%20text%20overlay%20high%20contrast%20cinematic%20style%20graphic%20design&width=400&height=225&seq=sm-thumb-harsh-02&orientation=landscape",
    rotate: "rotate-1",
    size: "col-span-1 row-span-1",
    badge: null
  },
  {
    id: 3,
    img: "https://static.readdy.ai/image/bd5fa4b03e8d7e05e5fd4605c41d9faf/e7db07bf92f154c0d1ede55be085d315.jpeg",
    rotate: "-rotate-1",
    size: "col-span-1 row-span-1",
    badge: "Ad"
  },
  {
    id: 4,
    img: "https://readdy.ai/api/search-image?query=BMW%20luxury%20car%20YouTube%20thumbnail%20dark%20sleek%20background%20orange%20accent%20lighting%20cinematic%20dramatic%20angle%20low%20angle%20shot%20professional%20automotive%20photography%20bold%20design&width=400&height=225&seq=sm-thumb-harsh-04&orientation=landscape",
    rotate: "rotate-2",
    size: "col-span-1 row-span-1",
    badge: null
  },
  {
    id: 5,
    img: "https://readdy.ai/api/search-image?query=Motivational%20YouTube%20thumbnail%20bold%20white%20text%20dark%20background%20orange%20glow%20effects%20dramatic%20portrait%20face%20shocked%20expression%20viral%20style%20graphic%20design%20high%20contrast%20cinematic&width=400&height=225&seq=sm-thumb-harsh-05&orientation=landscape",
    rotate: "-rotate-2",
    size: "col-span-1 row-span-1",
    badge: null
  },
  {
    id: 6,
    img: "https://readdy.ai/api/search-image?query=Gaming%20YouTube%20thumbnail%20neon%20orange%20and%20black%20color%20scheme%20dramatic%20character%20art%20game%20poster%20style%20bold%20typography%20dark%20moody%20background%20high%20contrast%20vivid%20colors%20cinematic&width=400&height=225&seq=sm-thumb-harsh-06&orientation=landscape",
    rotate: "rotate-1",
    size: "col-span-1 row-span-1",
    badge: null
  },
  {
    id: 7,
    img: "https://readdy.ai/api/search-image?query=Fitness%20gym%20YouTube%20thumbnail%20muscular%20person%20dramatic%20studio%20lighting%20black%20background%20orange%20fire%20effects%20bold%20motivational%20text%20high%20contrast%20professional%20photo%20edit%20cinematic&width=400&height=225&seq=sm-thumb-harsh-07&orientation=landscape",
    rotate: "-rotate-1",
    size: "col-span-1 row-span-1",
    badge: null
  },
  {
    id: 8,
    img: "https://static.readdy.ai/image/bd5fa4b03e8d7e05e5fd4605c41d9faf/f763add05f8c4b1bde5e5c5b9759f670.jpeg",
    rotate: "rotate-2",
    size: "col-span-1 row-span-1",
    badge: "HQ"
  }
];

export const Bo: string[] = [
  "YouTube Video Editing",
  "Thumbnail Designing",
  "Short-form Reels / Shorts",
  "Color Grading"
];

export interface VideoProject {
  id: number;
  img: string;
  title: string;
  type: "YouTube" | "Reels" | "Shorts";
  videoUrl?: string;
}

export const Ho: VideoProject[] = [
  {
    id: 1,
    img: "https://readdy.ai/api/search-image?query=Cinematic%20YouTube%20video%20thumbnail%20dramatic%20dark%20background%20orange%20light%20leaks%20epic%20travel%20vlog%20style%20mountains%20adventure%20bold%20white%20text%20overlay%20professional%20video%20edit%20preview&width=480&height=270&seq=vid-edit-harsh-01&orientation=landscape",
    title: "Travel Vlog Edit",
    type: "YouTube",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-snowy-mountain-range-43306-large.mp4"
  },
  {
    id: 2,
    img: "https://readdy.ai/api/search-image?query=Dark%20cinematic%20YouTube%20video%20edit%20preview%20dramatic%20fitness%20motivation%20video%20gym%20workout%20fiery%20orange%20effects%20bold%20typography%20overlay%20professional%20color%20grade%20high%20contrast&width=480&height=270&seq=vid-edit-harsh-02&orientation=landscape",
    title: "Fitness Reel",
    type: "Reels",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-athlete-training-with-battle-ropes-in-slow-motion-42284-large.mp4"
  },
  {
    id: 3,
    img: "https://readdy.ai/api/search-image?query=YouTube%20gaming%20channel%20video%20edit%20preview%20neon%20orange%20glow%20dark%20moody%20atmosphere%20action%20game%20scene%20cinematic%20slow%20motion%20effects%20professional%20color%20grading%20epic%20thumbnail&width=480&height=270&seq=vid-edit-harsh-03&orientation=landscape",
    title: "Gaming Montage",
    type: "YouTube",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-gamer-playing-a-first-person-shooter-43849-large.mp4"
  },
  {
    id: 4,
    img: "https://readdy.ai/api/search-image?query=Short%20form%20Instagram%20reels%20preview%20food%20recipe%20cinematic%20edit%20warm%20tones%20orange%20color%20grade%20restaurant%20promotional%20video%20professional%20lighting%20dark%20moody%20background&width=480&height=270&seq=vid-edit-harsh-04&orientation=landscape",
    title: "Food Brand Promo",
    type: "Reels",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-chef-slicing-fresh-ripe-tomatoes-42657-large.mp4"
  },
  {
    id: 5,
    img: "https://readdy.ai/api/search-image?query=Music%20video%20edit%20preview%20cinematic%20dark%20moody%20atmosphere%20dramatic%20lighting%20orange%20and%20black%20color%20scheme%20artist%20portrait%20professional%20video%20production%20high%20contrast%20bold%20design&width=480&height=270&seq=vid-edit-harsh-05&orientation=landscape",
    title: "Music Video Edit",
    type: "YouTube",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-dj-adjusting-the-sound-on-his-mixer-43956-large.mp4"
  },
  {
    id: 6,
    img: "https://readdy.ai/api/search-image?query=Motivational%20YouTube%20short%20video%20edit%20bold%20typography%20dark%20background%20orange%20fire%20glow%20effects%20inspiring%20content%20cinematic%20transitions%20professional%20color%20grading%20dramatic%20preview&width=480&height=270&seq=vid-edit-harsh-06&orientation=landscape",
    title: "Motivational Short",
    type: "Shorts",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-runs-on-a-pavement-in-the-city-at-sunset-42022-large.mp4"
  },
  {
    id: 7,
    img: "https://img.youtube.com/vi/mJdeQjk0GuU/hqdefault.jpg",
    title: "Before & After Transition",
    type: "Shorts",
    videoUrl: "https://www.youtube.com/embed/mJdeQjk0GuU"
  }
];

export const Uo: Record<string, string> = {
  YouTube: "#FF0000",
  Reels: "#C13584",
  Shorts: "#FF6B00"
};

export interface ThumbnailDesign {
  id: number;
  img: string;
  badge: string | null;
}

export const Go: ThumbnailDesign[] = [
  {
    id: 1,
    img: "https://readdy.ai/api/search-image?query=Eye%20catching%20YouTube%20thumbnail%20design%20bold%20orange%20and%20black%20color%20scheme%20dramatic%20face%20reaction%20shocked%20expression%20high%20contrast%20professional%20design%20click%20bait%20style&width=400&height=225&seq=thumb-design-harsh-01&orientation=landscape",
    badge: "High Quality"
  },
  {
    id: 2,
    img: "https://static.readdy.ai/image/bd5fa4b03e8d7e05e5fd4605c41d9faf/ba54f855d3b105687d095cc78ddecb56.jpeg",
    badge: null
  },
  {
    id: 3,
    img: "https://readdy.ai/api/search-image?query=Viral%20YouTube%20thumbnail%20design%20money%20finance%20topic%20gold%20and%20black%20dramatic%20lighting%20bold%20typography%20professional%20graphic%20design%20high%20contrast%20eye%20catching&width=400&height=225&seq=thumb-design-harsh-03&orientation=landscape",
    badge: null
  },
  {
    id: 4,
    img: "https://static.readdy.ai/image/bd5fa4b03e8d7e05e5fd4605c41d9faf/b9fe9711c83994b00cff63859c655adb.jpeg",
    badge: null
  },
  {
    id: 5,
    img: "https://static.readdy.ai/image/bd5fa4b03e8d7e05e5fd4605c41d9faf/d4180464d16d18e7f7fbab9b2b2d049b.jpeg",
    badge: null
  },
  {
    id: 6,
    img: "https://readdy.ai/api/search-image?query=Educational%20YouTube%20thumbnail%20knowledge%20learning%20bold%20orange%20and%20white%20design%20dark%20background%20modern%20clean%20typography%20professional%20graphic%20design%20infographic%20style&width=400&height=225&seq=thumb-design-harsh-06&orientation=landscape",
    badge: null
  },
  {
    id: 7,
    img: "https://readdy.ai/api/search-image?query=Lifestyle%20vlog%20YouTube%20thumbnail%20day%20in%20life%20candid%20portrait%20warm%20orange%20tones%20dark%20moody%20background%20bold%20text%20professional%20design%20high%20quality%20photography&width=400&height=225&seq=thumb-design-harsh-07&orientation=landscape",
    badge: "Trending"
  },
  {
    id: 8,
    img: "https://readdy.ai/api/search-image?query=Reaction%20video%20YouTube%20thumbnail%20shocked%20face%20exaggerated%20expression%20bold%20orange%20and%20yellow%20accents%20dark%20background%20text%20overlay%20viral%20content%20professional%20graphic%20design&width=400&height=225&seq=thumb-design-harsh-08&orientation=landscape",
    badge: null
  }
];

export interface SoftwareProgress {
  name: string;
  pct: number;
}

export const softwareSkills: SoftwareProgress[] = [
  { name: "Filmora PC & Mobile", pct: 90 },
  { name: "CapCut PC & Mobile", pct: 95 },
  { name: "Photoshop PC", pct: 85 },
  { name: "PicsArt Mobile", pct: 88 }
];

export const socialLinks = {
  instagram: "https://www.instagram.com/harshig_07?psln=MTI4Z293MTZpcGN5OA==",
  instagramHandle: "@harshig_07",
  youtube: "https://youtube.com/shorts/mJdeQjk0GuU",
  email: "kumarharsh0720@gmail.com"
};

