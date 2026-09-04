import wigStraight from "@/assets/wig-straight.jpg";
import wigBodyWave from "@/assets/wig-body-wave.jpg";
import wigDeepWave from "@/assets/wig-deep-wave.jpg";
import wigKinkyCurly from "@/assets/wig-kinky-curly.jpg";
import wigWaterWave from "@/assets/wig-water-wave.jpg";
import wigCurlyBob from "@/assets/wig-curly-bob.jpg";
import wigLooseWave from "@/assets/wig-loose-wave.jpg";

export type Product = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  texture: string;
  badge?: "New" | "Best Seller" | "Sale";
  description: string;
};

export const products: Product[] = [
  {
    id: "hd-lace-straight",
    name: "HD Lace Straight",
    subtitle: "Lace Front Wig",
    price: 125000,
    originalPrice: 148000,
    rating: 5,
    reviews: 128,
    image: wigStraight,
    category: "Lace Front Wigs",
    texture: "Straight",
    badge: "Best Seller",
    description:
      "Sleek, soft and effortlessly straight. Our HD lace melts into every skin tone for a flawless, undetectable finish. 100% virgin human hair, pre-plucked with a natural hairline.",
  },
  {
    id: "body-wave-lace-front",
    name: "Body Wave",
    subtitle: "Lace Front Wig",
    price: 115000,
    rating: 4.5,
    reviews: 96,
    image: wigBodyWave,
    category: "Lace Front Wigs",
    texture: "Body Wave",
    badge: "Sale",
    description:
      "Soft, bouncy waves with natural volume. Can be straightened, curled, dyed and styled — this is your everyday luxury wave.",
  },
  {
    id: "deep-wave-glueless",
    name: "Deep Wave",
    subtitle: "Glueless Wig",
    price: 108000,
    rating: 4.5,
    reviews: 64,
    image: wigDeepWave,
    category: "Glueless Wigs",
    texture: "Deep Wave",
    badge: "New",
    description:
      "Rich deep waves with a glueless, beginner-friendly cap. Adjustable straps and combs keep everything secure — no glue, no gel, no stress.",
  },
  {
    id: "kinky-curly-glueless",
    name: "Kinky Curly",
    subtitle: "Glueless Wig",
    price: 118000,
    rating: 5,
    reviews: 54,
    image: wigKinkyCurly,
    category: "Glueless Wigs",
    texture: "Kinky Curly",
    description:
      "Full, springy curls that mimic natural 4B/4C texture. Glueless comfort with maximum volume and definition.",
  },
  {
    id: "water-wave-lace-front",
    name: "Water Wave",
    subtitle: "Lace Front Wig",
    price: 113000,
    rating: 4.5,
    reviews: 83,
    image: wigWaterWave,
    category: "Lace Front Wigs",
    texture: "Water Wave",
    description:
      "Effortless beachy waves with a natural sheen. Low-maintenance texture that holds beautifully through the week.",
  },
  {
    id: "curly-bob-glueless",
    name: "Curly Bob",
    subtitle: "Glueless Wig",
    price: 89000,
    rating: 4.5,
    reviews: 33,
    image: wigCurlyBob,
    category: "Bob Wigs",
    texture: "Curly",
    description:
      "A chic, face-framing curly bob. Lightweight, breathable and ready to wear straight out of the box.",
  },
  {
    id: "loose-wave-highlight",
    name: "Loose Wave",
    subtitle: "Lace Front Wig",
    price: 110000,
    rating: 4.5,
    reviews: 41,
    image: wigLooseWave,
    category: "Lace Front Wigs",
    texture: "Loose Wave",
    badge: "New",
    description:
      "Soft loose waves with hand-painted highlight dimension. Glamorous movement with a sun-kissed finish.",
  },
  {
    id: "straight-13x4",
    name: "Straight 13x4",
    subtitle: "Lace Front Wig",
    price: 118000,
    rating: 4.5,
    reviews: 76,
    image: wigStraight,
    category: "Lace Front Wigs",
    texture: "Straight",
    description:
      "13x4 frontal for deep parting space and endless styling. Bone-straight silkiness from root to tip.",
  },
];

export const categories = [
  { name: "Lace Front Wigs", image: wigStraight },
  { name: "Glueless Wigs", image: wigDeepWave },
  { name: "Bob Wigs", image: wigCurlyBob },
  { name: "Headband Wigs", image: wigWaterWave },
  { name: "Bob & Short", image: wigKinkyCurly },
  { name: "Bundles & Extensions", image: wigLooseWave },
];

export const formatNaira = (n: number) => "₦" + n.toLocaleString("en-NG");
