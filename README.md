![Tux, the Linux mascot](/assets/images/ami.responsive.png)


# link to the website
 - <https://samgree.github.io/Love-Quiz/>

# Table of Contents  

## Site Overview
### Goal
 - Creating a quiz game involves setting clear goals to ensure the game is engaging, educational, and enjoyable for players. 
   Here are some key goals to consider when creating a quiz game:
   - Engagement: Ensure the game is fun and engaging to keep players interested.
   - Educational Value: Provide informative and educational content to enhance players' knowledge.
   - Challenge: Balance the difficulty to provide a rewarding challenge without being too frustrating.
   - Feedback: Provide immediate feedback on answers to help players learn and improve.

### User Stories
- As a user:
   - I want to easily understand the purpose of the site.
   - I want to understand how to play the game.
   - I want to easily start the game by just entering my name or any other player's name.
   - I want to play the game again if I get a high or low score.
 
   
 ### Rules
  - In this game, the first step is to enter your name. Once you've done that, you'll proceed to the next page where you can start answering questions. A timer will be active, giving you 15 seconds to answer each question. If you don't answer within the time limit, the current question will disappear, and the next question will be displayed automatically, the player will receive the score after going through all 10 questions.
 
## Design
## Features
### Existing Features
##### Main page
 - I chose this image of nature because my questions are about nature.
    ![Tux, the Linux mascot](/assets/images/my.resize.img.jpg)

- Header
    - Featured at the top of the page, the header shows the game name Brainy Quiz.
    ![Tux, the Linux mascot](/assets/images/brainy.quiz.png)
    - A header that clearly tells the user what game they are playing, combined with the background image CSS
- Start the game
    - here is the part where can player type their name to enter the game.
    ![Tux, the Linux mascot](/assets/images/login.now.png)

#### second page
   - After the player logs in then questions will appear with the timer, if the player runs out of time, the game will move on to the next question automatically.
    ![Tux, the Linux mascot](/assets/images/countdown.png)
   
   - After the player makes a choice, the answer will be highlighted with a green background if correct, or a red background if incorrect. Then, the button will appear 'Next' allowing them to proceed to the following question.
    
     ![Tux, the Linux mascot](/assets/images/wronganswer.screenshot.png) 
   - when a player makes a choice button appears NEXT
     ![Tux, the Linux mascot](/assets/images/button.screenshot.png) 

  - Once the player goes through all questions, the player's score and name will be displayed. Then players have the option to play again if they want to.
    ![Tux, the Linux mascot](/assets/images/final.png) 

### Wireframe for mobile 
   - ![Tux, the Linux mascot](/assets/images/brainy.quiz.mobile.png) 
   - ![Tux, the Linux mascot](/assets/images/timer.png)
   - ![Tux, the Linux mascot](/assets/images/wireframe.q.s.mobile.png)  
     ![Tux, the Linux mascot](/assets/images/result.wireframe.mobile.png) 

### iPad wireframe for all pages from the main page to the result page. 
   - ![Tux, the Linux mascot](/assets/images/brainy.ipad.png) . 
   ![Tux, the Linux mascot](/assets/images/ipad.last.png).
   ![Tux, the Linux mascot](/assets/images/ipad.select.png).  
   ![Tux, the Linux mascot](/assets/images/ipad.result.png).

- My website has same the structure for all kinds of devices.
    

 ## Page test
 - HTML 
     - ![Tux, the Linux mascot](/assets/images/html.validator-screenshot%20.png)
- CSS 
   
    - ![Tux, the Linux mascot](/assets/images/css.validator.screenshot.png)
- JavaScript
    - No errors were found when passing through the official Jshint validator.
    - There are 15 functions in this file.                      
    - Function with the largest signature takes 1 argument, while the median is 0.
    - The Largest function has 9 statements in it, while the median is 4.
    - The most complex function has a cyclomatic complexity value of 3 while the median is 2.

- Lighthouse test

  - ![Tux, the Linux mascot](/assets/images/lighthouse.final.png)

## Technologies used

   - HTML5 for the contents and structure of the website.
   - CSS for the styling.
   - Wireframing.
   - GitPod as a local IDE & repository.
   - GitHub Pages to deploy the website.
   - Chrome Developer Tools for testing screen sizes and using 
    Lighthouse.
   - Wave Chrome extension to check web accessibility.
   - Am I Responsive for testing and making responsive images?
   - JS functions and examples.
   - Visual Studio Code as a local IDE & repository.     

    
 ## Unfixed Bugs
 - None

 ## Deployment
    
- The site was deployed to GitHub pages. The steps to deploy are as follows:
  - In the GitHub repository, navigate to the Settings tab
  - From the source section drop-down menu, select the Master Branch
  - Once the master branch has been selected, the page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment.

 ## Credits
  - Luke Buchanan my mentor.
  - Instructions on how to build the quiz including codes, were in taken from this tutorial
  <https://www.youtube.com/watch?v=PBcqGxrr9g8>
  - Used chatgpt for debugging. 
  ## Content
  - Favicon I created myself manually from this website, 
    <https://www.favicon.cc/>
   
    - ![Tux, the Linux mascot](/assets/images/favicon.png)
  
  ## Media
  - I took questions from free resources on these two websites, <https://livemore.yha.org.uk/natural-world-quiz/> 
  <https://www.trivianerd.com/topic/nature-trivia>
  - The background image was from a free resources website, but I just resized the image because was too large. 
  <https://stock.adobe.com/search?k=%22nature+scene%22&asset_id=721959596>

## Update on Project information
- I want to acknowledge that the initial documentation for this project was lacking in certain areas. Specifically, there was insufficient information provided about the origins and sources of the code.
- I have updated the Credits section, to show and provide additional information about the contributions and sources used in this project.
- line 237 (js), my timer function which was not working. ChatGPT picked up that I was using setInterval() wrong and corrected me, 
- In the form where I had an extra div closing tag element , and ChatGPT corrected me by removing the element, because the element already had closing tag right after the form element in line 29 (HTML).

- Instructions on how to build the quiz including codes, were in taken from this tutorial <https://www.youtube.com/watch?v=PBcqGxrr9g8>
- Thank you for your understanding and patience. 