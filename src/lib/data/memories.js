// ============================================================
// 💗 OUR MEMORIES — EDIT THIS FILE TO ADD YOUR PICTURES 💗
//
// HOW TO ADD A PICTURE:
//   1. Drop your image file into the  public/photos/  folder
//      (e.g. public/photos/memory-1.jpg)
//   2. Make sure the "photo" value below matches the file name,
//      starting with /photos/
//
// Until you add a real image, each picture box shows a cute
// "add your photo here" placeholder — nothing will look broken.
// ============================================================

export const memories = [
  {
    id: 'rose-1',
    name: 'Where it all began',
    photo: '/photos/memory-1.jpg',
    quote:
      'The strongest relationships are not always the ones that show no struggles, but the ones that grow through them.',
    author: null,
    // position of this rose-planet in the universe (percent of screen)
    x: 18,
    y: 30,
    size: 150,
  },
  {
    id: 'rose-2',
    name: 'Us, always',
    photo: '/photos/memory-2.jpg',
    quote:
      'A true relationship is two unperfect people refusing to give up on each other.',
    author: null,
    x: 44,
    y: 62,
    size: 130,
  },
  {
    id: 'rose-3',
    name: 'My strength',
    photo: '/photos/memory-3.jpg',
    quote:
      'Being deeply loved by someone gives you strength while loving someone deeply gives you courage.',
    author: 'Lao-Tzu',
    x: 68,
    y: 26,
    size: 165,
  },
  {
    id: 'rose-4',
    name: 'All of me',
    photo: '/photos/memory-4.jpg',
    quote: 'All of me loves all of you.',
    author: 'John Legend',
    x: 30,
    y: 78,
    size: 120,
  },
  {
    id: 'rose-5',
    name: 'My smart girl',
    photo: '/photos/memory-5.jpg',
    quote: 'this is my beautiful woman just being as smart as ever',
    author: null,
    x: 8,
    y: 58,
    size: 115,
  },
  {
    id: 'rose-6',
    name: 'I really do',
    photo: '/photos/memory-6.jpg',
    quote: 'I really do love you alot 🥺 ...',
    author: null,
    x: 57,
    y: 44,
    size: 125,
  },
  {
    id: 'rose-7',
    name: 'Just look at her',
    photo: '/photos/memory-7.jpg',
    quote: 'look at this beautiful girl',
    author: null,
    x: 88,
    y: 36,
    size: 120,
  },
];

// The far-off planet with the special message for Mariah.
// When she clicks it, the universe zooms in and shows this text.
export const specialPlanet = {
  id: 'special',
  name: 'For Mariah 💖',
  x: 87,
  y: 74,
  size: 72,
  message:
    'Mariah, you are my entire world and my eternal happiness. My affection for you reaches beyond the furthest galaxy. Our bond is timeless, shining with the perfection of the stars. Just as the cosmos slowly developed its breathtaking splendor through countless cosmic events, our relationship becomes more stunning as we grow together. You are my universe, and I promise to be the person who deserves your love forever.',
};

// The wordle rose 🙈 — a quick 4-letter wordle (max 4 tries).
// When she solves it, the photo + caption below are revealed.
export const wordleRose = {
  id: 'wordle',
  name: 'a weird lil secret 🙈',
  x: 62,
  y: 82,
  size: 105,
  prompt: "ew he's a weirdo, he likes mariah's ****",
  answer: 'FEET',
  maxTries: 4,
  photo: '/photos/feet.jpg',
  caption:
    "don't ask lol... I just love ALL of you. Head to toe. Literally. 😂💗",
};

// The Greek-goddess planet 🏛️ — "The Architecture of You".
// Locked behind your song: she fills in the blanks (She! No! She! No!)
// EDIT the "features" list below to talk about everything you love —
// add, remove, or rewrite any of them.
export const goddessPlanet = {
  id: 'goddess',
  name: 'The Architecture of You 🏛️',
  x: 75,
  y: 56,
  size: 110,
  lock: {
    question: "Who's that beautiful girl? ***! Could she be any cuter? **",
    // she can type it with any spacing/punctuation: "She! No! She! No!"
    answers: ['shenosheno', 'sheno'],
    hint: 'sing our song 🎶 — fill in the blanks, in order',
  },
  intro:
    'Like the finest architecture the heavens ever drew up, God took His time with you. Every line, every detail, on purpose. Here is everything my eyes adore:',
  features: [
    {
      title: 'Your eyes',
      text: 'The first place I ever got lost and never wanted to be found. They catch every light in the room and somehow still outshine it.',
    },
    {
      title: 'Your smile',
      text: 'My favorite curve in the whole universe. It undoes every bad day I have ever had.',
    },
    {
      title: 'Your hair',
      text: 'The way it frames your face should honestly be studied by artists.',
    },
    {
      title: 'Your hands',
      text: 'The ones I want to hold through every season of this life. They fit mine like they were measured for them.',
    },
    {
      title: 'Your laugh',
      text: 'The whole reason sound was invented. I would trade every song ever written to keep hearing it.',
    },
    {
      title: 'All of you, head to toe',
      text: 'A masterpiece front to back. The blueprint was divine and the build is flawless.',
    },
  ],
};

// The Totoro planet 🌱 — a green rose with a slideshow of
// My Neighbor Totoro pictures. Drop images into public/photos/totoro/
// and list them here (add or remove lines freely).
// 🔊 Music for this planet comes later — see TotoroSlideshow.svelte.
export const totoroPlanet = {
  id: 'totoro',
  name: 'Our Neighbor Totoro 🌱',
  x: 33,
  y: 44,
  size: 110,
  images: [
    '/photos/totoro/totoro-1.jpg',
    '/photos/totoro/totoro-2.jpg',
    '/photos/totoro/totoro-3.jpg',
    '/photos/totoro/totoro-4.jpg',
    '/photos/totoro/totoro-5.jpg',
  ],
  // colors for the green rose
  colors: {
    light: '#eaf3e2',
    mid: '#c7d3bf',
    deep: '#a9c29b',
    heartEdge: '#8fae85',
    leaf: '#d8aa96',
    swirl: '#6f8a68',
  },
};

// The second special star — locked behind your "serious word" 🍍
// It has a photo too: drop the image in public/photos/ and match
// the "photo" value below.
export const specialPlanet2 = {
  id: 'special-2',
  name: 'Our serious word ✨',
  x: 12,
  y: 16,
  size: 68,
  photo: '/photos/special.jpg',
  lock: {
    question: "What's our serious word?",
    // she can type it in any capitalization
    answer: 'pineapple',
    hint: 'you know the one... 🍍',
  },
  message:
    "This is to our small piece of our journey, that will only get better and more beautiful with time. I'm in awe that I've found a woman like you. You deserve everything I have to offer, down to my entire being. You are bright and kind, and one in a million. The way we are weird together is something that I've always deeply cherished. I love how odd we are in our jokes and everyday memories we create. I want to be let back into your heart. I want you to call me yours again. I miss our soul tie, and I want to rebuild our foundation of our love. I would climb mountains and go through rivers for you, and i've only loved you more and more as the days have passed. You are my everything and my reason for why I have joy in my life.",
};
