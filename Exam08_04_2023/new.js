function solve(arr) {
    let n = Number(arr[0]);
    let employeeLines = arr.slice(1, n + 1);
    let commandLines = arr.slice(n + 1);

    let employees = {};
    let tasks = {};
    let statusPoints = {
        'ToDo': 0,
        'In Progress': 0,
        'Code Review': 0,
        'Done Points': 0,
    }

    fillData();

    for (let i = 0; i < commandLines.length; i++) {
        let commandData = commandLines[i].split(':');
        let command = commandData.shift();
        let commandFunction = getCommandFunction(command);
        commandFunction(commandData);
    }

    calculateStatusPoints();
    printPoints();

    function printPoints(){
        for (const status in statusPoints) {
            console.log(`${status}: ${statusPoints[status]}pts`);
        }
        let doneSum = statusPoints['Done Points'];
        let restSum = statusPoints['ToDo'] + statusPoints['In Progress'] + statusPoints['Code Review'];
        if(doneSum >= restSum){
            console.log(`Sprint was successful!`);
        } else {
            console.log(`Sprint was unsuccessful...`);
        }
    }

    function calculateStatusPoints() {
        for (const taskId in tasks) {
            let status = tasks[taskId].status;
            let points = Number(tasks[taskId].estimatedPoints);
            if(status ==='Done'){
                status = 'Done Points'
            }
            statusPoints[status] = statusPoints[status] + points;
        }
    }

    function getCommandFunction(command) {
        switch (command) {
            case 'Add New':
                return function (data) {
                    let name = data[0];
                    let taskId = data[1];
                    let status = data[3];
                    let estimatedPoints = Number(data[4]);

                    if (employees[name]) {
                        employees[name].push(taskId);
                        tasks[taskId] = {status, estimatedPoints};
                    } else {
                        console.log(`Assignee ${name} does not exist on the board!`)
                    }
                }
            case 'Change Status':
                return function (data) {
                    let name = data[0];
                    let taskId = data[1];
                    let newStatus = data[2];
                    if (employees[name] && employees[name].includes(taskId)) {
                        tasks[taskId].status = newStatus;
                    } else if (!employees[name]) {
                        console.log(`Assignee ${name} does not exist on the board!`);
                    } else {
                        console.log(`Task with ID ${taskId} does not exist for ${name}!`);
                    }
                }
            case 'Remove Task':
                return function (data) {
                    let name = data[0];
                    let index = Number(data[1]);

                    if (employees[name] && employees[name][index]) {
                        let taskId = employees[name][index];
                        employees[name] = employees[name].slice(0, index)
                            .concat(employees[name].slice(index + 1, employees[name].length));
                        delete tasks[taskId];
                    } else if (!employees[name]) {
                        console.log(`Assignee ${name} does not exist on the board!`);
                    } else {
                        console.log(`Index is out of range!`);
                    }
                }
        }
    }

    function fillData() {
        for (let i = 0; i < employeeLines.length; i++) {
            //  {assignee}:{taskId}:{title}:{status}:{estimatedPoints}
            let employeeData = employeeLines[i].split(':');
            let name = employeeData[0];
            let taskId = employeeData[1];
            let status = employeeData[3];
            let estimatedPoints = Number(employeeData[4]);
            let taskArr = [];
            if (employees[name]) {
                employees[name].push(taskId);
            } else {
                taskArr.push(taskId);
                employees[name] = taskArr;
            }
            tasks[taskId] = {status, estimatedPoints};
        }
    }
}

solve([
    '4',
    'Kiril:BOP-1213:Fix Typo:Done:1',
    'Peter:BOP-1214:New Products Page:In Progress:2',
    'Mariya:BOP-1215:Setup Routing:ToDo:8',
    'Georgi:BOP-1216:Add Business Card:Code Review:3',
    'Add New:Sam:BOP-1237:Testing Home Page:Done:3',
    'Change Status:Georgi:BOP-1216:Done',
    'Change Status:Will:BOP-1212:In Progress',
    'Remove Task:Georgi:3',
    'Change Status:Mariya:BOP-1215:Done',
])