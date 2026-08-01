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
  hint: "Hint: There's a magical star in the far north east, it does not move and is waiting for the princess.",
  // she can type it with any capitalization/spaces
  password: 'ILoveCalebNwasikeAndHeIsMyDaddy',
  flappy: {
    photo: '/photos/flappy-mariah.jpg',
    target: 100, // points needed to unlock the gifts the hard way
  },
};

export const gifts = [
  {
    title: 'Michel Jackson Impersonator concert in Atlanta!',
    note: 'I found tickets and have them ready, say the word and I buy.',
    url: 'https://www.youtube.com/shorts/yIEF-7PgRNM',
    code: null,
  },
  {
    title: 'Amazon Gift Card🌹',
    note: 'OOOO you should get some waist beads!',
    url: 'https://www.amazon.com/g/AQZPAZ936EJZAD?t=SvL',
    code: 'Love Yah!',
  },
  {
    title: 'Ropeplay date where I dress as your butler and take you to eat in Downtown Atlanta',
    note: '(You wont have to touch a single thing...how it should be tho lol)',
    url: 'https://atlanta.eater.com/maps/essential-korean-restaurants-atlanta',
  },
];
