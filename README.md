# weather-dashboard-challenge
The purpose of this challenge was to apply our new knowledge of server-side APIs and how to retrieve data from them while building upon our current knowledge about the various languages and third-party APIs. Using the "fetch" method, we were required to pull information about the weather of various cities from OpenWeather and display that information on our application. In the rest of this ReadMe, I will walk you through my process and share some of my thoughts along the way.

Creating an application from scratch seems daunting at first. However, the routine of setting up my initial files, linking my repositories, and creating an HTML skeleton felt habitual. Once these things were in place, I felt confident in tackling the meat of the challenge. Something to mention here is that my decision to link Bootstrap to expedite any styling task ended up being a great decision. Not only was it convenient for styling, but also for formatting the elements on my page.

My first obstacle was making sure that my retrieval from Local Storage worked properly. In previous challenges, dealing with Local Storage was my nemesis. Much to my delight, I was able to write code that smoothly "sets" and "gets" items from Local Storage.  It looks like previous experienced paid off.  I made sure to get this part of the challenge out of the way early.

The next obstacle - and the first real issue - was making sure that the cities in my search history properly displayed their weather when clicked. This turned out to be more of a conceptual problem than a technical one.  I was not aware that I could pass parameters from an element through its eventListener. This was achieved using "event.target".

When it finally came to deciding how to display the weather forecast, I debated between manually updated existing elements in HTML or using a "for loop" to dynamically create those elements. In the past, I had trouble figuring out how to properly implement a "for loop". However, I decided to go with this choice as it would SIGNIFICANTLY reduce the amount of coding required. My decision paid off, but it led to another - and final - obstacle: the forecast of one city did not disappear when I clicked on a new city to check. After some experimenting, I realized I had to clear the content from the previous search before the function to display the forecast is called.

What I enjoyed about this challenge is that it allowed me to play with new tools and information.  It was my first time using the Network tab in DevTools, where I figured out how to extract specific weather information. I got to manipulate URL to retrieve information that I wanted, such as switching the weather data into imperial measurements. I learned how to convert Unix time to daily time and how to display an icon by only using JavaScript. Also, I learned what a UV Index is, and became thankful that I live somewhere that usually does not have a high UV Index.

Overall, I am content with my work on this challenge and the learning I received from it. Here is the link to my application:

Below are a few snapshots of the application when it is empty, being used, and refreshed:


![Alt text](/assets/images/empty-dashboard.PNG)

![Alt text](/assets/images/full-dashboard.PNG)

![Alt text](/assets/images/saved-dashboard.PNG)