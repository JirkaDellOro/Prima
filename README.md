# Prima
Repository for the module "Prototyping interactive media-applications and games" at Furtwangen University

[Pages-Version](https://jirkadelloro.github.io/Prima/)

## Examples
See the results created by the docents during the PRIMA-lectures. This is experimental material showing some core functionalities the course was working on, not fully functional prototypes. Usually, we examine one 2d and one 3d application.  

| Semester | 2D                                                                                             | 3D                                                                                       |
|---------:|------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
|      W21 | [LaserLeague](https://jirkadelloro.github.io/Prima/LaserLeague)                                | [MarkusCart](https://jirkadelloro.github.io/Prima/MarkusCart)                            |
|      S21 | [SpaceInvaders](https://jirkadelloro.github.io/Prima/S21/L02_SpaceInvaders/SpaceInvaders.html) | [PhysicsGame](https://jirkadelloro.github.io/Prima/S21/L05_PhysicsGame/PhysicsGame.html) |
|      W20 | [BreakOut](https://jirkadelloro.github.io/Prima/W20/L07_BreakOut_Final/Main.html)              | [Doom](https://jirkadelloro.github.io/Prima/W20/L13_Doom_UI/Main.html)                   |
|      S20 | [Snake](https://jirkadelloro.github.io/Prima/S20/L08_Snake3D_Enemy/Main.html)                  | [TowerDefense](https://jirkadelloro.github.io/Prima/S20/L11_TowerDefenseFire/Main.html)  |
|      W19 | [Pong](https://jirkadelloro.github.io/Prima/W19/L06_PongFinal/Main.html)                       | [Craftris (3D-Tetris)](https://jirkadelloro.github.io/Prima/W19/L13_Craftris)            |


## Checklist for the final assignment
© Prof. Dipl.-Ing. Jirka R. Dell'Oro-Friedl, HFU
| Nr | Bezeichnung       | Inhalt                                                                                                              |
|---:|-------------------|---------------------------------------------------------------------------------------------------------------------|
|    | Title             |                                                                                                                     |
|    | Name              |                                                                                                                     |
|    | Matrikelnummer    |                                                                                                                     |
|  0 | Units and Postion | Where is 0, what is 1? Explain your setup of coordinate systems of the entities.                                    |
|  1 | Hierarchy         | Explain the setup of the graphs and the advantages you gain by it.                                                  |
|  2 | Editor            | Use the visual editor and explain which parts are better done by coding and why.                                    |
|  3 | Scriptcomponents  | Use scriptcomponents and explain if they were useful in your context or not and why.                                |
|  4 | Extend            | Derive classes from FudgeCore and explain if that was useful in your context or not and why.                        |
|  5 | Sound             | Use sounds and explain your choice of sounds and placement in respect to the user's perception.                     |
|  6 | VUI               | Create a virtual user interface using the interface controller and mutables. Explain the interface.                 |
|  7 | Event-System      | Use the event system to send messages through graphs and explain if that was useful in your context or not and why. |
|  8 | External Data     | Create a configuration file your application loads and adjusts to the content. Explain your choice of parameters.   |
|  9 | Light             | Explain you choice of lights in your graphs.                                                                        |
|  A | Physics           | Add rigidbody components and work with collisions (1) and/or forces and torques (1) and/or joints (1)               |
|  B | Net               | Add multiplayer functionality via network (3)                                                                       |
|  C | State Machines    | Create autonomous entities using the StateMachine (1) and/or ComponentStateMachine (1) defined in FudgeAid          |
|  D | Animation         | Animate using the animation system of FudgeCore (1) and/or Sprites as defined in FudgeAid                           |

The criteria 0 to 9 are mandatory and yield 1 point each. Choose from A to D for additional points as noted in brackets. An aspect of your application may not fullfill multiple criteria.  
| Points | 9   | 10  | 11  | 12  |
|--------|-----|-----|-----|-----|
| Grade  | 4.0 | 3.0 | 2.0 | 1.0 |

## Format 
- Copy the FUDGE-files used to your repository so they don't outdate.
- Bundle the design documentation in a single well formatted PDF-file.
- Create a README.md file in your PRIMA-Repository on Github including the following
  * Title
  * Author
  * Year and season (Summer, Winter)
  * Curriculum and semester
  * Course this development was created in (PRIMA) 
  * Docent
  - Link to the finished and executable application on Github-Pages
  - Link to the source code
  - Link to the design document
  - Description for users on how to interact
  - Description on how to install, if applicable (additional services, database etc.) 
  - A copy of the catalogue of criteria above, the right column replaced with very brief explanations and descriptions of the fullfullments of these criteria

### GameZone
If you'd like to see youra application in the exhibition "GameZone", add the following
- Two screenshots of the running application of the sizes
  - 250 x 100 pixel
  - 1920 x 400 pixel 
* Genre, if applicable
* Tags
* Subtitel (max 40 characters), to encourage to start the application
* Short instructions (max 250 characters) on how to play
* A declaration of consent with the display of the application in the GameZone with an explicit reference to the author.
