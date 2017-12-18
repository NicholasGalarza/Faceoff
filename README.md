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

| Asteroid | Colour | 
| -------- | ------ | 
|  *red*   | angry  | 
|  *green* | happy  | 
|  *blue*  |  sad   | 
|  *yellow* | suprised | 
|  *brown* |   any  |

### TODO
1. [x] Make entities render by using component (a possible alternative would be to use React's ability to create functions inside of {} )
2. [ ] Incorporate `physics system` to fire projectiles
3. [ ] Attatch `clmtrackr's` emotion attribute to each projectile
4. [ ] Add event listeners on asteroids to destroy if attributed bullet collides with object





