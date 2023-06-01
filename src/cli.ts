import readline from "readline";
import { ElevatorController, Elevator } from "./index";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const initCLI = async () => {
  return new Promise((resolve, reject) => {
    rl.question("enter floor: ", (answer) => {
      resolve(parseInt(answer));
    });
  });
};

const main = async () => {
  const elevator1 = new Elevator(1, 5, "up");
  const elevator2 = new Elevator(2, 6, "idle");
  const elevator3 = new Elevator(3, 2, "down");
  const controller = new ElevatorController(10);
  controller.elevators.push(elevator1, elevator2, elevator3);


  const answer = (await initCLI()) as any;


  console.log(controller.requestElevator(answer))
};

main();
