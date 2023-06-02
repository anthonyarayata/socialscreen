# SocialScreen <img src="src/icons/48.png" alt="socialscreen logo" height="24" width="24">


## Introduction
SocialScreen, previously named Filterino, is a Chromium browser extension designed to filter unwanted content in social media platforms such as Facebook, Instagram, and Twitter. It removes the posts by manipulating the HTML document of a website. This means that does not directly interact with the users' social media accounts, but only the HTML document that allows them to see the posts in their feed. SocialScreen also has limited filtering functions for Reddit, and other websites.


## Installation Guide
SocialScreen is currently in "pending review" status in the Chrome Web Store. 
For users to be able to install the extension, they need to follow these steps:

1. Download the code as a zip file from this repository. 



2. Extract the contents in the desired folder.

<p align = "center"> <img src="src/installation guide/2.jpg"> </p>

3. Open the Chromium browser where you wish to install the extension.



4. Click on the 3 dots on the upper right corner where your options are.



5. Click on "Extensions" and then "Manage Extensions"

<p align = "center"> <img src="src/installation guide/5.jpg"> </p>

6. On the top-right corner, toggle "Developer Mode"

<p align = "center"> <img src="src/installation guide/6.jpg"> </p>

7. On the top-left corner, click on "Load Unpacked" and find the folder of the extracted zip file for SocialScreen, it should be named "socialscreen-main".

<p align = "center"> <img src="src/installation guide/7.jpg"> </p>

8. Open the "socialscreen-main" folder to see another one with the same name, select that folder.

<p align = "center"> <img src="src/installation guide/8.jpg"> </p>

9. Now SocialScreen should appear when you click on the puzzle piece icon for Extensions.

<p align = "center"> <img src="src/installation guide/9.jpg"> </p>

10. Pin the SocialScreen extension for ease-of-use.

<p align = "center"> <img src="src/installation guide/10.jpg"> </p>

11. Enjoy!

<p align = "center"> <img src="src/installation guide/11.jpg"> </p>


## User Guide
SocialScreen is easy to use as the UI is pretty self explanatory but we will still enumerate them: 
1. Click on the SocialScreen icon to open the UI.
2. Click on the checkbox of the desired filter.
3. Click on Apply Filters to remove posts. (You do not have to refresh the website for this)
4. If you want to add a custom filter, enter the desired text in the text field and click on "Add".
5. You can also add a custom filter while the Custom Filter checkbox is ticked, what this does is automatically apply newly added word for filtering.
6. If number 5 doesn't happen, just click "Apply Filters".
7. Click on "Show Custom Filters" to see the custom filters added. (Remember duplicates can be added but do not worry as it will not really affect the web extension).
8. To remove a filter click the "x" button on the opposite side of the word you desire.
9. Removing a custom filter will not bring back the posts removed and you will have to refresh the page to see them again. 


## Algorithms Used
SocialScreen utilizes the following algorithms to provide effective content filtering:

1. **Fuse.js**: The extension employs fuzzy matching and fuzzy search when matching the HTML documents against the filter datasets.
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
