# Modern Set Editor
A modern and simplified tool for adding objects, enemies, and more to levels in Sonic Adventure 2. Inspired by TurtleMan64's [Set Adventure 1.2](https://github.com/TurtleMan64/SetAdventure) and written with Angular and ElectronJS, it has never been easier to mod levels for the Sonic Adventure series of games.

Through the use of a new modular design, objects are visualized in a way that makes them easy to edit and even easier to understand.

![image](https://user-images.githubusercontent.com/80438344/222892418-098fddb5-ca6c-43b7-8449-df013c9db496.png)

## Background
This project was built to solve the pain points users felt when trying to create and edit levels for Sonic Adventure 2. Namely, object editing tools are far and few between, and the tools that do exist either have confusing interfaces, or depend on aging technology stacks. Not only that, but the very game these tools were built for were built with complicated designs and many hard-coded special cases, which make building tools and modding the game in general much harder. Previous tools such as Set Adventure 1.2 would rely on the user to understand almost every facet of how the internal object system works in Sonic Adventure 2, and only ever displayed numbers or values to the user. So my goal as a developer was to relieve these pain points, and allow any user regardless of how much they know about Sonic Adventure 2's internal systems to create and edit objects for levels in Sonic Adventure 2.

## Features
One of Modern Set Editor's greatest features is its labeling system. Previously, tools required a user to understand what each internal ID means- whether it was a number, or a confusing abbreviation. Now, with Modern Set Editor, each internal ID has been given a clear and concise label, leaving confusing IDs to be handled by the tool in the background. Another great feature of the labeling system is its ability to clear the air when it comes to special, hard-coded cases. Many times in Sonic Adventure 2, a certain variable may be used for a completely different purpose- so to alleviate this, the Modern Set Editor detects these special cases, and displays a small blurb to the user explaining what exactly this value does.

Other features include:
* Responsive design
* Drag and drop files
* Object Sorting
* Automatic file naming based on stage and purpose
* Simple conversion from Blender coordinates to in-game coordinates
* Auto update detection
* Multi-platform support through ElectronJS
* Virtual scrolling

## Stretch Goals
* Support for Sonic Adventure 1
* Visualizations of rotations

## Credits
All of this was made possible by help from the X-Hax community, whose discord you can find here: [X-hax Discord](https://discord.gg/gqJCF47). They are responsible for all the documentation available for the game, including the large amount of labeling data the Modern Set Editor depends on.

## Notes
This project was made with ElectronJS using Angular, and includes the use of Google-provided material components. If have any questions or requests for this project, please leave an issue or email me directly, and if you have any questions regarding Sonic Adventure, modding, or Set Objects, feel free to ask at the [x-hax discord](https://discord.gg/gqJCF47).

## Contributor notes
Feel free to contribute or write code for the project! There is a "CONTRIBUTING" file that explains best practice. Long story short, make sure you create your own branch, and make sure you run `ng test` after making your changes. This will make sure the rest of the app still works.

If you are unfamiliar with Angular, don't worry! Here's a guide on where the most important logic lies:

* To make changes to how files are saved, see main.ts.
* To make changes to how the state is stored and handled, see ObjectService.
* To make changes to the interface, see SetEditor and SetObject.

Most interfaces/structs used in the project are defined in src/shared/interfaces. Any other content thats shared between multiple different components/subpages are stored in src/shared/content.

## Trademarks
Sega, Sonic, Sonic the Hedgehog, and Sonic Adventure are either
trademarks or registered trademarks of SEGA of America, Inc.

## Copyright
Because I work at Google, the copyright of this project currently belongs to Google LLC. This project is still open source, so feel free to add whatever you'd like, but copyright headers have been added to source code files for legal purposes. As long as you don't touch them, and follow the guidelines in CONTRIBUTING.md, you should be fine.
