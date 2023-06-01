import readline from "readline";
import { ElevatorController, Elevator } from "./index";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const initCLI = async () => {
  return new Promise((resolve, reject) => {
    rl.question("Please enter the floor you are requesting an elevator from: ", (answer) => {
      resolve(parseInt(answer));
    });
  });
};

const main = async () => {
  // Create new elevator instances, taking the floor number, people count and direction as arguments
  const elevator1 = new Elevator(1, 5, "up");
  const elevator2 = new Elevator(2, 6, "idle");
  const elevator3 = new Elevator(3, 2, "idle");

  // Initialise the Elevator Controller and push the newlu created elevators to it
  const controller = new ElevatorController(10);
  controller.elevators.push(elevator1, elevator2, elevator3);


  const answer = (await initCLI()) as any;


  console.log(controller.requestElevator(answer))
};

main();
