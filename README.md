This is my AI for the MMO Screeps (https://screeps.com). Please feel free to use, fork and comment.

My ingame name is *dmecke*, drop me a line if you like.

## Principles

#### Automate everything
The main goal is to achieve as few manual interactions as possible. At the very best none at all.

#### Heavily base on behavior trees
As I gain more and more knowledge about the mechanics of the game, I need to adjust the AI correspondingly. This quickly becomes a mess with masses of precedural code. So the idea is to encapsulate actions and checks into small reusable classes and to leverage them in behavior trees that can be easily adjusted according to new findings.

## Goals

- [x] role behavior is based on behavior trees
- [ ] spawn logic is based on a behavior tree
- [ ] set up a solid network for harvesting a room at maximum efficiency
- [ ] mining
- [ ] acquire new rooms and build them up
- [ ] market logic

## Setup

#### install dependencies
```
npm install
```

#### build project and copy files into "sim" subdirectory
(select this once when in the simulation)
```
gulp deploy-sim
```

#### build project and copy files into "world" subdirectory
(select this once when in the world)
```
gulp deploy-world
```
