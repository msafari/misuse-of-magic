# Misuse of Magic

Simple 2D platformer implemented using http://phaser.io/


### Authors:
- Maedeh Safari
- Victoria Baeza
- Anika Martin

------------------------------------------------------------
### Game Design:
You can read full design document here:

https://misuse-of-magic.firebaseapp.com/benchmark1.html
<p>
  All levels, and design assets are original.
</p>

------------------------------------------------------------

### Animations
Main character, `Tzhara`, can play the following animations:

 | Keyboard Input/Event | Effect/Action |
 | -------------- | ------------- |
 | Right Arrow | Walk right |
 | Left Arrow | Walk left |
 | Up Arrow | Jump |
 | Game Over | Death |
 | Z/X/C + right | Cast a spell in right direction |
 | Z/X/C + left | Cast a spell in left direction |
 | Overlap with wizards | Damage |
 | Collision with wizards attack projectiles | Damage |


------------------------------------------------------------

### Wizard AI:
  In each level, there are many wizards populated. At any given time, each wizard will randomly choose between moving around or attacking the player.
    - If it's moving around: the moves will be random at times to give the player a chance to
      escape, otherwise it will try to corner the player since if it overlaps with the player, player will be lose health.
    - If it's attacking the player: it will launch an attack based on the type of the wizard
      toward the player. Note that this attack launch has a large span because it aims for player's location. This results in attack sprites shooting a the player and making the game more challenging.

------------------------------------------------------------

### Sound Effects:
  All sound effects are original effects made by Victora Baeza using Audacity and nyquist.

------------------------------------------------------------

### Game Music:
  InGameMusic1 made by Kevin Lui from:
  http://www3.cs.stonybrook.edu/~cse393/projects/Kevin%20Lui/black.mid

  InGameMusic2 made by P Colo from:
  http://www3.cs.stonybrook.edu/~cse393/projects/P%20Colo/black.mid

  InGameMusic3 made by Mashed Potato Samurai from:
  http://www3.cs.stonybrook.edu/~cse393/projects/Mashed%20Potato%20Samurai/black.mid

------------------------------------------------------------

### Cheats:

Skip Level:
  In the level select screen. Press:
  1: unlock level 1 (not really necessary because it will always be unlocked)
  2: unlock level 2
  3: unlock level 3


  NOTE: the rest of levels are not designed yet and are simply placeholders. That's why unlock cheats for levels 4 and above is not provided.


### In Game Cheats:

  - Pressing M will result in a dialog box to open in the game screen. You can click on the
    boolean value of the cheat you would like to activate/deactivate. Please note that this input just looks like text but in fact is listening to your input. We plan on changing this to checkmarks or buttons later so it's more clear.

    -  Player Invincibility: will change the tint of player. Player will be immune from damage.

    - Infinite Attack: Normally player can only cast 5 spells of each type. After using this
    cheat, player will have infinite spells of any type.

    - Infinite Oranges: will help with restoring spells.

  - Press O to restore spells. You will need at least 10 oranges.
    Afterwards a dialog will pop up prompting you to pick the type of the spell you'd like to restore.
------------------------------------------------------------


After Tzhara reaches the gate at the very end of the level she wins and a win overlay is shown
If Tzhara runs out of health, death animation plays and after the animation is complete a lose overlay is displayed.
