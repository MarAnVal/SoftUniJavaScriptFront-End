// n
// n x {assignee}:{taskId}:{title}:{status}:{estimatedPoints}
// status ('ToDo', 'In Progress', 'Code Review', 'Done')
function solve(input) {
    const n = Number(input.shift());
    let pointsByStatus = {
        'ToDo': 0,
        'In Progress': 0,
        'Code Review': 0,
        'Done': 0,
    }
    let employees = {};
    let tasks = {};

    for (let i = 1; i < input.length; i++) {
        let employeeData = input[i].split(':');
        if (i < n) {
            // {assignee}:{taskId}:{title}:{status}:{estimatedPoints}
            let name = employeeData.shift();
            let taskID = employeeData.shift();
            let projects = [];
            let employee = {
                name,
                taskID
            }
            let task = {
                taskID,
                title: employeeData[0],
                status: employeeData[1],
                estimatedPoints: employeeData[2],
            }
            if (!employees[name]) {
                projects.push(taskID);
                employees[name] = projects;
            } else {
                employees[name].push(taskID);
            }
            tasks[taskID] = task;
        } else {
            let command = employeeData.shift();
            let commandFunction = getCommandFunction(command);
            commandFunction(employeeData);
        }

    }

    printStatusPoints();

    function printStatusPoints() {

        for (let task in tasks) {
            let item = tasks[task];
            let statusType = item.status;

            pointsByStatus[statusType] = pointsByStatus[statusType] + Number(item.estimatedPoints);

        }

        for (let status in pointsByStatus) {
            console.log(`${status}: ${pointsByStatus[status]}pts`);
        }

        if (pointsByStatus['Done'] >= pointsByStatus['ToDo'] + pointsByStatus['In Progress'] + pointsByStatus['Code Review']) {
            console.log('Sprint was successful!');
        } else {
            console.log('Sprint was unsuccessful...');
        }
    }

    function getCommandFunction(command) {
        switch (command) {
            case 'Add New':
                return function (arr) {
                    let name = arr.shift();
                    let taskId = arr.shift();
                    let title = arr.shift();
                    let status = arr.shift();
                    let estimatedPoints = arr.shift();
                    if (!employees[name]) {
                        console.log(`Assignee ${name} does not exist on the board!`)
                    } else {
                        let task = tasks[taskId];
                        task.title = title;
                        task.status = status;
                        task.estimatedPoints = estimatedPoints;
                        employees[name].push(taskId);
                    }
                }
            case 'Change Status':
                return function (arr) {
                    let name = arr.shift();
                    let taskId = arr.shift();
                    let newStatus = arr.shift();
                    if (!employees[name]) {
                        console.log(`Assignee ${name} does not exist on the board!`)
                    } else if (!employees[name].includes(taskId)) {
                        console.log(`Task with ID ${taskId} does not exist for ${name}!`)
                    } else {
                        tasks[taskId].status = newStatus;
                    }
                }
            case 'Remove Task':
                return function (arr) {
                    let name = arr.shift();
                    let index = Number(arr.shift());
                    let employeeTasks = employees[name];
                    if (employeeTasks && employeeTasks[index]) {
                        let items = employees[name];
                        items.slice(0, index).concat(items.slice(index + 1, items.length));
                    } else if (!employeeTasks && employeeTasks[index]) {
                        console.log(`Assignee ${name} does not exist on the board!`);
                    } else {
                        console.log(`Index is out of range!`);
                    }
                }
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