codeclash
=========

A moderating BOT built for the course of Artificial Intelligence

Application Demo
----------------
Link: https://www.youtube.com/watch?v=ISl5Una4dw8

Functioning
------------
The BOT would ask to input two child BOTS based on Artificial Intelligence 
and would moderate them to compete against each other as per a predefined gameplay.

Game Play
----------
The Game Play is such that both players would have a fixed no of Tanks
and using the tanks they would have to protect the Assets of their Kingdom
and kill the opponent's Tanks.

Field Map
---------
The field Map would comprise of:

1. Walls
2. Player Assets
3. Player Bots
4. Fired Region

## Positioning
The position of objects on the field is not fixed.
Multiple maps can be generated by changing the configuration file.

Rules
-----
Player Bots are allowed to move and fire only in four directions 
North, South, East, West
The Firing range is 3 Units in for this version, but can be changed by changing the 
realted variable in server files.
Bots are not allowed to cross the walls but they can destroy the Walls to make way.

Scoring
-------
This version doesn't include scoring strategy.
The main aim in this version is to destroy the Assets and Bots of Opponent.
Whosoever succeds in destroying the opponent's assets or bots first would win the game.
Input
-----
A 2-D matrix showing the Field state at current time.

Output
------
##### A linear array returning 4 variables

1. The X and Y coordinates of Player psition
2. Direction of Move/Fire
    ```
    1 North, -1 South, 2 East, -2 West
    ```
3. Boolean Variable
    ```
    0 For Moving,   
    1 For Firing 
    ```


