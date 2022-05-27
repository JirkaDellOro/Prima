# Prima
Repository for the module "Prototyping interactive media-applications and games" at Furtwangen University

[Pages-Version](https://jirkadelloro.github.io/Prima/)

In this course, students learn fundamentals of game engines and development environments for prototyping. They learn basic development patterns used in highly interactive applications such as animation, transformation, object relationships and event control. We analyse concepts for complex applications or simple games, plan the realisation of core features and create executable prototypes for demonstration. In the end, students design their own piece of art and produce it themselves.

The environment we work with is [FUDGE](https://jirkadelloro.github.io/FUDGE), the Furtwangen University Didactic Game Engine/Editor, which allows for optimized tuition and collaboration, while demonstrating the fundamentals of popular engines like Unreal or Unity. Students acquainted to FUDGE can easily shift over to these mighty tools later on. Coding language is [TypeScript](https://typescriptlang.org)

## Examples
This is **experimental** material created by the docents during the PRIMA-lectures while explaining some core functionalities the course was working on. Usually, we examine one 2d and one 3d application. **These are not fully functional prototypes**. 

| Semester | 2D                                                                                             | 3D                                                                                       |
|---------:|------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
|      W21 | [LaserLeague](https://jirkadelloro.github.io/Prima/W21/LaserLeague)                                | [MarkusCart](https://jirkadelloro.github.io/Prima/W21/MarkusCart)                            |
|      S21 | [SpaceInvaders](https://jirkadelloro.github.io/Prima/S21/L02_SpaceInvaders/SpaceInvaders.html) | [PhysicsGame](https://jirkadelloro.github.io/Prima/S21/L05_PhysicsGame/PhysicsGame.html) |
|      W20 | [BreakOut](https://jirkadelloro.github.io/Prima/W20/L07_BreakOut_Final/Main.html)              | [Doom](https://jirkadelloro.github.io/Prima/W20/L13_Doom_UI/Main.html)                   |
|      S20 | [Snake](https://jirkadelloro.github.io/Prima/S20/L08_Snake3D_Enemy/Main.html)                  | [TowerDefense](https://jirkadelloro.github.io/Prima/S20/L11_TowerDefenseFire/Main.html)  |
|      W19 | [Pong](https://jirkadelloro.github.io/Prima/W19/L06_PongFinal/Main.html)                       | [Craftris (3D-Tetris)](https://jirkadelloro.github.io/Prima/W19/L13_Craftris)            |


## Checklist for the final assignment
© Prof. Dipl.-Ing. Jirka R. Dell'Oro-Friedl, HFU
| Nr | Criterion           | Explanation                                                                                                         |
|---:|---------------------|---------------------------------------------------------------------------------------------------------------------|
|  1 | Units and Positions | Where is 0, what is 1? Explain your setup of coordinate systems of the entities.                                    |
|  2 | Hierarchy           | Explain the setup of the graphs and the advantages you gain by it.                                                  |
|  3 | Editor              | Use the visual editor and explain which parts are better done by coding and why.                                    |
|  4 | Scriptcomponents    | Use scriptcomponents and explain if they were useful in your context or not and why.                                |
|  5 | Extend              | Derive classes from FudgeCore and explain if that was useful in your context or not and why.                        |
|  6 | Sound               | Use sounds and explain your choice of sounds and placement in respect to the user's perception.                     |
|  7 | VUI                 | Create a virtual user interface using the interface controller and mutables. Explain the interface.                 |
|  8 | Event-System        | Use the event system to send messages through graphs and explain if that was useful in your context or not and why. |
|  9 | External Data       | Create a configuration file your application loads and adjusts to the content. Explain your choice of parameters.   |
|  A | Light               | Explain your choice of lights in your graphs (1)                                                                  |
|  B | Physics             | Add rigidbody components and work with collisions (1) and/or forces and torques (1) and/or joints (1)               |
|  C | Net                 | Add multiplayer functionality via network (3)                                                                       |
|  D | State Machines      | Create autonomous entities using the StateMachine (1) and/or ComponentStateMachine (1) defined in FudgeAid          |
|  E | Animation           | Animate using the animation system of FudgeCore (1) and/or Sprites (1) as defined in FudgeAid                       |

The criteria 1 to 9 are mandatory and yield 1 point each. Choose from A to E for additional points as noted in brackets. One aspect of your application may not fullfill multiple criteria.  
| Points | 10  | 11  | 12  | 13  |
|--------|-----|-----|-----|-----|
| Grade  | 4.0 | 3.0 | 2.0 | 1.0 |

## Format 
- Include the runtime files of FUDGE used in your repository so they don't outdate.
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
