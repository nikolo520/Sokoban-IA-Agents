const Problem = require('../core/Problem');

class SokobanProblem extends Problem {
    constructor(args) {
        super(args);
        this.env = args;
    }

    /**
     * The transition model. 
     * Tells how to change the state (data) based on the given actions. You must override
     * In this case, the actions can be one the four movements or the TAKE action.
     * In this case, what changes based on the movement actions is the x or y position of the agent
     * or the current cell if the action is TAKE
     * @param {} data 
     * @param {*} action 
     * @param {*} agentID 
     */
     update(data, action, agentID) {
        let map = data.world;
        let agentState = data.states[agentID];
        if (action == "UP") {
            next_position = {'x':agentState.x,'y':agentState.y - 1}
            if(this.is_empty(map , next_position)){
                if(this.is_box(data.box_points, next_position)){
                    if(this.shove_box(data,action,next_position)){
                        agentState.y -= 1;
                    }
                }else{
                    agentState.y -= 1;
                }
            }
            
        }
        if (action == "DOWN") {
            next_position = {'x':agentState.x,'y':agentState.y + 1}
            if(this.is_empty(map , next_position)){
                if(this.is_box(data.box_points, next_position)){
                    if(this.shove_box(data,action,next_position)){
                        agentState.y += 1;
                    }
                }else{
                    agentState.y += 1;
                }
            }
        }
        if (action == "LEFT") {
            agentState.x -= 1;
            next_position = {'x':agentState.x -1,'y':agentState.y}
            if(this.is_empty(map , next_position)){
                if(this.is_box(data.box_points, next_position)){
                    if(this.shove_box(data,action,next_position)){
                        agentState.x -= 1;
                    }
                }else{
                    agentState.x -= 1;
                }
            }
        }
        if (action == "RIGHT") {
            agentState.x += 1;
            next_position = {'x':agentState.x +1,'y':agentState.y}
            if(this.is_empty(map , next_position)){
                if(this.is_box(data.box_points, next_position)){
                    if(this.shove_box(data,action,next_position)){
                        agentState.x += 1;
                    }
                }else{
                    agentState.x += 1;
                }
            }
        }
        if (!data.interations) {
            data.interations = 1;
        } else {
            data.interations++;
        }
    }

    shove_box(data,action,position){
        let map = data.world;
               
        if (action == "UP") {
            next_position = {'x':position.x,'y':position.y - 1}
            if(this.is_empty(map , next_position)){
                if(this.is_box(data.box_points, next_position)){
                    return false;
                }else{
                    if(this.is_goal(data.world,next_position)){
                        data.world[next_position.y][next_position.x] = 'Z';
                    }
                    for(var i = 0; i < data.box_points.length(); i++) {
                        if(box_points[0] == [position.x,position.y]){
                            box_points[0][1] = next_position.y
                        }
                    }
                    return true;
                }
            }else{
                return false;
            }
        }
        if (action == "DOWN") {
            next_position = {'x':position.x,'y':position.y + 1}
            if(this.is_empty(map , next_position)){
                if(this.is_box(data.box_points, next_position)){
                    return false;
                }else{
                    if(this.is_goal(data.world,next_position)){
                        data.world[next_position.y][next_position.x] = 'Z';
                    }
                    for(var i = 0; i < data.box_points.length(); i++) {
                        if(box_points[0] == [position.x,position.y]){
                            box_points[0][1] = next_position.y
                        }
                    }
                    return true;
                }
            }else{
                return false;
            }
        }
        if (action == "LEFT") {
            next_position = {'x':position.x -1,'y':position.y}
            if(this.is_empty(map , next_position)){
                if(this.is_box(data.box_points, next_position)){
                    return false;
                }else{
                    if(this.is_goal(data.world,next_position)){
                        data.world[next_position.y][next_position.x] = 'Z';
                    }
                    for(var i = 0; i < data.box_points.length(); i++) {
                        if(box_points[0] == [position.x,position.y]){
                            box_points[0][0] = next_position.x
                        }
                    }
                    return true;
                }
            }else{
                return false;
            }
        }
        if (action == "RIGHT") {
            next_position = {'x':position.x +1,'y':position.y}
            if(this.is_empty(map , next_position)){
                if(this.is_box(data.box_points, next_position)){
                    return false;
                }else{
                    if(this.is_goal(data.world,next_position)){
                        data.world[next_position.y][next_position.x] = 'Z';
                    }
                    for(var i = 0; i < data.box_points.length(); i++) {
                        if(box_points[0] == [position.x,position.y]){
                            box_points[0][0] = next_position.x
                        }
                    }
                    return true;
                }
            }else{
                return false;
            }
        }
    }

    is_goal(world,point){
        if(world[point.y][point.x] == 'X'){
            return true;
        }else{
            return false;
        }
    }

    is_empty(world,point){
        if(world[point.y][point.x] == '0' || world[point.y][point.x] == 'X'){
            return true;
        }else{
            return false;
        }
    }

    is_box(box_points,point){
        result = false;
        for(var i = 0; i < box_points.length(); i++) {
            if(box_points[0] == [point.x,point.y]){
                result = true;
            }
        }
        return result;
    }

    /**
     * Gives the world representation for the agent at the current stage.
     * Notice that the agent don't have access to the whole labyrinth. It only "see"
     * the cell around and under it. 
     * @param {*} agentID 
     * @returns and object with the information to be sent to the agent
     */
     perceptionForAgent(data, agentID) {
        let map = data.world;
        let agentState = data.states[agentID];
        let x = agentState.x;
        let y = agentState.y;
        let result = [];
        //LEFT
        result.push(x > 0 ? map[y][x - 1] : 1);
        //UP
        result.push(y > 0 ? map[y - 1][x] : 1);
        //RIGTH
        result.push(x < map[0].length - 1 ? map[y][x + 1] : 1);
        //DOWN
        result.push(y < map.length - 1 ? map[y + 1][x] : 1);

        result = result.map(value => value > 0 ? 1 : 0);

        //SMELL
        result.push(Math.abs(map[y][x]));
        return result;
    }

    /**
     * Check if the given solution solves the problem. You must override.
     * The current state of the enviroment is maintained in data.world
     * @param {Object} solution 
     */
    
     goalTest(data) {
        let win = true;
        for (var i = 0; i < data.box_points.length(); i++) {
            if(data.world[data.box_points[i].y][data.box_points[i].x]!='Z'){
                win = false
            }
        }
        return win;
    }

    /**
     * Solve the given problem
     * @param {*} world 
     * @param {*} box_points 
     * @param {*} callbacks  
     */

    solve(world, box_points, callbacks) {
        this.controller.setup({ world: world, box_points:box_points,problem: this });
        this.controller.start(callbacks, false);
    }
}

module.exports = SokobanProblem;