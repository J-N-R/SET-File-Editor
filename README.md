# Modern Set Editor
A modern and simplified tool for adding objects, enemies, and more to levels in Sonic Adventure 2. Inspired by TurtleMan64's [Set Adventure 1.2](https://github.com/TurtleMan64/SetAdventure) and written with Angular and ElectronJS, it has never been easier to mod levels for the Sonic Adventure series of games.

![Screenshot 2023-02-15 224032](https://user-images.githubusercontent.com/80438344/219288007-65a7fb1b-30df-4724-a6e2-37863e403e91.png)

Through the use of a new abstract view over traditional tables and modular design, objects have been seperated from each other, allowing the program to customize each object based on its needs. This means being able to hide unused properties from the user, as well as translating confusing property names (for example, if you create a  'Spring' object, the property 'var 1' will be translated to 'Spring Force').

Made possible by the help of the X-Hax community, whose discord you can find here: [X-hax Discord](https://discord.gg/gqJCF47).

## Features
* A modern, sleek interface powered by Google's material design.
* Simple interactions pioneered through an abstract view.
* Smart objects only show properties that they need to, while translating confusing ones. 
    * *(See the footnote)*
* Easy to create, modify, and delete objects.

*Footnote: Sonic Adventure 2 internally defines properties that are purposefully broad that can change function depending on the context. Properties such as 'var 1,' 'var 2,' and 'var 3' therefore can be difficult for new modders to understand, so a goal of this project is to clear the air by translating these names directly based on the context given.*

## Stretch Goals (WIP)
* Allow exporting to txt
* Allow importing txt
* Multi-level object list support
* Raw View
* Visualizations (?)
* Support for Sonic Adventure 1

## Notes
This project was made with ElectronJS using Angular, and includes the use of Google-provided material components. If have any questions or requests for this project, please leave an issue or email me directly, and if you have any questions regarding Sonic Adventure, modding, or Set Objects, feel free to ask at the [x-hax discord](https://discord.gg/gqJCF47).

## Source Code Notes
For any developers who would like to contribute, but are unfamiliar with Angular, see the following:

* To make changes to how files are saved, see the FileService.
* To make changes to how the state is stored and handled, see ObjectService.
* To make changes to the interface, see SetEditor and SetObject.

File structure:

All files in the 'src' folder are dedicated to the angular frontend, while the main.ts file is the electronJS backend. Each folder in 'src' represents a page of the application, and stores all components and services that are used solely for that page. Otherwise, for all components and services that are used by multiple pages, they are stored in a 'share' folder (with components having their own sub-folders).

**Please do not edit any javascript versions of files, such as main.js. Only edit typescript files to ensure type safety, all js files will be translated automatically on build**.

## Trademarks

Sega, Sonic, Sonic the Hedgehog, and Sonic Adventure are either
trademarks or registered trademarks of SEGA of America, Inc.
