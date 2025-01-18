const express = require('express');
const router = express.Router();
const { ethers } = require('ethers');
require('dotenv').config()

const contractAddress = process.env.CONTRACT_ADDRESS // Replace with deployed contract address
const contractABI = require(process.env.CONTRACT_ABI_PATH).abi;

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL); // Replace with your Infura RPC URL

const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);

const todoApp = new ethers.Contract(contractAddress, contractABI, wallet);


// Get all tasks (fetch tasks from blockchain)
router.get('/tasks', async (req, res) => {
  try {
    // Access taskCount as a property
    const taskCount = await todoApp.taskCount(); // Call the smart contract to get the total task count
    // Fetch tasks from the blockchain
    let tasks = [];
    for (let i = 1; i <= taskCount; i++) {
      const task = await todoApp.getTask(i); // Fetch task by ID
      tasks.push({
        id: task[0].toString(),     // Convert BigNumber to string
        description: task[1],       // Task description
        completed: task[2],         // Completion status
      });
    }

    // Return the list of tasks
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    res.status(500).json({ message: "Error fetching tasks from blockchain" });
  }
});


// Create a new task (write to blockchain)
router.post('/tasks', async (req, res) => {
  const { description } = req.body;
  try {
    const tx = await todoApp.createTask(description); // Call the smart contract to create a new task
    await tx.wait(); // Wait for the transaction to be mined
    res.status(201).json({ message: 'Task created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating task on blockchain" });
  }
});

// Mark task as completed (update blockchain)
router.put('/tasks/:id', async (req, res) => {
  const taskId = parseInt(req.params.id);
  try {
    const tx = await todoApp.completeTask(taskId); // Call smart contract to mark task as complete
    await tx.wait(); // Wait for transaction to be mined
    res.json({ message: `Task ${taskId} marked as completed` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error completing task on blockchain" });
  }
});

// Delete a task (this will remove the task from blockchain by resetting task state)
router.delete('/tasks/:id', async (req, res) => {
  const taskId = parseInt(req.params.id);
  try {
    // Since Solidity contracts don’t support deleting state variables directly,
    // you could implement a workaround by setting the task description to empty or marking it as removed.
    const tx = await todoApp.removeTask(taskId); // Example function to "delete" or mark as removed
    await tx.wait(); // Wait for transaction to be mined
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting task from blockchain" });
  }
});

module.exports = router;
