# 🎰 Gacha Machine

A browser-based Gacha machine game — no backend required! Pull the lever to win Pokemon-like creature cards with different rarities.

## Features

- 🎮 Animated gacha pull with flying ball
- ✨ 4 rarity tiers: Common, Rare, Ultra-Rare, Legendary
- 🏆 Persistent collection saved to `localStorage`
- 💾 View and manage your collection
- 📁 Fully static — host anywhere

## Rarities & Drop Rates

| Rarity | Weight | Approx. Chance |
|--------|--------|----------------|
| Common | 8 | ~53% |
| Rare | 4 | ~27% |
| Ultra-Rare | 2 | ~13% |
| Legendary | 1 | ~7% |

## Customizing Items

Edit **`items.js`** to add, remove, or change items. Each item needs:

```js
{
  id: "unique-id",           // unique string identifier
  name: "Display Name",
  description: "Short flavour text shown on the card.",
  rarity: "common",          // "common" | "rare" | "ultra-rare" | "legendary"
  image: "https://..."       // URL or relative path to image
}
```

## Hosting on GitHub Pages

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to **Deploy from a branch → main / root**
4. Your site will be live at `https://<username>.github.io/<repo-name>/`

## Local Development

Just open `index.html` in your browser — no build step needed.
