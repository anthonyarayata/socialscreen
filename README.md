# SocialScreen <img src="src/icons/48.png" alt="socialscreen logo" height="24" width="24">


## Introduction
SocialScreen is a Chromium browser extension designed to filter unwanted content in social media platforms such as Facebook, Instagram, and Twitter. It removes the posts by manipulating the HTML document of a website. This means that does not directly interact with the users' social media accounts, only the HTML document which allows them to see the posts in their feed. SocialScreen also has limited filtering functions for Reddit, and other websites.

**Currently being refactored and may not work properly until finished.**

## Utilities Used
SocialScreen utilizes the following algorithms to provide effective content filtering:

1. **Fuse.js**: The extension employs fuzzy matching and fuzzy search when matching the HTML documents against the filter datasets.
2. **Chrome API**: SocialScreen uses Chrome API's throughout the entire extension's structure.
2. **DOM Manipulation**: JavaScript DOM manipulation techniques are used to interact with and modify the HTML document, allowing for the filtering and manipulation of specific elements.
3. **Chrome API**: SocialScreen uses Chrome API's throughout the entire extension's structure.

SocialScreen have specialized functions for each website that will remove posts, comments, and other website elements:
* Twitter filter function removes the posts, post comments, trending topics, and users. 
* Facebook and Instagram filter functions removes the posts, and post comments.
* Reddit filter function removes the posts from the trending carousel, posts (but only limited to the body of the main thread and not the title), thread replies, and trending.
* Other websites function will blur out the block of text that includes the filtered word.


## Feedback and Contributions
SocialScreen aims to be community-based in terms of development, so feel free to send feedback and suggestions 


## License
SocialScreen is open-source and free to use for all users.
