const Problem = require('../core/Problem');

class SokobanProblem extends Problem {
    constructor(args) {
        super(args);
        this.env = args;
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