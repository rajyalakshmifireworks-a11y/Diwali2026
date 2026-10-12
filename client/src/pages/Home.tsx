import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  Clipboard,
  ChevronDown,
  Clock3,
  Info,
  MapPin,
  Menu,
  Minus,
  Phone,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";

type Product = {
  id: string;
  name: string;
  description?: string;
  note?: string;
  accent: string;
  category: string;
  image: string;
  salePrice: number;
  discount: number;
  price: number;
  stock: number;
  unit: string;
};

type CustomerDetails = {
  name: string;
  phone: string;
  area: string;
  notes: string;
};

const products: Product[] = [
  {"id": "spinner-spl", "name": "Spinner Spl", "category": "Spinners & wheels", "salePrice": 162.5, "discount": 32.5, "price": 130.0, "stock": 10, "image": "/manus-storage/wheels_d9d25d63.webp", "accent": "from-amber-300/35 to-orange-500/10", "unit": "unit"},
  {"id": "spinner-dlx", "name": "Spinner Dlx", "category": "Spinners & wheels", "salePrice": 600.0, "discount": 120.0, "price": 480.0, "stock": 10, "image": "/manus-storage/wheels_d9d25d63.webp", "accent": "from-amber-300/35 to-orange-500/10", "unit": "unit"},
  {"id": "wire-chackar", "name": "Wire Chackar", "category": "Spinners & wheels", "salePrice": 500.0, "discount": 100.0, "price": 400.0, "stock": 10, "image": "/manus-storage/wheels_d9d25d63.webp", "accent": "from-amber-300/35 to-orange-500/10", "unit": "unit"},
  {"id": "4x4-wheel", "name": "4x4 Wheel", "category": "Spinners & wheels", "salePrice": 350.0, "discount": 70.0, "price": 280.0, "stock": 5, "image": "/manus-storage/wheels_d9d25d63.webp", "accent": "from-amber-300/35 to-orange-500/10", "unit": "unit"},
  {"id": "madura-malli", "name": "Madura Malli", "category": "Crackers & bombs", "salePrice": 650.0, "discount": 130.0, "price": 520.0, "stock": 10, "image": "/manus-storage/crackers_f652aa1c.webp", "accent": "from-emerald-300/25 to-teal-500/10", "unit": "unit"},
  {"id": "sky-army", "name": "Sky Army", "category": "Rockets & aerials", "salePrice": 650.0, "discount": 130.0, "price": 520.0, "stock": 10, "image": "/manus-storage/rockets_4fd47605.webp", "accent": "from-sky-300/30 to-indigo-500/10", "unit": "unit"},
  {"id": "kutralam", "name": "Kutralam", "category": "Ground fountains & pots", "salePrice": 500.0, "discount": 100.0, "price": 400.0, "stock": 5, "image": "/manus-storage/flower-pots_7d2f67af.webp", "accent": "from-rose-300/30 to-red-500/10", "unit": "unit"},
  {"id": "1-kg", "name": "1 kg", "category": "Crackers & bombs", "salePrice": 475.0, "discount": 95.0, "price": 380.0, "stock": 10, "image": "/manus-storage/crackers_f652aa1c.webp", "accent": "from-emerald-300/25 to-teal-500/10", "unit": "unit"},
  {"id": "agni-bomb", "name": "Agni Bomb", "category": "Crackers & bombs", "salePrice": 500.0, "discount": 100.0, "price": 400.0, "stock": 10, "image": "/manus-storage/crackers_f652aa1c.webp", "accent": "from-emerald-300/25 to-teal-500/10", "unit": "unit"},
  {"id": "cylinder", "name": "Cylinder", "category": "Crackers & bombs", "salePrice": 500.0, "discount": 100.0, "price": 400.0, "stock": 10, "image": "/manus-storage/crackers_f652aa1c.webp", "accent": "from-emerald-300/25 to-teal-500/10", "unit": "unit"},
  {"id": "color-kotti-dlx", "name": "Color Kotti Dlx", "category": "Rockets & aerials", "salePrice": 1000.0, "discount": 200.0, "price": 800.0, "stock": 10, "image": "/manus-storage/rockets_4fd47605.webp", "accent": "from-sky-300/30 to-indigo-500/10", "unit": "unit"},
  {"id": "mega-color-kotti", "name": "Mega Color Kotti", "category": "Rockets & aerials", "salePrice": 1500.0, "discount": 300.0, "price": 1200.0, "stock": 10, "image": "/manus-storage/rockets_4fd47605.webp", "accent": "from-sky-300/30 to-indigo-500/10", "unit": "unit"},
  {"id": "spinner-supper-dlx", "name": "Spinner Supper Dlx", "category": "Spinners & wheels", "salePrice": 750.0, "discount": 150.0, "price": 600.0, "stock": 10, "image": "/manus-storage/wheels_d9d25d63.webp", "accent": "from-amber-300/35 to-orange-500/10", "unit": "unit"},
  {"id": "helicopter", "name": "Helicopter", "category": "Rockets & aerials", "salePrice": 375.0, "discount": 75.0, "price": 300.0, "stock": 10, "image": "/manus-storage/rockets_4fd47605.webp", "accent": "from-sky-300/30 to-indigo-500/10", "unit": "unit"},
  {"id": "bambaram", "name": "Bambaram", "category": "Spinners & wheels", "salePrice": 250.0, "discount": 50.0, "price": 200.0, "stock": 10, "image": "/manus-storage/wheels_d9d25d63.webp", "accent": "from-amber-300/35 to-orange-500/10", "unit": "unit"},
  {"id": "3-sound", "name": "3 Sound", "category": "Crackers & bombs", "salePrice": 112.5, "discount": 22.5, "price": 90.0, "stock": 50, "image": "/manus-storage/crackers_f652aa1c.webp", "accent": "from-emerald-300/25 to-teal-500/10", "unit": "unit"},
  {"id": "240-shot", "name": "240 Shot", "category": "Rockets & aerials", "salePrice": 8750.0, "discount": 1750.0, "price": 7000.0, "stock": 2, "image": "/manus-storage/rockets_4fd47605.webp", "accent": "from-sky-300/30 to-indigo-500/10", "unit": "unit"},
  {"id": "kz-rocket", "name": "Kz Rocket", "category": "Rockets & aerials", "salePrice": 400.0, "discount": 80.0, "price": 320.0, "stock": 10, "image": "/manus-storage/rockets_4fd47605.webp", "accent": "from-sky-300/30 to-indigo-500/10", "unit": "unit"},
  {"id": "2-sound-rocket", "name": "2 Sound Rocket", "category": "Rockets & aerials", "salePrice": 375.0, "discount": 75.0, "price": 300.0, "stock": 20, "image": "/manus-storage/rockets_4fd47605.webp", "accent": "from-sky-300/30 to-indigo-500/10", "unit": "unit"},
  {"id": "rocket-bomb", "name": "Rocket Bomb", "category": "Rockets & aerials", "salePrice": 250.0, "discount": 50.0, "price": 200.0, "stock": 15, "image": "/manus-storage/rockets_4fd47605.webp", "accent": "from-sky-300/30 to-indigo-500/10", "unit": "unit"},
  {"id": "jalli-kettu", "name": "Jalli Kettu", "category": "Crackers & bombs", "salePrice": 125.0, "discount": 25.0, "price": 100.0, "stock": 20, "image": "/manus-storage/crackers_f652aa1c.webp", "accent": "from-emerald-300/25 to-teal-500/10", "unit": "unit"},
  {"id": "4-dlx-laxmi", "name": "4'' Dlx Laxmi", "category": "Crackers & bombs", "salePrice": 100.0, "discount": 20.0, "price": 80.0, "stock": 50, "image": "/manus-storage/crackers_f652aa1c.webp", "accent": "from-emerald-300/25 to-teal-500/10", "unit": "unit"},
  {"id": "4-laxmi", "name": "4'' Laxmi", "category": "Crackers & bombs", "salePrice": 75.0, "discount": 15.0, "price": 60.0, "stock": 60, "image": "/manus-storage/crackers_f652aa1c.webp", "accent": "from-emerald-300/25 to-teal-500/10", "unit": "unit"},
  {"id": "10x10-mix", "name": "10x10 Mix", "category": "Assorted packs", "salePrice": 8750.0, "discount": 1750.0, "price": 7000.0, "stock": 3, "image": "/manus-storage/assorted_89240ca4.webp", "accent": "from-yellow-200/35 to-lime-500/10", "unit": "unit"},
  {"id": "6-fancy-2-pcs", "name": "6'' Fancy 2 Pcs", "category": "Ground fountains & pots", "salePrice": 4000.0, "discount": 800.0, "price": 3200.0, "stock": 5, "image": "/manus-storage/flower-pots_7d2f67af.webp", "accent": "from-rose-300/30 to-red-500/10", "unit": "unit"},
  {"id": "5-fancy-2-pcs", "name": "5'' Fancy 2 Pcs", "category": "Ground fountains & pots", "salePrice": 3500.0, "discount": 700.0, "price": 2800.0, "stock": 5, "image": "/manus-storage/flower-pots_7d2f67af.webp", "accent": "from-rose-300/30 to-red-500/10", "unit": "unit"},
  {"id": "7-skep", "name": "7 Skep", "category": "Rockets & aerials", "salePrice": 1250.0, "discount": 250.0, "price": 1000.0, "stock": 5, "image": "/manus-storage/rockets_4fd47605.webp", "accent": "from-sky-300/30 to-indigo-500/10", "unit": "unit"},
  {"id": "wizz-color", "name": "Wizz Color", "category": "Rockets & aerials", "salePrice": 1750.0, "discount": 350.0, "price": 1400.0, "stock": 4, "image": "/manus-storage/rockets_4fd47605.webp", "accent": "from-sky-300/30 to-indigo-500/10", "unit": "unit"},
  {"id": "12-shot", "name": "12 Shot", "category": "Rockets & aerials", "salePrice": 450.0, "discount": 90.0, "price": 360.0, "stock": 10, "image": "/manus-storage/rockets_4fd47605.webp", "accent": "from-sky-300/30 to-indigo-500/10", "unit": "unit"},
  {"id": "50-wizz", "name": "50 Wizz", "category": "Rockets & aerials", "salePrice": 3750.0, "discount": 750.0, "price": 3000.0, "stock": 3, "image": "/manus-storage/rockets_4fd47605.webp", "accent": "from-sky-300/30 to-indigo-500/10", "unit": "unit"},
  {"id": "15-multi-color", "name": "15 Multi Color", "category": "Rockets & aerials", "salePrice": 700.0, "discount": 140.0, "price": 560.0, "stock": 5, "image": "/manus-storage/rockets_4fd47605.webp", "accent": "from-sky-300/30 to-indigo-500/10", "unit": "unit"},
  {"id": "120-shot", "name": "120 Shot", "category": "Rockets & aerials", "salePrice": 4000.0, "discount": 800.0, "price": 3200.0, "stock": 3, "image": "/manus-storage/rockets_4fd47605.webp", "accent": "from-sky-300/30 to-indigo-500/10", "unit": "unit"},
  {"id": "5k-full-count", "name": "5k full count", "category": "Assorted packs", "salePrice": 2415.0, "discount": 483.0, "price": 1932.0, "stock": 3, "image": "/manus-storage/assorted_89240ca4.webp", "accent": "from-yellow-200/35 to-lime-500/10", "unit": "unit"},
  {"id": "2k-full-count", "name": "2k full count", "category": "Assorted packs", "salePrice": 975.02, "discount": 195.0, "price": 780.02, "stock": 5, "image": "/manus-storage/assorted_89240ca4.webp", "accent": "from-yellow-200/35 to-lime-500/10", "unit": "unit"},
  {"id": "10k-full-count", "name": "10k full count", "category": "Assorted packs", "salePrice": 4830.0, "discount": 966.0, "price": 3864.0, "stock": 3, "image": "/manus-storage/assorted_89240ca4.webp", "accent": "from-yellow-200/35 to-lime-500/10", "unit": "unit"},
  {"id": "aj-colour-sparklers-ultra-deluxe", "name": "AJ Colour Sparklers Ultra Deluxe", "category": "Sparklers & pencils", "salePrice": 465.0, "discount": 93.0, "price": 372.0, "stock": 20, "image": "/manus-storage/sparklers_005b9582.webp", "accent": "from-violet-300/30 to-fuchsia-500/10", "unit": "unit"},
  {"id": "un-50-cm-eletric", "name": "UN 50 cm eletric", "category": "Crackers & bombs", "salePrice": 287.5, "discount": 57.5, "price": 230.0, "stock": 50, "image": "/manus-storage/crackers_f652aa1c.webp", "accent": "from-emerald-300/25 to-teal-500/10", "unit": "unit"},
  {"id": "888-hand-shots", "name": "888 HAND SHOTS", "category": "Rockets & aerials", "salePrice": 4800.0, "discount": 960.0, "price": 3840.0, "stock": 3, "image": "/manus-storage/rockets_4fd47605.webp", "accent": "from-sky-300/30 to-indigo-500/10", "unit": "unit"},
  {"id": "150-hand-shots", "name": "150 HAND SHOTS", "category": "Rockets & aerials", "salePrice": 1750.0, "discount": 350.0, "price": 1400.0, "stock": 7, "image": "/manus-storage/rockets_4fd47605.webp", "accent": "from-sky-300/30 to-indigo-500/10", "unit": "unit"},
  {"id": "40-hand-shots", "name": "40 HAND SHOTS", "category": "Rockets & aerials", "salePrice": 1075.0, "discount": 215.0, "price": 860.0, "stock": 10, "image": "/manus-storage/rockets_4fd47605.webp", "accent": "from-sky-300/30 to-indigo-500/10", "unit": "unit"},
  {"id": "ka-fp-ashoka-uv", "name": "KA FP ASHOKA UV", "category": "Ground fountains & pots", "salePrice": 200.0, "discount": 40.0, "price": 160.0, "stock": 20, "image": "/manus-storage/flower-pots_7d2f67af.webp", "accent": "from-rose-300/30 to-red-500/10", "unit": "unit"},
  {"id": "sar-fp-color-koti-dlx", "name": "SAR FP COLOR KOTI DLX", "category": "Ground fountains & pots", "salePrice": 575.0, "discount": 115.0, "price": 460.0, "stock": 15, "image": "/manus-storage/flower-pots_7d2f67af.webp", "accent": "from-rose-300/30 to-red-500/10", "unit": "unit"},
  {"id": "mur-15-cm-sada", "name": "MUR 15 CM SADA", "category": "Crackers & bombs", "salePrice": 60.0, "discount": 12.0, "price": 48.0, "stock": 100, "image": "/manus-storage/crackers_f652aa1c.webp", "accent": "from-emerald-300/25 to-teal-500/10", "unit": "unit"},
  {"id": "nl-30cm-colour", "name": "NL 30CM COLOUR", "category": "Rockets & aerials", "salePrice": 66.25, "discount": 13.25, "price": 53.0, "stock": 100, "image": "/manus-storage/rockets_4fd47605.webp", "accent": "from-sky-300/30 to-indigo-500/10", "unit": "unit"},
  {"id": "wow-fp-valcano-pots", "name": "WOW FP VALCANO POTS", "category": "Ground fountains & pots", "salePrice": 1087.5, "discount": 217.5, "price": 870.0, "stock": 10, "image": "/manus-storage/flower-pots_7d2f67af.webp", "accent": "from-rose-300/30 to-red-500/10", "unit": "unit"},
  {"id": "sar-mega-dlx-100", "name": "SAR MEGA DLX 100", "category": "Crackers & bombs", "salePrice": 687.5, "discount": 137.5, "price": 550.0, "stock": 15, "image": "/manus-storage/crackers_f652aa1c.webp", "accent": "from-emerald-300/25 to-teal-500/10", "unit": "unit"},
  {"id": "skv-7-shot-5pec", "name": "SKV 7 shot 5pec", "category": "Rockets & aerials", "salePrice": 187.5, "discount": 37.5, "price": 150.0, "stock": 15, "image": "/manus-storage/rockets_4fd47605.webp", "accent": "from-sky-300/30 to-indigo-500/10", "unit": "unit"},
  {"id": "svl-water-falls-5-pec", "name": "SVL WATER FALLS 5 PEC", "category": "Ground fountains & pots", "salePrice": 325.0, "discount": 65.0, "price": 260.0, "stock": 10, "image": "/manus-storage/flower-pots_7d2f67af.webp", "accent": "from-rose-300/30 to-red-500/10", "unit": "unit"},
  {"id": "dazzle-bada-peacock", "name": "DAZZLE BADA PEACOCK", "category": "Rockets & aerials", "salePrice": 687.5, "discount": 137.5, "price": 550.0, "stock": 10, "image": "/manus-storage/rockets_4fd47605.webp", "accent": "from-sky-300/30 to-indigo-500/10", "unit": "unit"},
  {"id": "os-18cm-pencil", "name": "OS 18CM PENCIL", "category": "Sparklers & pencils", "salePrice": 162.5, "discount": 32.5, "price": 130.0, "stock": 20, "image": "/manus-storage/sparklers_005b9582.webp", "accent": "from-violet-300/30 to-fuchsia-500/10", "unit": "unit"},
  {"id": "nucler-bomb", "name": "NUCLER BOMB", "category": "Crackers & bombs", "salePrice": 500.0, "discount": 100.0, "price": 400.0, "stock": 5, "image": "/manus-storage/crackers_f652aa1c.webp", "accent": "from-emerald-300/25 to-teal-500/10", "unit": "unit"},
  {"id": "4-inc-s-twinkling-mega-star", "name": "4 INC S twinkling mega star", "category": "Crackers & bombs", "salePrice": 112.5, "discount": 22.5, "price": 90.0, "stock": 30, "image": "/manus-storage/crackers_f652aa1c.webp", "accent": "from-emerald-300/25 to-teal-500/10", "unit": "unit"},
  {"id": "yes-bro-10k-wala-full-count", "name": "Yes Bro 10K Wala Full count", "category": "Assorted packs", "salePrice": 6750.0, "discount": 1350.0, "price": 5400.0, "stock": 2, "image": "/manus-storage/assorted_89240ca4.webp", "accent": "from-yellow-200/35 to-lime-500/10", "unit": "unit"},
  {"id": "pencils", "name": "Pencils", "category": "Sparklers & pencils", "salePrice": 250.0, "discount": 50.0, "price": 200.0, "stock": 30, "image": "/manus-storage/sparklers_005b9582.webp", "accent": "from-violet-300/30 to-fuchsia-500/10", "unit": "unit"},
  {"id": "ajanta-sky-chakkar", "name": "ajanta sky chakkar", "category": "Spinners & wheels", "salePrice": 875.0, "discount": 175.0, "price": 700.0, "stock": 5, "image": "/manus-storage/wheels_d9d25d63.webp", "accent": "from-amber-300/35 to-orange-500/10", "unit": "unit"},
  {"id": "zameen-chakkae-45cm", "name": "zameen chakkae 45cm", "category": "Spinners & wheels", "salePrice": 500.0, "discount": 100.0, "price": 400.0, "stock": 5, "image": "/manus-storage/wheels_d9d25d63.webp", "accent": "from-amber-300/35 to-orange-500/10", "unit": "unit"},
];

const attachedCategoryImages: Record<string, string> = {
  "Spinners & wheels": "/manus-storage/galaxy-wire-chakkrs_6d83249a.jpg",
  "Crackers & bombs": "/manus-storage/hellboy-bomb_693d9db7.jpg",
  "Rockets & aerials": "/manus-storage/whistle-rocket-champions_f9e4e51f.jpg",
  "Ground fountains & pots": "/manus-storage/volcano-pots_8f3dc6b9.jpg",
  "Assorted packs": "/manus-storage/colourful-music_48eeb929.jpg",
  "Sparklers & pencils": "/manus-storage/deluxe-sparkling-tube_9195be85.jpg",
};

const attachedProductImages: Record<string, string> = {
  "wire-chackar": "/manus-storage/galaxy-wire-chakkrs_6d83249a.jpg",
  "madura-malli": "/manus-storage/jallikattu_32e929db.jpg",
  "sky-army": "/manus-storage/army-force_16b8db4e.jpg",
  "kutralam": "/manus-storage/volcano-pots_8f3dc6b9.jpg",
  "agni-bomb": "/manus-storage/mini-bomb_2f6dd765.jpg",
  "color-kotti-dlx": "/manus-storage/colour-koti-deluxe_29859e8a.jpg",
  "mega-color-kotti": "/manus-storage/colour-koti-gold_7ce42a0d.jpg",
  "helicopter": "/manus-storage/vanathy-2-sound-rocket_a477cb3a.jpg",
  "240-shot": "/manus-storage/888-12-tubes_b1b8324c.jpg",
  "kz-rocket": "/manus-storage/whistle-rocket-champions_f9e4e51f.jpg",
  "2-sound-rocket": "/manus-storage/vanathy-2-sound-rocket_a477cb3a.jpg",
  "jalli-kettu": "/manus-storage/jallikattu_32e929db.jpg",
  "888-hand-shots": "/manus-storage/888-12-tubes_b1b8324c.jpg",
  "40-hand-shots": "/manus-storage/40-gatling_5169c6fc.jpg",
  "wow-fp-valcano-pots": "/manus-storage/volcano-pots_8f3dc6b9.jpg",
  "sar-fp-color-koti-dlx": "/manus-storage/colour-koti-deluxe_29859e8a.jpg",
  "ka-fp-ashoka-uv": "/manus-storage/ashoka-parrot_186416a5.png",
  "6-fancy-2-pcs": "/manus-storage/ashoka-queen_d38d55ed.png",
  "nl-30cm-colour": "/manus-storage/colour-koti-parrot_71156f81.jpg",
  "svl-water-falls-5-pec": "/manus-storage/shower-to-blast_68503266.jpg",
  "water-queen": "/manus-storage/water-queen_37aa7aca.png",
  "dazzle-bada-peacock": "/manus-storage/badi-peacock_c809f4f4.jpg",
  "os-18cm-pencil": "/manus-storage/glitring-sparklers_11652160.png",
  "aj-colour-sparklers-ultra-deluxe": "/manus-storage/colour-sparklers_a1277f0c.png",
  "10x10-mix": "/manus-storage/grand-slam_a1b449ac.png",
  "3-sound": "/manus-storage/mere-awaz_28991368.png",
  "rocket-bomb": "/manus-storage/red-thunders_47795c4c.png",
  "5-fancy-2-pcs": "/manus-storage/super-deluxe_930092fb.png",
  "2k-full-count": "/manus-storage/vanjar-2k_5d3f3e06.png",
  "5k-full-count": "/manus-storage/vanjar-5k_f4938515.png",
  "yes-bro-10k-wala-full-count": "/manus-storage/yes-bro_94e079f2.png",
  "wizz-color": "/manus-storage/zooper-dooper_95b00006.png",
  "nucler-bomb": "/manus-storage/nuclear-bomb_12ccf947.jpg",
  "4-inc-s-twinkling-mega-star": "/manus-storage/twinkling-mega-star_62d2a024.jpg",
  "pencils": "/manus-storage/deluxe-sparkling-tube_9195be85.jpg",
  "50-wizz": "/manus-storage/whizzling-50_76d2a219.jpg",
};

const defaultCustomer: CustomerDetails = {
  name: "",
  phone: "",
  area: "",
  notes: "",
};

function formatItems(selectedItems: Array<Product & { quantity: number }>) {
  return selectedItems
    .map((item) => `• ${item.name} — quantity ${item.quantity}`)
    .join("\n");
}

export default function Home() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [customer, setCustomer] = useState<CustomerDetails>(defaultCustomer);
  const [consent, setConsent] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All items");
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");
  const [copied, setCopied] = useState(false);
  const [itemsMenuOpen, setItemsMenuOpen] = useState(false);

  const selectedItems = useMemo(
    () =>
      products
        .filter((product) => quantities[product.id] > 0)
        .map((product) => ({ ...product, quantity: quantities[product.id] })),
    [quantities],
  );

  const itemCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = selectedItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const hasPrices = selectedItems.length > 0 && selectedItems.every((item) => item.price > 0);
  const categories = ["All items", ...Array.from(new Set(products.map((product) => product.category)))];
  const filteredProducts = activeCategory === "All items" ? products : products.filter((product) => product.category === activeCategory);
  const visibleProducts = showAll || activeCategory !== "All items" ? filteredProducts : filteredProducts.slice(0, 8);

  const updateQuantity = (productId: string, delta: number) => {
    setQuantities((current) => {
      const product = products.find((item) => item.id === productId);
      const next = Math.min(product?.stock ?? Number.MAX_SAFE_INTEGER, Math.max(0, (current[productId] ?? 0) + delta));
      const updated = { ...current };
      if (next === 0) delete updated[productId];
      else updated[productId] = next;
      return updated;
    });
    setSubmitted(false);
  };

  const resetOrder = () => {
    setQuantities({});
    setCustomer(defaultCustomer);
    setConsent(false);
    setFormError("");
    setSubmitted(false);
    setCopied(false);
  };

  const summary = useMemo(() => {
    const ref = reference || "Pending enquiry";
    return [
      "RAJYALAKSHMI FIREWORKS — ORDER ENQUIRY",
      `Reference: ${ref}`,
      "",
      "Requested items:",
      selectedItems.length ? formatItems(selectedItems) : "No items selected",
      "",
      `Customer: ${customer.name || "Not provided"}`,
      `Phone: ${customer.phone || "Not provided"}`,
      `Area: ${customer.area || "Not provided"}`,
      `Notes: ${customer.notes || "None"}`,
      "",
      "This is an enquiry only. Availability, lawful sale/collection, final price and fulfilment are subject to manual confirmation.",
    ].join("\n");
  }, [customer, reference, selectedItems]);

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const openWhatsAppOrder = () => {
    if (selectedItems.length === 0) {
      setFormError("Add at least one item to your enquiry before opening WhatsApp.");
      document.getElementById("catalogue")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (!customer.name.trim() || !customer.phone.trim()) {
      setFormError("Please add your name and phone number before opening WhatsApp.");
      document.getElementById("details")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (!consent) {
      setFormError("Please confirm that this is an enquiry before opening WhatsApp.");
      return;
    }
    const referenceForMessage = reference || `RL-${Date.now().toString(36).slice(-6).toUpperCase()}`;
    if (!reference) setReference(referenceForMessage);
    const lines = selectedItems.map(
      (item) => `• ${item.name} — ${item.quantity} ${item.unit} × ₹${item.price.toLocaleString("en-IN")} (listed ₹${item.salePrice.toLocaleString("en-IN")}, discount ₹${item.discount.toLocaleString("en-IN")})`,
    );
    const totalLine = hasPrices ? `Total: ₹${totalAmount.toLocaleString("en-IN")}` : "Total: To be confirmed manually";
    const message = [
      "Hello Rajyalakshmi Fireworks,",
      "",
      `I would like to submit an enquiry. Reference: ${referenceForMessage}`,
      `Name: ${customer.name}`,
      `Phone: ${customer.phone}`,
      `Area: ${customer.area || "Not provided"}`,
      "",
      "Selected items:",
      ...lines,
      totalLine,
      customer.notes ? `Notes: ${customer.notes}` : "",
      "",
      "Please confirm availability, applicable rules, final pricing and fulfilment. This is an enquiry only; no payment has been made.",
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/919182286897?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedItems.length === 0) {
      setFormError("Add at least one item to your enquiry.");
      document.getElementById("catalogue")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (!customer.name.trim() || !customer.phone.trim()) {
      setFormError("Please add your name and phone number so we can confirm the enquiry.");
      document.getElementById("details")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (!consent) {
      setFormError("Please confirm that you understand this is an enquiry, not an instant order.");
      return;
    }

    const nextReference = `RL-${Date.now().toString(36).slice(-6).toUpperCase()}`;
    setReference(nextReference);
    setSubmitted(true);
    setFormError("");
    window.localStorage.setItem(
      "rajyalakshmi-last-enquiry",
      JSON.stringify({ reference: nextReference, customer, selectedItems }),
    );
    window.setTimeout(() => document.getElementById("confirmation")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
      <div data-theme="midnight" className="min-h-screen overflow-x-hidden bg-[#120c0d] text-[#fff8e9] selection:bg-[#f4bd5c] selection:text-[#241113] theme-midnight">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-40 [background-image:radial-gradient(circle_at_10%_10%,rgba(244,189,92,.16),transparent_22%),radial-gradient(circle_at_90%_30%,rgba(177,36,52,.18),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(244,189,92,.08),transparent_32%)]" />

      <header className="relative z-20 border-b border-white/10 bg-[#07111f]/90 backdrop-blur-xl md:bg-[#120c0d]/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:py-3.5 lg:px-8 lg:py-4">
          <a href="#top" className="group flex items-center gap-3" aria-label="Rajyalakshmi Fireworks home">
            <img src="/manus-storage/rajyalakshmi-logo_db38e81f.png" alt="Rajyalakshmi Fireworks" className="h-9 w-auto max-w-[185px] rounded-md bg-[#fff8e9] px-2 py-1 object-contain transition duration-200 group-hover:scale-[1.02] sm:h-10" />
          </a>
          <div className="flex items-center gap-2">
            <a href="#details" className="hidden rounded-full bg-[#f4bd5c] px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#2a1413] shadow-[0_6px_18px_rgba(244,189,92,.12)] transition hover:bg-[#ffd77d] sm:inline-flex">Enquire</a>
            <a href="tel:+919182286897" aria-label="Call Rajyalakshmi Fireworks" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[#f4bd5c] transition hover:border-[#f4bd5c]/60 hover:bg-white/10 sm:h-10 sm:w-auto sm:gap-2 sm:px-3"><Phone size={15} /><span className="hidden text-[10px] font-extrabold uppercase tracking-[0.14em] sm:inline">Call</span></a>
          </div>
        </div>
      </header>

      <main id="top" className="relative z-10">
        <section className="relative isolate overflow-hidden border-b border-white/10 bg-cover bg-center" style={{ backgroundImage: "url('/manus-storage/diwali-hero-reference-inspired_22a40d08.jpg')" }}>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#07111f]/90 via-[#07111f]/65 to-[#07111f]/10" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-t from-[#07111f]/45 to-transparent sm:h-20" />
          <div className="absolute -right-28 top-12 -z-10 h-72 w-72 rounded-full border border-[#f4bd5c]/20 shadow-[0_0_100px_rgba(244,189,92,.14)] sm:h-96 sm:w-96" />
          <div className="absolute -right-12 top-24 -z-10 h-48 w-48 rounded-full border border-[#f4bd5c]/10 sm:h-64 sm:w-64" />
          <div className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-5 sm:pb-11 sm:pt-14 lg:px-8 lg:pb-16 lg:pt-16">
            <div className="max-w-2xl">
              <div className="mb-5 flex items-center gap-3 text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#f4bd5c] sm:mb-6 sm:text-[10px] sm:tracking-[0.28em]">
                <span className="h-px w-10 bg-[#f4bd5c]" /> Diwali 2026 enquiries open
              </div>
              <h1 className="font-display text-[3.35rem] leading-[.86] tracking-[-.055em] text-[#fff8e9] sm:text-[clamp(3.4rem,10vw,7.8rem)]">
                Make it a
                <span className="block italic text-[#f4bd5c]">bright</span>
                Diwali.
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-6 text-[#dbc8b2] sm:mt-8 sm:text-lg sm:leading-7">
                Browse our festive selection and send a simple enquiry. We will manually confirm availability, lawful fulfilment and final pricing before anything is accepted.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 sm:mt-7">
                <a href="#catalogue" className="group inline-flex items-center gap-3 rounded-full bg-[#f4bd5c] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.15em] text-[#2a1413] shadow-[0_10px_30px_rgba(244,189,92,.18)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#ffd77d] active:scale-[.97]">
                  Start an enquiry <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-[11px] text-[#c5b09d] sm:mt-10 sm:gap-x-7 sm:text-xs">
                <span className="inline-flex items-center gap-2"><MapPin size={14} className="text-[#f4bd5c]" /> Madhapur, Hyderabad</span>
                <span className="inline-flex items-center gap-2"><Clock3 size={14} className="text-[#f4bd5c]" /> Manual confirmation</span>
              </div>
            </div>

          </div>
        </section>

        <section id="catalogue" className="border-y border-white/10 bg-[#f6eddf] text-[#2a1716]">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:gap-10 sm:px-5 sm:py-14 lg:grid-cols-[1fr_360px] lg:px-8 lg:py-20">
            <div>
              <div className="flex flex-wrap items-end justify-between gap-5">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#aa4b32]">The enquiry shelf</p>
                  <h2 className="mt-2 font-display text-[2.75rem] leading-[.9] tracking-[-.04em] text-[#311a18] sm:text-6xl">Choose your<br /><span className="italic text-[#b12434]">celebration mix.</span></h2>
                </div>
              </div>
              <div className="relative -mx-4 mt-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] touch-pan-x sm:mx-0 sm:mt-7 sm:px-0">
                {categories.map((category) => (
                  <button type="button" key={category} aria-pressed={activeCategory === category} onClick={() => { setActiveCategory(category); setShowAll(category !== "All items"); }} className={`snap-start shrink-0 rounded-full border px-3 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.12em] transition active:scale-[.98] ${activeCategory === category ? "border-[#b12434] bg-[#b12434] text-white" : "border-[#3e241f]/15 bg-white/60 text-[#8f5a4a] hover:border-[#b12434]/40 hover:text-[#b12434]"}`}>
                    {category}
                  </button>
                ))}
              </div>
              <div className="mt-5 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                {visibleProducts.map((product, index) => {
                  const quantity = quantities[product.id] ?? 0;
                  return (
                    <article key={product.id} className={`group relative overflow-hidden rounded-2xl border border-[#3e241f]/10 bg-gradient-to-br ${product.accent} bg-[#fffaf2] p-4 shadow-[0_8px_24px_rgba(72,32,22,.05)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(72,32,22,.1)] sm:p-4`}>
                      <div className="flex min-w-0 items-start justify-between gap-3">
                        <span className="truncate text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#9a5442]">{String(index + 1).padStart(2, "0")} · {product.note || product.category}</span>
                        <Sparkles size={16} className="text-[#c48232]" />
                      </div>
                      <div className="mt-3 aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#f2d9c5] sm:mt-3">
                        <img src={attachedProductImages[product.id] ?? attachedCategoryImages[product.category] ?? product.image} alt={`${product.name} fireworks product`} className="attached-product-image h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.02]" loading="lazy" />
                      </div>
                      <h3 className="mt-3 min-h-6 min-w-0 truncate font-display text-xl leading-none text-[#311a18] sm:mt-5 sm:text-2xl">{product.name}</h3>
                      <p className="mt-1 min-w-0 min-h-8 text-[11px] leading-4 text-[#745b50] sm:mt-2 sm:min-h-10 sm:text-xs sm:leading-5">{product.description || `${product.category} festive selection.`}</p>
                      <div className="mt-3 flex min-w-0 flex-col items-stretch gap-2 border-t border-[#3e241f]/10 pt-2 sm:mt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:pt-3">
                        <span className="min-w-0 truncate text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#9a5442]"><span className="mr-1 text-[#9d7568] line-through">₹{product.salePrice.toLocaleString("en-IN")}</span> ₹{product.price.toLocaleString("en-IN")} / {product.unit}</span>
                        {quantity === 0 ? (
                          <button type="button" onClick={() => updateQuantity(product.id, 1)} className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-1 rounded-full bg-[#2d1717] px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#fff4d6] shadow-[0_6px_14px_rgba(45,23,23,.18)] transition hover:bg-[#b12434] active:scale-[.97] sm:min-h-10 sm:w-auto sm:px-4 sm:text-[11px] sm:tracking-[0.14em] sm:lg:min-w-28">
                            Add to cart <Plus size={14} />
                          </button>
                        ) : (
                          <div className="flex items-center gap-2 rounded-full bg-[#2d1717] p-1 text-[#fff4d6]">
                            <button type="button" aria-label={`Remove one ${product.name}`} onClick={() => updateQuantity(product.id, -1)} className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/15 active:scale-[.92]"><Minus size={13} /></button>
                            <span className="min-w-5 text-center text-xs font-bold">{quantity}</span>
                            <button type="button" aria-label={`Add one ${product.name}`} onClick={() => updateQuantity(product.id, 1)} className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/15 active:scale-[.92]"><Plus size={13} /></button>
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
              <button type="button" onClick={() => setShowAll((current) => !current)} className="mt-6 inline-flex min-h-10 items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#a64b35] transition hover:text-[#b12434]">
                {showAll ? "Show fewer categories" : "View all categories"} <ChevronDown size={14} className={showAll ? "rotate-180" : ""} />
              </button>
            </div>

            <aside id="cart" className="h-fit scroll-mt-5 rounded-[1.5rem] border border-[#3e241f]/10 bg-[#fffaf2] p-5 shadow-[0_16px_45px_rgba(72,32,22,.08)] sm:p-6 lg:sticky lg:top-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#a64b35]">Your enquiry cart</p>
                  <h2 className="mt-2 font-display text-3xl text-[#311a18]">A bright start.</h2>
                </div>
                <span className="flex h-9 min-w-9 items-center justify-center rounded-full bg-[#b12434] px-2 text-xs font-bold text-white">{itemCount}</span>
              </div>
              <div className="mt-7 min-h-28 border-y border-[#3e241f]/10 py-4">
                {selectedItems.length === 0 ? (
                  <div className="flex h-20 items-center justify-center text-center text-sm leading-5 text-[#967b6c]">Your selected categories<br />will appear here.</div>
                ) : (
                  <ul className="space-y-3">
                    {selectedItems.map((item) => (
                      <li key={item.id} className="flex items-center justify-between gap-3 text-sm text-[#4c312b]">
                        <span className="min-w-0 truncate">{item.name}</span>
                        <span className="flex items-center gap-2 text-xs font-bold text-[#a64b35]">
                          × {item.quantity}
                          <button type="button" aria-label={`Remove ${item.name}`} onClick={() => updateQuantity(item.id, -1)} className="flex h-8 w-8 items-center justify-center rounded-full text-[#b89b8a] transition hover:bg-[#b12434]/10 hover:text-[#b12434]"><X size={14} /></button>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex items-center justify-between py-4">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#85695a]">Estimated total</span>
                <span className="font-display text-2xl text-[#311a18]">{hasPrices ? `₹${totalAmount.toLocaleString("en-IN")}` : "On confirmation"}</span>
              </div>
              <a href="#details" className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#b12434] px-4 py-3 text-xs font-extrabold uppercase tracking-[0.15em] text-white transition hover:bg-[#8e1c2b] active:scale-[.98]">Continue to details <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></a>
              {itemCount > 0 && <button type="button" onClick={resetOrder} className="mt-3 flex min-h-10 w-full items-center justify-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#a38574] transition hover:text-[#b12434]"><RotateCcw size={12} /> Clear selection</button>}
            </aside>
          </div>
        </section>

        <section id="details" className="mx-auto max-w-7xl scroll-mt-5 px-4 py-10 pb-24 sm:px-5 sm:py-14 sm:pb-28 lg:px-8 lg:py-20 lg:pb-20">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#e8a94d]">Almost there</p>
              <h2 className="mt-3 font-display text-5xl leading-[.92] tracking-[-.04em] sm:text-6xl">Tell us where<br /><span className="italic text-[#f4bd5c]">to reach you.</span></h2>
              <p className="mt-6 max-w-sm text-sm leading-6 text-[#c9b7a2]">We will use these details only to respond to this enquiry. Payment is not collected on this page.</p>
              <div className="mt-8 space-y-4 border-l border-[#f4bd5c]/30 pl-5 text-sm text-[#c9b7a2]">
                <p className="flex items-start gap-3"><ShieldCheck size={17} className="mt-0.5 shrink-0 text-[#f4bd5c]" /> Enquiry first; nothing is confirmed automatically.</p>
                <p className="flex items-start gap-3"><MapPin size={17} className="mt-0.5 shrink-0 text-[#f4bd5c]" /> Collection / fulfilment is discussed after availability checks.</p>
                <p className="flex items-start gap-3"><Info size={17} className="mt-0.5 shrink-0 text-[#f4bd5c]" /> Please follow all package instructions and local rules.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="rounded-[1.5rem] border border-white/10 bg-white/[.045] p-4 shadow-[0_20px_70px_rgba(0,0,0,.18)] backdrop-blur-sm sm:p-7">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-xs font-bold text-[#eadcc8]">Your name <span className="text-[#f4bd5c]">*</span>
                  <input required value={customer.name} onChange={(event) => setCustomer({ ...customer, name: event.target.value })} className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#876f64] focus:border-[#f4bd5c]/70 focus:ring-2 focus:ring-[#f4bd5c]/15" placeholder="e.g. Ananya Rao" />
                </label>
                <label className="block text-xs font-bold text-[#eadcc8]">Phone number <span className="text-[#f4bd5c]">*</span>
                  <input required type="tel" value={customer.phone} onChange={(event) => setCustomer({ ...customer, phone: event.target.value })} className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#876f64] focus:border-[#f4bd5c]/70 focus:ring-2 focus:ring-[#f4bd5c]/15" placeholder="10-digit number" />
                </label>
                <label className="block text-xs font-bold text-[#eadcc8]">Area / locality
                  <input value={customer.area} onChange={(event) => setCustomer({ ...customer, area: event.target.value })} className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#876f64] focus:border-[#f4bd5c]/70 focus:ring-2 focus:ring-[#f4bd5c]/15" placeholder="e.g. Madhapur" />
                </label>
              </div>
              <label className="mt-5 block text-xs font-bold text-[#eadcc8]">Anything we should know?
                <textarea value={customer.notes} onChange={(event) => setCustomer({ ...customer, notes: event.target.value })} rows={4} className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#876f64] focus:border-[#f4bd5c]/70 focus:ring-2 focus:ring-[#f4bd5c]/15" placeholder="Timing, preferred mix, or a question for us" />
              </label>
              <label className="mt-5 flex cursor-pointer items-start gap-3 text-xs leading-5 text-[#c9b7a2]">
                <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#f4bd5c]" />
                <span>I understand this is an enquiry only. Rajyalakshmi Fireworks must manually confirm availability, lawful sale/collection, final pricing and fulfilment before any order is accepted.</span>
              </label>
              {formError && <p role="alert" className="mt-4 rounded-xl border border-[#f08a73]/30 bg-[#b12434]/15 px-4 py-3 text-sm text-[#ffb8a7]">{formError}</p>}
              <button type="submit" className="group mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-[#f4bd5c] px-5 py-4 text-xs font-extrabold uppercase tracking-[0.17em] text-[#2a1413] shadow-[0_12px_30px_rgba(244,189,92,.15)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#ffd77d] active:scale-[.98]">Prepare my enquiry <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></button>
              <p className="mt-3 text-center text-[10px] leading-4 text-[#866c61]">No payment is requested or collected on this page.</p>
            </form>
          </div>
        </section>

        {submitted && (
          <section id="confirmation" className="border-t border-[#f4bd5c]/20 bg-[#35171b]">
            <div className="mx-auto max-w-3xl px-5 py-12 text-center lg:px-8 lg:py-16">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f4bd5c] text-[#2a1413] shadow-[0_0_40px_rgba(244,189,92,.22)]"><Check size={25} strokeWidth={2.5} /></span>
              <p className="mt-6 text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#f4bd5c]">Enquiry prepared</p>
              <h2 className="mt-3 font-display text-5xl text-[#fff4d3]">Your festive list is ready.</h2>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#d9c1ae]">Reference <strong className="text-[#f4bd5c]">{reference}</strong>. Copy the summary below and share it with our team through your preferred contact channel for manual confirmation.</p>
              <div className="mx-auto mt-7 max-w-xl rounded-2xl border border-white/10 bg-black/20 p-5 text-left">
                <pre className="whitespace-pre-wrap font-sans text-xs leading-5 text-[#e9d9c7]">{summary}</pre>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button type="button" onClick={openWhatsAppOrder} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.14em] text-[#072c17] transition hover:bg-[#55e98a] active:scale-[.97] sm:w-auto"><Phone size={14} /> Send to WhatsApp</button>
                <button type="button" onClick={copySummary} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#f4bd5c] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.14em] text-[#2a1413] transition hover:bg-[#ffd77d] active:scale-[.97] sm:w-auto"><Clipboard size={14} /> {copied ? "Copied" : "Copy enquiry"}</button>
                <a href="tel:+919182286897" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-xs font-extrabold uppercase tracking-[0.14em] text-[#fff4d3] transition hover:border-[#f4bd5c]/50 hover:text-[#f4bd5c] sm:w-auto"><Phone size={14} /> Call +91 91822 86897</a>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-[#0d0809]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-center text-xs text-[#8e7669] sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:text-left lg:px-8">
          <div><span className="font-display text-xl text-[#f2dfc2]">Rajyalakshmi Fireworks</span><span className="ml-3">Madhapur · Hyderabad</span></div>
          <p>Celebrate responsibly. Follow package instructions and local rules.</p>
        </div>
      </footer>

      <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] z-30 flex flex-row-reverse items-center gap-2 sm:bottom-[calc(1.25rem+env(safe-area-inset-bottom))] sm:right-[calc(1.25rem+env(safe-area-inset-right))] sm:flex-col sm:gap-3">
        <button type="button" onClick={() => document.getElementById("cart")?.scrollIntoView({ behavior: "smooth" })} aria-label="Open cart" className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#55d6ff]/45 bg-[#102c46] text-[#55d6ff] shadow-[0_12px_30px_rgba(0,0,0,.35)] transition hover:-translate-y-0.5 hover:bg-[#173d5b] active:scale-[.96] sm:h-12 sm:w-12"><ShoppingBag size={18} className="sm:h-[21px] sm:w-[21px]" />{itemCount > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff6b6b] px-1 text-[10px] font-bold text-white">{itemCount}</span>}</button>
        <button type="button" onClick={() => setItemsMenuOpen(true)} aria-label="Open menu" className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#55d6ff]/55 bg-[#0d2f4b] text-[#55d6ff] shadow-[0_14px_35px_rgba(0,0,0,.4)] transition hover:-translate-y-0.5 hover:bg-[#174563] active:scale-[.96] sm:h-14 sm:w-14"><Menu size={21} className="sm:h-[25px] sm:w-[25px]" /></button>
      </div>

      <div>
        {itemsMenuOpen && (
          <div className="fixed inset-0 z-40">
            <button type="button" aria-label="Close menu" onClick={() => setItemsMenuOpen(false)} className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />
            <aside className="absolute inset-y-0 left-0 flex w-[min(86vw,360px)] max-w-[360px] flex-col overflow-hidden border-r border-[#55d6ff]/20 bg-[#071c38] px-5 pb-[calc(1.75rem+env(safe-area-inset-bottom))] pt-[calc(1.5rem+env(safe-area-inset-top))] text-[#fff4d6] shadow-[18px_0_55px_rgba(0,0,0,.42)]">
              <div className="flex items-start justify-between">
                <img src="/manus-storage/rajyalakshmi-logo_db38e81f.png" alt="Rajyalakshmi Fireworks" className="h-12 w-auto max-w-[200px] rounded-md bg-[#fff8e9] px-2 py-1 object-contain" />
                <button type="button" onClick={() => setItemsMenuOpen(false)} aria-label="Close items menu" className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"><X size={22} /></button>
              </div>
              <nav className="mt-10 space-y-3">
                <button type="button" onClick={() => { setActiveCategory("All items"); setShowAll(false); setItemsMenuOpen(false); document.getElementById("catalogue")?.scrollIntoView({ behavior: "smooth" }); }} className="group flex w-full items-center justify-between rounded-lg border-l-4 border-[#ff6b6b] bg-[#273152] px-4 py-4 text-left text-base font-bold text-[#fff4d6] transition hover:bg-[#344069]"><span className="flex items-center gap-3"><Sparkles size={20} className="text-[#ff6b6b]" />Browse items</span><ArrowRight size={19} className="text-[#ff6b6b] transition-transform group-hover:translate-x-1" /></button>
                <a href="#cart" onClick={() => setItemsMenuOpen(false)} className="group flex items-center justify-between rounded-lg border-l-4 border-[#2da8ff] px-4 py-4 text-base font-bold text-[#fff4d6] transition hover:bg-white/[.06]"><span className="flex items-center gap-3"><ShoppingBag size={20} className="text-[#2da8ff]" />Your cart{itemCount > 0 && <span className="rounded-full bg-[#ff6b6b] px-2 py-0.5 text-xs text-white">{itemCount}</span>}</span><ArrowRight size={19} className="text-[#2da8ff] transition-transform group-hover:translate-x-1" /></a>
                <a href="#details" onClick={() => setItemsMenuOpen(false)} className="group flex items-center justify-between rounded-lg border-l-4 border-[#2da8ff] px-4 py-4 text-base font-bold text-[#fff4d6] transition hover:bg-white/[.06]"><span className="flex items-center gap-3"><Clipboard size={20} className="text-[#2da8ff]" />Your details</span><ArrowRight size={19} className="text-[#2da8ff] transition-transform group-hover:translate-x-1" /></a>
                <a href="tel:+919182286897" onClick={() => setItemsMenuOpen(false)} className="group flex items-center justify-between rounded-lg border-l-4 border-[#2da8ff] px-4 py-4 text-base font-bold text-[#fff4d6] transition hover:bg-white/[.06]"><span className="flex items-center gap-3"><Phone size={20} className="text-[#2da8ff]" />Call us</span><ArrowRight size={19} className="text-[#2da8ff] transition-transform group-hover:translate-x-1" /></a>
              </nav>
              <div className="mt-auto -mx-5 -mb-7 h-40 bg-[radial-gradient(ellipse_at_bottom_left,rgba(45,168,255,.45),transparent_58%),radial-gradient(ellipse_at_bottom_right,rgba(255,107,107,.35),transparent_52%)]" />
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
