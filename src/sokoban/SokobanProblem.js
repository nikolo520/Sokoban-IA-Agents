const Problem = require('../core/Problem');

class SokobanProblem extends Problem {
    constructor(args) {
        super(args);
        this.env = args;
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