// ============================================================
// 🎁 GIFTS & CARDS — EDIT THIS FILE TO ADD/CHANGE GIFTS 🎁
//
// To ADD a gift: copy one of the blocks below (from { to },)
// and paste it into the list, then change the values.
// To REMOVE a gift: delete its whole block.
//
// Each gift can have:
//   title  → the name shown on the card
//   note   → a little message under the title (optional)
//   url    → a link (Amazon gift link, e-card link, etc.) (optional)
//   code   → a gift-card / redeem code she can copy   (optional)
//
// You can use url, code, or BOTH on the same gift.
// ============================================================

// The gifts lock 🔐 — she either types the password, or earns it
// the hard way: 100 points in Flappy Mariah lol.
// Drop her face for the flappy bird in public/photos/flappy-mariah.jpg
export const giftsLock = {
  title: 'Ah ah ah...',
  message: 'not so fast, you have to say the password for the giftssss',
  hint: "Hint: it's on your bouquet of flowers 💐",
  // she can type it with any capitalization/spaces
  password: 'ILoveCalebNwasikeAndHeIsMyDaddy',
  flappy: {
    photo: '/photos/flappy-mariah.jpg',
    target: 100, // points needed to unlock the gifts the hard way
  },
};

export const gifts = [
  {
    title: 'A little something 💝',
    note: 'Replace me! Put your Amazon gift link here.',
    url: 'https://www.amazon.com/',
    code: null,
  },
  {
    title: 'Gift card 🌹',
    note: 'Replace me! Put a real gift-card code here — she can tap to copy it.',
    url: null,
    code: 'XXXX-XXXX-XXXX',
  },
  {
    title: 'Date night on me 🍽️',
    note: 'Example of a gift with both a link and a code. Delete or edit me.',
    url: 'https://www.opentable.com/',
    code: 'LOVE-2024',
  },
];
