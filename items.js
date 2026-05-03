// =============================================
//   GACHA MACHINE — ITEM INVENTORY
//   Edit this file to customize your items!
// =============================================

// RARITY LEVELS (each is half as likely as the previous):
//   common      — base weight 8
//   rare        — base weight 4
//   ultra-rare  — base weight 2
//   legendary   — base weight 1

const ITEMS = [
  // ── COMMON ──────────────────────────────────
  {
    id: "flamouse",
    name: "Flamouse",
    description: "A tiny fire mouse that sleeps inside volcano rocks. Its cheeks glow orange when happy.",
    rarity: "common",
    image: "https://api.dicebear.com/9.x/bottts/svg?seed=flamouse&backgroundColor=ff6b35&eyes=eva&mouth=smile01"
  },
  {
    id: "bubblefrog",
    name: "Bubblefrog",
    description: "This cheerful water frog blows soap-like bubbles from its throat pouch. Safe to cuddle.",
    rarity: "common",
    image: "https://api.dicebear.com/9.x/bottts/svg?seed=bubblefrog&backgroundColor=4fc3f7&eyes=eva&mouth=smile02"
  },
  {
    id: "leafwig",
    name: "Leafwig",
    description: "A small grass-type critter whose leaf wings let it glide between treetops effortlessly.",
    rarity: "common",
    image: "https://api.dicebear.com/9.x/bottts/svg?seed=leafwig&backgroundColor=81c784&eyes=roundFrame01&mouth=smile01"
  },

  // ── RARE ────────────────────────────────────
  {
    id: "voltkit",
    name: "Voltkit",
    description: "An electric fox cub. Its fluffy tail stores enough charge to power a small lamp for a day.",
    rarity: "rare",
    image: "https://api.dicebear.com/9.x/bottts/svg?seed=voltkit&backgroundColor=ffd54f&eyes=eva&mouth=smile02"
  },
  {
    id: "frostpup",
    name: "Frostpup",
    description: "An ice-type dog that leaves tiny snowflake footprints wherever it trots. Loves winter storms.",
    rarity: "rare",
    image: "https://api.dicebear.com/9.x/bottts/svg?seed=frostpup&backgroundColor=b2ebf2&eyes=roundFrame01&mouth=smile01"
  },
  {
    id: "stoneback",
    name: "Stoneback",
    description: "A rock turtle whose shell grows crystals over time. Ancient ones are rumored to be solid gem.",
    rarity: "rare",
    image: "https://api.dicebear.com/9.x/bottts/svg?seed=stoneback&backgroundColor=a1887f&eyes=eva&mouth=smile01"
  },

  // ── ULTRA-RARE ──────────────────────────────
  {
    id: "phantail",
    name: "Phantail",
    description: "A ghost-type spirit with a long luminous tail. It only appears during lunar eclipses… usually.",
    rarity: "ultra-rare",
    image: "https://api.dicebear.com/9.x/bottts/svg?seed=phantail&backgroundColor=9575cd&eyes=roundFrame02&mouth=smile02"
  },
  {
    id: "stormwing",
    name: "Stormwing",
    description: "A wind dragon hatchling. Its tiny wingbeats are already strong enough to scatter fallen leaves.",
    rarity: "ultra-rare",
    image: "https://api.dicebear.com/9.x/bottts/svg?seed=stormwing&backgroundColor=4dd0e1&eyes=eva&mouth=smile01"
  },

  // ── LEGENDARY ───────────────────────────────
  {
    id: "luminos",
    name: "Luminos",
    description: "An ancient celestial lion forged from starlight. Said to grant one wish to those pure of heart.",
    rarity: "legendary",
    image: "https://api.dicebear.com/9.x/bottts/svg?seed=luminos&backgroundColor=ffb300&eyes=roundFrame02&mouth=smile02"
  },
  {
    id: "voidrex",
    name: "Voidrex",
    description: "A mythical dark serpent that predates recorded history. Its scales absorb all light around it.",
    rarity: "legendary",
    image: "https://api.dicebear.com/9.x/bottts/svg?seed=voidrex&backgroundColor=212121&eyes=eva&mouth=smile01"
  }
];

// ── RARITY CONFIG ────────────────────────────
// Controls display colours and pull weights.
// Adjust weights here to change drop rates.
const RARITY_CONFIG = {
  "common": {
    label: "Common",
    weight: 20,
    color: "#9ca3af",         // grey
    glow: "rgba(156,163,175,0.6)",
    border: "#6b7280",
    gradient: "linear-gradient(135deg, #374151, #1f2937)"
  },
  "rare": {
    label: "Rare",
    weight: 6,
    color: "#60a5fa",         // blue
    glow: "rgba(96,165,250,0.7)",
    border: "#3b82f6",
    gradient: "linear-gradient(135deg, #1d4ed8, #1e3a8a)"
  },
  "ultra-rare": {
    label: "Ultra Rare",
    weight: 3,
    color: "#c084fc",         // purple
    glow: "rgba(192,132,252,0.8)",
    border: "#a855f7",
    gradient: "linear-gradient(135deg, #7c3aed, #4c1d95)"
  },
  "legendary": {
    label: "✨ LEGENDARY ✨",
    weight: 1,
    color: "#fbbf24",         // gold
    glow: "rgba(251,191,36,0.9)",
    border: "#f59e0b",
    gradient: "linear-gradient(135deg, #b45309, #78350f)"
  }
};
