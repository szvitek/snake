# Changelog

## 0.3

- canvas scaled up, but halved the squares inside
- generateApple logic: now apples don't spawn on the snake
- game ends if can't spawn more apples
- fixed a bug in the control:
  - player were able to press multiple directions in one "animation cycle". ie: snake was going right then quickly hit up and left before snake moved and it was detected as a tail collision and the game's ended

## 0.2

- counting score (currently hidden)
- collision detection added
  - wall
  - tail
- improved controls:
  - prevent to go to the opposite direction

## 0.1

- first work in progress "release"
