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

#### copy config file
adjust your screeps home directory in the "screeps.json"
```
cp screeps.json.dist screeps.json
```

#### build project and copy files into "sim" subdirectory
select the "sim" directory once when you are in the simulation
```
gulp deploy-sim
```

#### build project and copy files into "world" subdirectory
select the "world" directory once when in the world
```
gulp deploy-world
```


## Usage

#### Debugging
Every creep as a `debug` property in it's memory. Set this to true to output debugging informations to the console (like it's behavior tree).


## Background

I am a PHP developer in my day to day job, so please be indulgent with my coding style. Suggestions and comments are very welcome!


## Credits

The behavior tree implementation is heavily based on http://behavior3.com.