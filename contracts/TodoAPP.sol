// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract TodoApp {
    struct Task {
        uint id;
        string description;
        bool completed;
    }

    mapping(uint => Task) public tasks;
    uint public taskCount;

    uint public unlockTime;  // Declare a public unlockTime variable

    event TaskCreated(uint id, string description);
    event TaskCompleted(uint id);
    event UnlockTimeUpdated(uint unlockTime);  // Event for updating unlock time

    // Constructor to initialize unlock time
    constructor(uint _unlockTime) {
        unlockTime = _unlockTime; // Initialize unlockTime when contract is deployed
        emit UnlockTimeUpdated(_unlockTime);  // Emit an event when the unlock time is set
    }

    // Function to update unlock time
    function setUnlockTime(uint _unlockTime) public {
        unlockTime = _unlockTime;
        emit UnlockTimeUpdated(_unlockTime);
    }

    // Create a new task
    function createTask(string memory _description) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _description, false);
        emit TaskCreated(taskCount, _description);
    }

    // Mark a task as completed
    function completeTask(uint _taskId) public {
        require(_taskId > 0 && _taskId <= taskCount, "Task not found");
        Task storage task = tasks[_taskId];
        task.completed = true;
        emit TaskCompleted(_taskId);
    }

    // Get task details
    function getTask(uint _taskId) public view returns (uint, string memory, bool) {
        require(_taskId > 0 && _taskId <= taskCount, "Task not found");
        Task memory task = tasks[_taskId];
        return (task.id, task.description, task.completed);
    }

    // Adding a removeTask function in your TodoApp contract
    function removeTask(uint _taskId) public {
        require(_taskId > 0 && _taskId <= taskCount, "Task not found");
        Task storage task = tasks[_taskId];
        task.description = ""; // Or mark task as deleted
        task.completed = true; // Mark as completed to indicate "removed"
        emit TaskCompleted(_taskId);
    }

    // Get unlock time
    function getUnlockTime() public view returns (uint) {
        return unlockTime;  // Return the unlockTime
    }
}
