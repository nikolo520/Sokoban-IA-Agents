const Problem = require('../core/Problem');

class SokobanProblem extends Problem {
    constructor(args) {
        super(args);
        this.env = args;
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