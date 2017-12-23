# Faceoff!
###### (A VR game to destroy floating asteroids)
Documentation for a-frame: https://aframe.io/docs/0.7.0/introduction/

Documentation for clm-tracker: https://www.auduno.com/clmtrackr/docs/reference.html


## Installation
Fork this project to your local computer, and you must do: 
1. `npm install`
2. `npm run start`
3. Go on over to `localhost:8080`

## Development
1. `npm run build-watch`
2. `npm run start`
3. Go on over to `localhost:8080`
* Note, you must have `build-watch` and `start` running at the same time

### How to play
This game will track your facial expressions to determine what attribute to attach to each bullet. 
A bullet is fired after releasing the 'e' key. To begin tracking your face, you must hold down 'e'
and must create an expression to destory an asteroid. Colors are matched to each particular asteroid, 
here is the general schema for what you can destroy: 

| Asteroid | Color | 
| -------- | ------ | 
|  *red*   | angry  | 
|  *green* | happy  | 
|  *blue*  |  sad   | 
|  *yellow* | suprised |
|  *brown* |   any  |

### TODO
1. [x] Make entities render by using random component generator
2. [x] Incorporate `physics system` to fire projectiles
3. [x] Attatch `clmtrackr's` emotion attribute to each projectile
4. [x] Tracking on projectiles to destroy if attributed bullet crosses verticies with asteroid object.
5. [ ] Textures to spheres and make vr-space more ambient
6. [ ] Color to bullet for correlating emotion.
7. [ ] Add physics to allow player to jump and not fall through the world
8. [ ] Deploy! 

### BUGS
1. [ ] Rendering issue with projectile tracking for empty target list and general slowdown.
    While still playable, I need to look into `three.js` raycaster docs to create a more performant collision detection component.






