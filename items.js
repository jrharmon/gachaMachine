// =============================================
//   GACHA MACHINE — ITEM INVENTORY
//   Edit this file to customize your items!
// =============================================

// RARITY LEVELS (each is half as likely as the previous):
//   common      — base weight 20
//   rare        — base weight 6
//   ultra-rare  — base weight 3
//   legendary   — base weight 1

const ITEMS = [
  // ── COMMON ──────────────────────────────────
  {
    id: "flamouse",
    name: "Flamouse",
    type: "Mountain",
    description: "A tiny fire mouse that sleeps inside volcano rocks. Its cheeks glow orange when happy.",
    rarity: "common",
    image: "https://api.dicebear.com/9.x/bottts/svg?seed=flamouse&backgroundColor=ff6b35&eyes=eva&mouth=smile01"
  },
  {
    id: "bubblefrog",
    name: "Bubblefrog",
    type: "Plant",
    description: "This cheerful water frog blows soap-like bubbles from its throat pouch. Safe to cuddle.",
    rarity: "common",
    image: "https://api.dicebear.com/9.x/bottts/svg?seed=bubblefrog&backgroundColor=4fc3f7&eyes=eva&mouth=smile02"
  },
  {
    id: "leafwig",
    name: "Leafwig",
    type: "Plant",
    description: "A small grass-type critter whose leaf wings let it glide between treetops effortlessly.",
    rarity: "common",
    image: "https://api.dicebear.com/9.x/bottts/svg?seed=leafwig&backgroundColor=81c784&eyes=roundFrame01&mouth=smile01"
  },

  // ── RARE ────────────────────────────────────
  {
    id: "voltkit",
    name: "Voltkit",
    type: "Gear",
    description: "An electric fox cub. Its fluffy tail stores enough charge to power a small lamp for a day.",
    rarity: "rare",
    image: "https://api.dicebear.com/9.x/bottts/svg?seed=voltkit&backgroundColor=ffd54f&eyes=eva&mouth=smile02"
  },
  {
    id: "frostpup",
    name: "Frostpup",
    type: "Mountain",
    description: "An ice-type dog that leaves tiny snowflake footprints wherever it trots. Loves winter storms.",
    rarity: "rare",
    image: "https://api.dicebear.com/9.x/bottts/svg?seed=frostpup&backgroundColor=b2ebf2&eyes=roundFrame01&mouth=smile01"
  },
  {
    id: "stoneback",
    name: "Stoneback",
    type: "Gear",
    description: "A rock turtle whose shell grows crystals over time. Ancient ones are rumored to be solid gem.",
    rarity: "rare",
    image: "https://api.dicebear.com/9.x/bottts/svg?seed=stoneback&backgroundColor=a1887f&eyes=eva&mouth=smile01"
  },

  // ── ULTRA-RARE ──────────────────────────────
  {
    id: "phantail",
    name: "Phantail",
    type: "Poison",
    description: "A ghost-type spirit with a long luminous tail. It only appears during lunar eclipses… usually.",
    rarity: "ultra-rare",
    image: "https://api.dicebear.com/9.x/bottts/svg?seed=phantail&backgroundColor=9575cd&eyes=roundFrame02&mouth=smile02"
  },
  {
    id: "stormwing",
    name: "Stormwing",
    type: "Mountain",
    description: "A wind dragon hatchling. Its tiny wingbeats are already strong enough to scatter fallen leaves.",
    rarity: "ultra-rare",
    image: "https://api.dicebear.com/9.x/bottts/svg?seed=stormwing&backgroundColor=4dd0e1&eyes=eva&mouth=smile01"
  },

  // ── LEGENDARY ───────────────────────────────
  {
    id: "luminos",
    name: "Luminos",
    type: "Plant",
    description: "An ancient celestial lion forged from starlight. Said to grant one wish to those pure of heart.",
    rarity: "legendary",
    image: "https://api.dicebear.com/9.x/bottts/svg?seed=luminos&backgroundColor=ffb300&eyes=roundFrame02&mouth=smile02"
  },
  {
    id: "voidrex",
    name: "Voidrex",
    type: "Poison",
    description: "A mythical dark serpent that predates recorded history. Its scales absorb all light around it.",
    rarity: "legendary",
    image: "https://api.dicebear.com/9.x/bottts/svg?seed=voidrex&backgroundColor=212121&eyes=eva&mouth=smile01"
  }
];

// ── RARITY CONFIG ────────────────────────────
// Controls display colours and pull weights.
const RARITY_CONFIG = {
  "common": {
    label: "Common",
    weight: 20,
    color: "#9ca3af",
    glow: "rgba(156,163,175,0.6)",
    border: "#6b7280",
    gradient: "linear-gradient(135deg, #374151, #1f2937)"
  },
  "rare": {
    label: "Rare",
    weight: 6,
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.7)",
    border: "#0ea5e9",
    gradient: "linear-gradient(135deg, #0369a1, #0c4a6e)"
  },
  "ultra-rare": {
    label: "Ultra Rare",
    weight: 3,
    color: "#fb923c",
    glow: "rgba(251,146,60,0.8)",
    border: "#f97316",
    gradient: "linear-gradient(135deg, #c2410c, #7c2d12)"
  },
  "legendary": {
    label: "✨ LEGENDARY ✨",
    weight: 1,
    color: "#fbbf24",
    glow: "rgba(251,191,36,0.9)",
    border: "#f59e0b",
    gradient: "linear-gradient(135deg, #b45309, #78350f)"
  }
};

// ── TYPE CONFIG ──────────────────────────────
// Controls display colours and icons for creature types.
const TYPE_CONFIG = {
  "Plant": {
    label: "Plant",
    color: "#16a34a",
    bg: "#dcfce7",
    border: "#86efac",
    icon: `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M10 11 C9 8 5 6 2 2 C8 1 12 6 10 11Z"/><path fill="currentColor" d="M10 11 C11 8 15 6 18 2 C12 1 8 6 10 11Z"/><rect fill="currentColor" x="9" y="10" width="2" height="8" rx="1"/></svg>`
  },
  "Poison": {
    label: "Poison",
    color: "#7c3aed",
    bg: "#ede9fe",
    border: "#c4b5fd",
    icon: `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M10 1C10 1 3 10 3 14c0 3.3 3.1 6 7 6s7-2.7 7-6c0-4-7-13-7-13z"/><line x1="7" y1="12" x2="13" y2="18" stroke="white" stroke-width="1.8" stroke-linecap="round"/><line x1="13" y1="12" x2="7" y2="18" stroke="white" stroke-width="1.8" stroke-linecap="round"/></svg>`
  },
  "Mountain": {
    label: "Mountain",
    color: "#57534e",
    bg: "#f5f5f4",
    border: "#d6d3d1",
    icon: `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="currentColor" opacity=".5" points="13,4 20,18 6,18"/><polygon fill="currentColor" points="7,7 15,18 -1,18"/><polygon fill="white" opacity=".8" points="7,7 9.5,11.5 4.5,11.5"/></svg>`
  },
  "Gear": {
    label: "Gear",
    color: "#b45309",
    bg: "#fef3c7",
    border: "#fcd34d",
    icon: `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon fill="currentColor" points="10,1 11.2,4.1 13.5,1.7 13.3,5 16.4,3.6 15,6.7 18.3,6.5 15.9,8.8 19,10 15.9,11.2 18.3,13.5 15,13.3 16.4,16.4 13.3,15 13.5,18.3 11.2,15.9 10,19 8.8,15.9 6.5,18.3 6.7,15 3.6,16.4 5,13.3 1.7,13.5 4.1,11.2 1,10 4.1,8.8 1.7,6.5 5,6.7 3.6,3.6 6.7,5 6.5,1.7 8.8,4.1"/><circle cx="10" cy="10" r="4" fill="white"/></svg>`
  }
};
