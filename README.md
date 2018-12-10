[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Deployed Site
https://lightcloud36.github.io/marvel-comics/

# Back End Repo
https://github.com/LightCloud36/marvel-comics-back-end

# Tech

* CSS
* JSX
* HTML5
* Axios
* Express
* ReactStrap
* MARVEL API




# The Application
A MARVEL comics encyclopedia created with React and Express that lets you add characters to your favorites list where you can learn everything about the characters from their origins to what comics they appear in using MARVEL COMIC's api.


# The Process
During this project I spent a lot of time trying to figure out what I actually wanted to do. So while I was falling a sleep on my phone in bed I stumbled across the MARVEL API! I was always a huge fan of their comics and characters in genral, that I jumped at the chance to make an application realted to something I love. After spending time with MARVEL's great API docs I was able to get an idea of what the project was going to be and thus the encyclopedia was born.


I wanted the user to be able to see MARVEL characters as soon as they visit the home page. I didn't want to limit the user's interaction with the application before signing in, so I went with the try before you buy method that allowed user's to use 95% of the application before ever creating an account and signing in. I did this by calling MARVEL's API character index as soon as the homepage booted up, this allowed user's to visually see the charcaters they could have access too once they created an account.


I wanted to keep user functionality simple for version 1.0 of the application by only letting user's add characters to their favorites table. I accomplished this by having an add to favorites button that stores the MARVEL characters comic ID in an array and then when the user wants to view their characters, the characters ID's are passed to marvels api that then send back the request that i use to render the characters info into the user's favorites.

Heading into Version 2.0 I want to style the application more in line with MARVEL's own website, as well as add more functioinality that allows user's to get even more info about the characters.


# Unsolved Issues
Styling: I want to use reactstrap to create character layout cards where the infomation being returned from MARVEL's api will live. Still need to style the site itself to look more inline from something you would see if you went to MARVEL.com.


Version 2: I want to have character cards that flip to show more info about the character with links that dig even deeper about the characters.

# User Stories
1. User will see the Home screen that is populated with MARVEL characters.
2. User will sign up for an account in order to sign and add charcaters to their favorites list.
3. Once signed in an add button will render under each character.
4. A user can click on the add button to add a character to their favorites.
5. A user will be able to view their favorites when they click on the the favorites link.
6. Once in their favorites they can click on links in the th character card that will produce more infomation about the charcater.
7. If a user clicks on the remove button, the character associated with that button will be removed.
8. A user can click the home button to navigate back home to add more characters into their favorites.
9. If a user clicks the change password link, they will be able to update their password.
10. If the user clicks the sign out link, the user will be signed out and returned back to the home screen where the characters will render without the add button.

# Version 1.0
![Imgur](https://imgur.com/Gt1xsFe.png)

# Wire Frame
![Imgur](https://imgur.com/Qj5ORnx.jpg)
