const SokobanProblem = require('./SokobanProblem');
const SokobanAgent = require('./SokobanAgent');

let myProblem = new SokobanProblem({ maxIterations: 200 });

myProblem.addAgent("Peter", SokobanAgent, { x: 0, y: 2 });
let entorno= [
    ['W','W','W','W','W','W',],
    ['W','0','0','0','W','W',],
    ['W','X','0','X','0','W',],
    ['W','0','0','W','0','W',],
    ['W','0','0','0','0','W',],
    ['W','W','W','W','W','W',],
]
let box_points = [[1.1],[2,2],[2,3]]
myProblem.solve(entorno, box_points, {
    onFinish: (result) => {
        let agentID = result.actions[result.actions.length - 1].agentID;
        console.log("agent: " + agentID);
        console.log(result.actions);
        let world = JSON.parse(JSON.stringify(result.data.world));
        let agentState = result.data.states[agentID];
        world[agentState.y][agentState.x] = "X"
        status = 1;
        for (let line of world) {
            console.log(line)
            for (let cell of line)
                if (cell == -1)
                    status = -1
        }

        if (status == -1)
            console.log("###   Win!!!  ###")
        else
            console.log("### Game Over ###")
    },
    onTurn: (result) => { console.log("Turn: " + JSON.stringify(result.actions[result.actions.length - 1])) }
});
