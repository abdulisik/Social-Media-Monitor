# Social-Media-Monitor
Automatically monitor and log fans/followers/likes counters from social media (Facebook Pages, Twitter, Instagram, YouTube, Google+, OneSignal, Alexa) using APIs to Google Spreadsheet. Very useful for website admins and social media managers.

This Google Apps Script reads numbers from social media and pages via APIs or URL parsing EVERY DAY - so you don't need to! Also you can analyze them at long-term and create cute charts.

I'm using this for some time and wanted to share it since I couldn't find this much automated and exact solution. These are all I can do with my current level of expertise (read as:"beginner").
If you know shorter ways, or want to add any social media/application, pull requests are very welcome!

# Currently Available Stats
- Likes count from a Facebook Page you're admin/moderator of
- Likes count from any Facebook Page - though needs improvement
- Followers count from any Twitter profile
- Followers count from any Instagram profile
- Subscribers count from any YouTube channel
- Followers count from any Google+ page
- Reachable subcsribers count from OneSignal
- Current international and local page rank from Alexa

# Needed Integrations
- Google Analytics
- Google AdWords
- WordPress

# Example Spreadsheet
Here is an example spreadsheet with further analysis and charts!
https://docs.google.com/spreadsheets/d/1NO4ta5oHq1HNazlbvV4Q5gY8b6dV-N0b4iGhC-qgpo8

# Instructions
- Copy the script from here or at: https://script.google.com/d/1Knl4p3ufOghuz8FqudNCYGOThRldU3Gm81RDLo84Lc7VmkqpLnhxK0rX/copy
- Remove (or duplicate) the functions as needed. Also remove them from main function!
- Populate needed API_KEYS - if the function requires.
- Copy this spreadsheet to further analyze values easily: https://docs.google.com/spreadsheets/d/1NO4ta5oHq1HNazlbvV4Q5gY8b6dV-N0b4iGhC-qgpo8/copy
- Run "MAIN_SAVE_DATA" function to confirm it works for you. You can uncomment and add log lines to debug it.
- To make the script run every day (every hour not recommended), create a trigger by going to Edit -> Current project's triggers.
- Also open notifications from the same menu. It fails intermittently because of social medias' some limits, but it'll continue next day.

Hopefully, this covers everything needed. If something doesn't work for you (or if it saves you time!) drop a comment here.
Happy tracking!
