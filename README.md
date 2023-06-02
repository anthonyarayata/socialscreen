# SocialScreen ![socialscreen logo](src/filters/socialscreen/128.png)

## Introduction
SocialScreen, previously named Filterino, is a Chromium browser extension designed to filter unwanted content in social media platforms such as Facebook, Instagram, and Twitter. It removes the posts by manipulating the HTML document of a website. This means that does not directly interact with the users' social media accounts, but only the HTML document that allows them to see the posts in their feed. SocialScreen also has limited filtering functions for Reddit, and other websites.


## User Guide
SocialScreen is currently pending in the Chrome Web Store


## Web Extension Guide
To use the SocialScreen web extension, follow these steps:


## Algorithms Used
SocialScreen utilizes the following algorithms to provide effective content filtering:

1. **Fuse.js**: The extension employs fuzzy matching and fuzzy search when matching the HTML documents against the filter datasets.
2. **DOM Manipulation**: JavaScript DOM manipulation techniques are used to interact with and modify the HTML document, allowing for the filtering and manipulation of specific elements.
3. **Chrome API**: SocialScreen uses Chrome API's throughout the entire extension's structure.

SocialScreen have specialized functions for each website that will remove posts, comments, and other website elements:
* Twitter filter function will remove the posts, post comments, trending topics, and users. 


## Feedback and Contributions
SocialScreen aims to be community-based in terms of development, so feel free to send feedback and suggestions 


## License
SocialScreen is open-source and released under the [MIT License](LICENSE).
