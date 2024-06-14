import Fuse from 'fuse.js';
import controversialData from '/src/filters/controversial.json';
import profanityData from '/src/filters/profanity.json';
import sexualData from '/src/filters/sexual.json';

<<<<<<< HEAD
// Define the selectedFilter array
let selectedFilter = [];

// Initialize the filter arrays 
=======
const SELECTORS = {
  TWITTER: {
    SPAN: "div[class='css-901oao r-1nao33i r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-bnwqim r-qvutc0']",
    POST: "div[class*='css-1dbjc4n r-1igl3o0 r-qklmqi r-1adg3ll r-1ny4l3l']",
    COMMENT: "div[class*='css-901oao r-1nao33i r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-bnwqim r-qvutc0'] span[class*='css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0']",
    TRENDING: "div[class*='css-1dbjc4n r-1adg3ll r-1ny4l3l']",
    TRENDING_TEXT: "div[class='css-901oao r-1nao33i r-37j5jr r-a023e6 r-b88u0q r-rjixqe r-1bymd8e r-bcqeeo r-qvutc0']"
  },
  FACEBOOK: {
    TEXT: "div[class*='xdj266r x11i5rnm xat24cr x1mh8g0r x1vvkbs']",
    POST_CONTAINER: "div[class*='x1yztbdb x1n2onr6 xh8yej3 x1ja2u2z']",
    COMMENT_CONTAINER: "div[class*='x1n2onr6']"
  },
  INSTAGRAM: {
    ELEMENTS: "h1, span",
    CAPTION: "h1[class*='_aacl _aaco _aacu _aacx _aad7 _aade']",
    COMMENT: "span[class*='_aacl _aaco _aacu _aacx _aad7 _aade']",
    POPUP_COMMENT: "div[class*='x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh x12nagc x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s x1q0g3np x6s0dn4 x1oa3qoh x1nhvcw1']"
  },
  REDDIT: {
    POST_TEXT: "div[class='_2FCtq-QzlfuN-SwVMUZMM3 _3wiKjmhpIpoTE2r5KCm2o6 t3_13vurf1']",
    CAROUSEL: "div[class='_3GfG_jvS9X-90Q_8zU4uCu _3Y1KnhioRYkYGb93uAKhBZ']",
    TARGET_ELEMENTS: "h3[class*='eYtD2XCVieq6emjKBH3m'], p[class='_1qeIAgB0cPwnLhDF9XSiJM'], h2[class='_10WwrR6QeKoqfxT3UBj0Qq'], div[class='_2Jjv0TAohMSydVpAgyhjhA']",
    POST_THREAD: "shreddit-comment[class='pt-md px-md xs:px-0']",
    RIGHT_RAIL: "reddit-pdp-right-rail-post"
  },
  GENERAL: {
    TEXT_ELEMENTS: "p, h1, h2, h3, h4, h5, h6"
  }
};

const hideStyle = "display: none !important;";
const blurStyle = "color: transparent; text-shadow: 0 0 8px #000;";

let selectedFilter = [];
>>>>>>> 505a582 (Refactored js files)
let controversialFilter = [];
let profanityFilter = [];
let sexualFilter = [];
let customFilter = [];
let appliedFilters = [];

<<<<<<< HEAD
// Push filter values from controversialData to controversialFilter
if (controversialData && Array.isArray(controversialData.filter)) {
  controversialFilter.push(...controversialData.filter);
  console.log('Controversial Filter from JSON:', controversialFilter);
}

// Push filter values from profanityData to profanityFilter
if (profanityData && Array.isArray(profanityData.filter)) {
  profanityFilter.push(...profanityData.filter);
  console.log('Profanity Filter from JSON:', profanityFilter);
}

// Push filter values from sexualData to sexualFilter
if (sexualData && Array.isArray(sexualData.filter)) {
  sexualFilter.push(...sexualData.filter);
  console.log('Sexual Filter from JSON:', sexualFilter);
}

// Load selected filters from Chrome storage
chrome.storage.local.get('selectedFilter', data => {
  selectedFilter = data.selectedFilter || [];
  console.log('Selected Filter from chrome storage:', selectedFilter);
});

function removeLabelled() {
  const options = {
    includeScore: true,
    threshold: 0.1,
    distance: "levenshtein"
  };


  function twitterFilter() {
    const spanContent = new Set();
    const spanSelector = "div[class='css-901oao r-1nao33i r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-bnwqim r-qvutc0']";
    const postSelector = "div[class*='css-1dbjc4n r-1igl3o0 r-qklmqi r-1adg3ll r-1ny4l3l']";
    const commentSelector = "div[class*='css-901oao r-1nao33i r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-bnwqim r-qvutc0'] span[class*='css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0']";
    const trendingSelector = "div[class*='css-1dbjc4n r-1adg3ll r-1ny4l3l']";
    const hideStyle = "display: none !important;";

    // Collect unique text content from spans
    document.querySelectorAll(spanSelector).forEach(span => {
      const text = span.textContent.toLowerCase().split(' ');
      text.forEach(word => spanContent.add(word));
    });

    // Collect unique text from trending
    document.querySelectorAll("div[class='css-901oao r-1nao33i r-37j5jr r-a023e6 r-b88u0q r-rjixqe r-1bymd8e r-bcqeeo r-qvutc0']").forEach(trending => {
      const text = trending.textContent.toLowerCase().split(' ');
      text.forEach(word => spanContent.add(word));
    });
    
    const fuse = new Fuse(Array.from(spanContent), options);

    // Split the selectedFilter array into individual words (Fuse can only search single word strings)
    const splitselectedFilter = selectedFilter.flatMap(filter => filter.split(' '));

    // Remove posts
    for (const filter of splitselectedFilter) {
      const results = fuse.search(filter);
      for (const result of results) {
        document.querySelectorAll(postSelector).forEach(post => {
          const postText = post.querySelector(spanSelector)?.textContent.toLowerCase();
          if (postText && postText.includes(result.item)) {
            const postContainer = post.closest("div[class='css-1dbjc4n r-1igl3o0 r-qklmqi r-1adg3ll r-1ny4l3l']");
            if (postContainer && postContainer.style.display !== "none") {
              postContainer.style = hideStyle;
              console.log(`Removed post: ${postText}\n${result.item} (${result.score})`);
            }
          }
        });
      }
    }

    // Remove comments
    for (const filter of splitselectedFilter) {
      const results = fuse.search(filter);
      for (const result of results) {
        document.querySelectorAll(commentSelector).forEach(comment => {
          const commentText = comment.textContent.toLowerCase();
          if (commentText.includes(result.item)) {
            const commentContainer = comment.closest("div[class='css-1dbjc4n r-1igl3o0 r-qklmqi r-1adg3ll r-1ny4l3l']");
            if (commentContainer && commentContainer.style.display !== "none") {
              commentContainer.style = hideStyle;
              console.log(`Removed comment: ${commentText}\n${result.item} (${result.score})`);
            }
          }
        });
      }
    }  

    // Remove trending topics
    for (const filter of splitselectedFilter) {
      const results = fuse.search(filter);
      for (const result of results) {
        document.querySelectorAll("div[class='css-901oao r-1nao33i r-37j5jr r-a023e6 r-b88u0q r-rjixqe r-1bymd8e r-bcqeeo r-qvutc0']").forEach(trending => {
          const trendingText = trending.textContent.toLowerCase();
          if (trendingText.includes(result.item)) {
            const trendingContainer = trending.closest(trendingSelector);
            if (trendingContainer && trendingContainer.style.display !== "none") {
              trendingContainer.style = hideStyle;
              console.log(`Removed trending topic: ${trendingText}\n${result.item} (${result.score})`);
            }
          }
        });
      }
    }
  }
  
  function facebookFilter() {
    const fbTextContent = new Set();
    const targetTexts = document.querySelectorAll("div[class*='xdj266r x11i5rnm xat24cr x1mh8g0r x1vvkbs']");
    const commentText = document.querySelectorAll("div[class='xdj266r x11i5rnm xat24cr x1mh8g0r x1vvkbs']");
    const hideStyle = "display: none !important;";
  
    // Collect unique text content from target divs
    for (const div of targetTexts) {
      const text = div.textContent.toLowerCase().split(" ");
      text.forEach(word => fbTextContent.add(word));
    }
  
    const fuse = new Fuse(Array.from(fbTextContent), options);
  
    // Split the selectedFilter array into individual words (Fuse can only search single word strings)
    const splitselectedFilter = selectedFilter.flatMap(filter => filter.split(" "));
  
    // Remove posts
    for (const filter of splitselectedFilter) {
      const results = fuse.search(filter);
      for (const result of results) {
        for (const toRemove of targetTexts) {
          if (toRemove.textContent.toLowerCase().includes(result.item)) {
            const postContainer = toRemove.closest("div[class*='x1yztbdb x1n2onr6 xh8yej3 x1ja2u2z']");
            if (postContainer && postContainer.style.display !== "none") {
              postContainer.style = hideStyle;
              console.log(`Removed post: ${toRemove.textContent}\n${result.item} (${result.score})`);
            }
          }
        }
      }
    }
  
    // Remove comments
    for (const filter of splitselectedFilter) {
      const results = fuse.search(filter);
      for (const result of results) {
        for (const toRemoveComment of commentText) {
          if (toRemoveComment.textContent.toLowerCase().includes(result.item)) {
            const commentContainer = toRemoveComment.closest("div[class*='x1n2onr6']");
            if (commentContainer && commentContainer.style.display !== "none") {
              commentContainer.style = hideStyle;
              console.log(`Removed comment: ${toRemoveComment.textContent}\n${result.item} (${result.score})`);
            }
          }
        }
      }
    }
  
    // Remove popup comments
    for (const filter of splitselectedFilter) {
      const results = fuse.search(filter);
      for (const result of results) {
        for (const toRemoveComment of commentText) {
          const popupCommentContainer = toRemoveComment.closest("div[class='x1n2onr6 x4uap5 x18d9i69 x1swvt13 x1iorvi4 x78zum5 x1q0g3np x1a2a7pz']");
          if (popupCommentContainer && popupCommentContainer.style.display !== "none") {
            popupCommentContainer.style = hideStyle;
            console.log(`Removed pop-up comment: ${toRemoveComment.textContent}\n${result.item} (${result.score})`);
          }
        }
      }
    }
  }  

  function instagramFilter() {
    const igTextContent = new Set();
    const targetElements = document.querySelectorAll("h1, span");
    const captionContainer = document.querySelectorAll("h1[class*='_aacl _aaco _aacu _aacx _aad7 _aade']");
    const commentContainer = document.querySelectorAll("span[class*='_aacl _aaco _aacu _aacx _aad7 _aade']");
    const popupCommentContainer = document.querySelectorAll("div[class*='x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh x12nagc x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s x1q0g3np x6s0dn4 x1oa3qoh x1nhvcw1']");
    const hideStyle = "display: none !important;";
  
    // Collect unique text content from target elements
    for (const targetText of targetElements) {
      const text = targetText.textContent.toLowerCase().split(" ");
      text.forEach(word => igTextContent.add(word));
    }
  
    const fuse = new Fuse(Array.from(igTextContent), options);
  
    // Split the selectedFilter array into individual words (Fuse can only search single word strings)
    const splitselectedFilter = selectedFilter.flatMap(filter => filter.split(" "));
  
    // Remove posts
    for (const filter of splitselectedFilter) {
      const results = fuse.search(filter);
      for (const result of results) {
        for (const caption of captionContainer) {
          if (caption.textContent.toLowerCase().includes(result.item)) {
            const postContainer = caption.closest("article");
            if (postContainer && postContainer.style.display !== "none") {
              postContainer.style = hideStyle;
              console.log(`Removed post: ${caption.textContent}\n${result.item} (${result.score})`);
            }
          }
        }
      }
    }
  
    // Remove comments
    for (const filter of splitselectedFilter) {
      const results = fuse.search(filter);
      for (const result of results) {
        for (const comment of commentContainer) {
          if (comment.textContent.toLowerCase().includes(result.item)) {
            const commentContainer = comment.closest("ul[class*='_a9ym']");
            if (commentContainer && commentContainer.style.display !== "none") {
              commentContainer.style = hideStyle;
              console.log(`Removed comment: ${comment.textContent}\n${result.item} (${result.score})`);
            }
          }
        }
      }
    }
  
    // Remove popup comments
    for (const filter of splitselectedFilter) {
      const results = fuse.search(filter);
      for (const result of results) {
        for (const popupComment of popupCommentContainer) {
          if (popupComment.textContent.toLowerCase().includes(result.item)) {
            const popupCommentContainer = popupComment.closest("div[class*='x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh x12nagc x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s x1q0g3np x6s0dn4 x1oa3qoh x1nhvcw1']");
            if (popupCommentContainer && popupCommentContainer.style.display !== "none") {
              popupCommentContainer.style = hideStyle;
              console.log(`Removed popup comment: ${popupComment.textContent}\n${result.item} (${result.score})`);
            }
          }
        }
      }
    }
  }
  
  function redditFilter (){
    const redditTextContent = new Set();
    const postText = document.querySelectorAll("div[class='_2FCtq-QzlfuN-SwVMUZMM3 _3wiKjmhpIpoTE2r5KCm2o6 t3_13vurf1']");
    const carouselContainer = document.querySelectorAll("div[class='_3GfG_jvS9X-90Q_8zU4uCu _3Y1KnhioRYkYGb93uAKhBZ']");
    const targetElements = document.querySelectorAll("h3[class*='eYtD2XCVieq6emjKBH3m'], p[class='_1qeIAgB0cPwnLhDF9XSiJM'], h2[class='_10WwrR6QeKoqfxT3UBj0Qq'], div[class='_2Jjv0TAohMSydVpAgyhjhA']");
    const postThread = document.querySelectorAll("shreddit-comment[class='pt-md px-md xs:px-0']");
    const rightRail = document.querySelectorAll("reddit-pdp-right-rail-post");
    const hideStyle = "display: none !important;";

    // Collect unique text content from target elements
    for (const targetText of targetElements) {
      const text = targetText.textContent.toLowerCase().split(" ");
      text.forEach(word => redditTextContent.add(word));
    }

    // Collect unique text content from post main thread
    for (const targetText of postThread) {
      const text = targetText.textContent.toLowerCase().split(" ");
      text.forEach(word => redditTextContent.add(word));
    }

    // Collect unique text from reddit right rail
    for (const targetText of rightRail) {
      const text = targetText.textContent.toLowerCase().split(" ");
      text.forEach(word => redditTextContent.add(word));
    }

    const fuse = new Fuse(Array.from(redditTextContent), options);

    // Split the selectedFilter array into individual words (Fuse can only search single word strings)
    const splitselectedFilter = selectedFilter.flatMap(filter => filter.split(" "));

    // Remove posts
    for (const filter of splitselectedFilter) {
      const results = fuse.search(filter);
      for (const result of results) {
        for (const post of postText) {
          if (post.textContent.toLowerCase().includes(result.item)) {
            const postContainer = post.closest("div[class*='_1oQyIsiPHYt6nx7VOmd1sz _1RYN-7H8gYctjOQeL8p2Q7']");
            if (postContainer && postContainer.style.display !== "none") {
              postContainer.style = hideStyle;
              console.log(`Removed post: ${post.textContent}\n${result.item} (${result.score})`);
            }
          }
        }
      }
    }

    // Remove carousel
    for (const filter of splitselectedFilter) {
      const results = fuse.search(filter);
      for (const result of results) {
        for (const carousel of carouselContainer) {
          if (carousel.textContent.toLowerCase().includes(result.item)) {
            const carouselContainer = carousel.closest("div[class='_3GfG_jvS9X-90Q_8zU4uCu _3Y1KnhioRYkYGb93uAKhBZ']");
            if (carouselContainer && carouselContainer.style.display !== "none") {
              carouselContainer.style = hideStyle;
              console.log(`Removed carousel: ${carousel.textContent}\n${result.item} (${result.score})`);
            }
          }
        }
      }
    }

    // Remove threads
    for (const filter of splitselectedFilter) {
      const results = fuse.search(filter);
      for (const result of results) {
        for (const post of postThread) {
          if (post.textContent.toLowerCase().includes(result.item)) {
            const postContainer = post.closest("shreddit-comment[class='pt-md px-md xs:px-0']");
            if (postContainer && postContainer.style.display !== "none") {
              postContainer.style = hideStyle;
              console.log(`Removed thread: ${post.textContent}\n${result.item} (${result.score})`);
            }
          }
        }
      }
    }

    // Remove right rail
    for (const filter of splitselectedFilter) {
      const results = fuse.search(filter);
      for (const result of results) {
        for (const post of rightRail) {
          if (post.textContent.toLowerCase().includes(result.item)) {
            const postContainer = post.closest("li");
            if (postContainer && postContainer.style.display !== "none") {
              postContainer.style = hideStyle;
              console.log(`Removed right rail post: ${post.textContent}\n${result.item} (${result.score})`);
            }
          }
        }
      }
    }
  }

  function blurTextContent(){
    const htmlTextContent = new Set();
    const targetElements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6");
    const blurStyle = "color: transparent; text-shadow: 0 0 8px #000;";

    // Collect unique text content from target elements
    for (const targetText of targetElements) {
      const text = targetText.textContent.toLowerCase().split(" ");
      text.forEach(word => htmlTextContent.add(word));
    }

    const fuse = new Fuse(Array.from(htmlTextContent), options);

    // Split the selectedFilter array into individual words (Fuse can only search single word strings)
    const splitselectedFilter = selectedFilter.flatMap(filter => filter.split(' '));

    for (const filter of splitselectedFilter) {
      const results = fuse.search(filter);
      for (const result of results) {
        for (const toBlur of targetElements){
          if (toBlur.textContent.toLowerCase().includes(result.item)){
            if(toBlur && toBlur.style.color !== "transparent"){
              toBlur.setAttribute("style", blurStyle);
            }
          }
        }
      }
    }
  }

=======
function loadFilters() {
  if (controversialData && Array.isArray(controversialData.filter)) {
    controversialFilter.push(...controversialData.filter);
  }
  if (profanityData && Array.isArray(profanityData.filter)) {
    profanityFilter.push(...profanityData.filter);
  }
  if (sexualData && Array.isArray(sexualData.filter)) {
    sexualFilter.push(...sexualData.filter);
  }
}

function loadStoredFilters() {
  chrome.storage.local.get('selectedFilter', data => {
    selectedFilter = data.selectedFilter || [];
  });
  chrome.storage.local.get(['controversialFilter', 'profanityFilter', 'sexualFilter', 'customFilters'], data => {
    controversialFilter = data.controversialFilter || [];
    profanityFilter = data.profanityFilter || [];
    sexualFilter = data.sexualFilter || [];
    customFilter = data.customFilters || [];
  });
}

function saveFilters() {
  chrome.storage.local.set({
    controversialFilter,
    profanityFilter,
    sexualFilter,
    customFilters: customFilter
  });
}

function createFuseInstance(content) {
  return new Fuse(Array.from(content), {
    includeScore: true,
    threshold: 0.1,
    distance: "levenshtein"
  });
}

function filterContent(filterArray, content, fuseInstance, elementSelectors, containerSelector) {
  const splitselectedFilter = filterArray.flatMap(filter => filter.split(' '));

  for (const filter of splitselectedFilter) {
    const results = fuseInstance.search(filter);
    for (const result of results) {
      document.querySelectorAll(elementSelectors).forEach(element => {
        const textContent = element.textContent.toLowerCase();
        if (textContent.includes(result.item)) {
          const container = element.closest(containerSelector);
          if (container && container.style.display !== "none") {
            container.style = hideStyle;
          }
        }
      });
    }
  }
}

function twitterFilter() {
  const spanContent = new Set();
  document.querySelectorAll(SELECTORS.TWITTER.SPAN).forEach(span => {
    span.textContent.toLowerCase().split(' ').forEach(word => spanContent.add(word));
  });
  document.querySelectorAll(SELECTORS.TWITTER.TRENDING_TEXT).forEach(trending => {
    trending.textContent.toLowerCase().split(' ').forEach(word => spanContent.add(word));
  });

  const fuse = createFuseInstance(spanContent);
  filterContent(selectedFilter, spanContent, fuse, SELECTORS.TWITTER.POST, "div[class='css-1dbjc4n r-1igl3o0 r-qklmqi r-1adg3ll r-1ny4l3l']");
  filterContent(selectedFilter, spanContent, fuse, SELECTORS.TWITTER.COMMENT, "div[class='css-1dbjc4n r-1igl3o0 r-qklmqi r-1adg3ll r-1ny4l3l']");
  filterContent(selectedFilter, spanContent, fuse, SELECTORS.TWITTER.TRENDING_TEXT, SELECTORS.TWITTER.TRENDING);
}

function facebookFilter() {
  const fbTextContent = new Set();
  document.querySelectorAll(SELECTORS.FACEBOOK.TEXT).forEach(div => {
    div.textContent.toLowerCase().split(" ").forEach(word => fbTextContent.add(word));
  });

  const fuse = createFuseInstance(fbTextContent);
  filterContent(selectedFilter, fbTextContent, fuse, SELECTORS.FACEBOOK.TEXT, SELECTORS.FACEBOOK.POST_CONTAINER);
  filterContent(selectedFilter, fbTextContent, fuse, SELECTORS.FACEBOOK.TEXT, SELECTORS.FACEBOOK.COMMENT_CONTAINER);
}

function instagramFilter() {
  const igTextContent = new Set();
  document.querySelectorAll(SELECTORS.INSTAGRAM.ELEMENTS).forEach(element => {
    element.textContent.toLowerCase().split(" ").forEach(word => igTextContent.add(word));
  });

  const fuse = createFuseInstance(igTextContent);
  filterContent(selectedFilter, igTextContent, fuse, SELECTORS.INSTAGRAM.CAPTION, "article");
  filterContent(selectedFilter, igTextContent, fuse, SELECTORS.INSTAGRAM.COMMENT, "ul[class*='_a9ym']");
  filterContent(selectedFilter, igTextContent, fuse, SELECTORS.INSTAGRAM.POPUP_COMMENT, "div[class*='x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh x12nagc x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s x1q0g3np x6s0dn4 x1oa3qoh x1nhvcw1']");
}

function redditFilter() {
  const redditTextContent = new Set();
  document.querySelectorAll(SELECTORS.REDDIT.TARGET_ELEMENTS).forEach(targetText => {
    targetText.textContent.toLowerCase().split(" ").forEach(word => redditTextContent.add(word));
  });
  document.querySelectorAll(SELECTORS.REDDIT.POST_THREAD).forEach(targetText => {
    targetText.textContent.toLowerCase().split(" ").forEach(word => redditTextContent.add(word));
  });
  document.querySelectorAll(SELECTORS.REDDIT.RIGHT_RAIL).forEach(targetText => {
    targetText.textContent.toLowerCase().split(" ").forEach(word => redditTextContent.add(word));
  });

  const fuse = createFuseInstance(redditTextContent);
  filterContent(selectedFilter, redditTextContent, fuse, SELECTORS.REDDIT.POST_TEXT, "div[class*='_1oQyIsiPHYt6nx7VOmd1sz _1RYN-7H8gYctjOQeL8p2Q7']");
  filterContent(selectedFilter, redditTextContent, fuse, SELECTORS.REDDIT.CAROUSEL, "div[class='_3GfG_jvS9X-90Q_8zU4uCu _3Y1KnhioRYkYGb93uAKhBZ']");
  filterContent(selectedFilter, redditTextContent, fuse, SELECTORS.REDDIT.POST_THREAD, "shreddit-comment[class='pt-md px-md xs:px-0']");
  filterContent(selectedFilter, redditTextContent, fuse, SELECTORS.REDDIT.RIGHT_RAIL, "li");
}

function blurTextContent() {
  const htmlTextContent = new Set();
  document.querySelectorAll(SELECTORS.GENERAL.TEXT_ELEMENTS).forEach(targetText => {
    targetText.textContent.toLowerCase().split(" ").forEach(word => htmlTextContent.add(word));
  });

  const fuse = createFuseInstance(htmlTextContent);
  filterContent(selectedFilter, htmlTextContent, fuse, SELECTORS.GENERAL.TEXT_ELEMENTS, blurStyle);
}

function removeLabelled() {
>>>>>>> 505a582 (Refactored js files)
  if (window.location.hostname === 'twitter.com') {
    twitterFilter();
  } else if (window.location.hostname === 'www.facebook.com') {
    facebookFilter();
  } else if (window.location.hostname === 'www.instagram.com') {
    instagramFilter();
  } else if (window.location.hostname === 'www.reddit.com') {
    redditFilter();
  } else {
    blurTextContent();
  }
}

<<<<<<< HEAD
removeLabelled();

// Check if the filters are already in Chrome storage
chrome.storage.local.get(['controversialFilter', 'profanityFilter', 'sexualFilter', 'appliedFilters'], data => {
  controversialFilter = data.controversialFilter || [];
  profanityFilter = data.profanityFilter || [];
  sexualFilter = data.sexualFilter || [];
  appliedFilters = data.appliedFilters || [];
  console.log('Controversial Filter (from Chrome storage):', controversialFilter);
  console.log('Profanity Filter (from Chrome storage):', profanityFilter);
  console.log('Sexual Filter (from Chrome storage):', sexualFilter);
  console.log('Applied Filters (from Chrome storage):', appliedFilters);
});

// Save filters to Chrome storage
chrome.storage.local.set({
  controversialFilter: controversialFilter,
  profanityFilter: profanityFilter,
  sexualFilter: sexualFilter
}, () => {
  console.log('Controversial Filter (saved to Chrome storage):', controversialFilter);
  console.log('Profanity Filter (saved to Chrome storage):', profanityFilter);
  console.log('Sexual Filter (saved to Chrome storage):', sexualFilter);
});

// Load custom filters from Chrome storage
chrome.storage.local.get('customFilters', data => {
  customFilter = data.customFilters || [];
  console.log('Custom Filter (from Chrome storage):', customFilter);
});

// Create a MutationObserver to run removeLabelled whenever the DOM changes inside the target container
const observer = new MutationObserver(removeLabelled);
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

=======
loadFilters();
loadStoredFilters();

chrome.storage.local.set({ controversialFilter, profanityFilter, sexualFilter }, () => {
  console.log('Filters saved to Chrome storage');
});

chrome.storage.local.get('customFilters', data => {
  customFilter = data.customFilters || [];
});

const observer = new MutationObserver(removeLabelled);
observer.observe(document.body, { childList: true, subtree: true });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
>>>>>>> 505a582 (Refactored js files)
  if (request.appliedFilters && Array.isArray(request.appliedFilters)) {
    selectedFilter = [];

    if (request.appliedFilters.includes('controversial')) {
<<<<<<< HEAD
      // Add controversial filters to the selectedFilter array
=======
>>>>>>> 505a582 (Refactored js files)
      selectedFilter.push(...controversialFilter);
    }

    if (request.appliedFilters.includes('profanity')) {
<<<<<<< HEAD
      // Add profanity filters to the selectedFilter array
=======
>>>>>>> 505a582 (Refactored js files)
      selectedFilter.push(...profanityFilter);
    }

    if (request.appliedFilters.includes('sexual')) {
<<<<<<< HEAD
      // Add sexual filters to the selectedFilter array
=======
>>>>>>> 505a582 (Refactored js files)
      selectedFilter.push(...sexualFilter);
    }

    if (request.appliedFilters.includes('custom')) {
<<<<<<< HEAD
      // Add custom filters to the selectedFilter array
      selectedFilter.push(...customFilter);
    }

    // Save selected filters to Chrome storage
    chrome.storage.local.set({ selectedFilter: selectedFilter });

    console.log('Selected Filter (updated from popup):', selectedFilter);

    // Run removeLabelled to apply the updated filters immediately
    removeLabelled();
  }
  // Update the selectedFilter array if the 'custom' filter is applied
  if (request.type === 'addCustomFilter' && request.customWords && typeof request.customWords === 'string') {
    // Add custom words to the customFilter array
    const words = request.customWords.split(',').map(word => word.trim());
    customFilter.push(...words);

    // Save custom filters to Chrome storage
    chrome.storage.local.set({ customFilters: customFilter });

    console.log('Custom Filter (updated with new words):', customFilter);

    if (appliedFilters.includes('custom')) {
      // Add custom filters to the selectedFilter array
      selectedFilter.push(...customFilter);
      console.log('Selected Filter (updated with new words):', selectedFilter);
      removeLabelled();
    }

    // Send a message to the background script to update custom filters
    chrome.runtime.sendMessage({ type: 'updateCustomFilters', customFilters: customFilter });
  }   

  if(request.type === 'removeCustomFilter' && request.customFilters && Array.isArray(request.customFilters)){

    customFilter = request.customFilters;
    
    chrome.storage.local.set({ customFilters: customFilter });

    console.log('Custom Filter (updated with removed words):', customFilter);
  }
});

=======
      selectedFilter.push(...customFilter);
    }

    chrome.storage.local.set({ selectedFilter });
    removeLabelled();
  }

  if (request.type === 'addCustomFilter' && request.customWords && typeof request.customWords === 'string') {
    const words = request.customWords.split(',').map(word => word.trim());
    customFilter.push(...words);

    chrome.storage.local.set({ customFilters: customFilter });

    if (appliedFilters.includes('custom')) {
      selectedFilter.push(...customFilter);
      removeLabelled();
    }

    chrome.runtime.sendMessage({ type: 'updateCustomFilters', customFilters: customFilter });
  }

  if (request.type === 'removeCustomFilter' && Array.isArray(request.customFilters)) {
    customFilter = request.customFilters;

    chrome.storage.local.set({ customFilters: customFilter });
  }
});

removeLabelled();
>>>>>>> 505a582 (Refactored js files)
