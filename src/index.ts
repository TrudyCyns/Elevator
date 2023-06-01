export class Elevator {
  // public status: "moving" | "idle" = "idle";
  public currentFloor = 1;
  // private floors: number[] = [];
  // private direction: "up" | "down" | "idle" = "idle";
  // private peopleOnboard: number = 0;
  public isMoving: boolean = false;
  public waitingPeople: Floor | undefined;
  public weightLimit: number = 5;

  constructor(
    public floor: number,
    public peopleCount: number,
    // public status: "moving" | "idle",
    public direction: "up" | "down" | "idle"
  ) {
    this.currentFloor = floor;
    this.peopleCount = peopleCount;
    this.isMoving = false;
    // this.status = status;
    this.direction = direction;
  }
}

class Floor {
  constructor(public floorNumber: number, public waitingPeople: number) {
    this.floorNumber = floorNumber;
    this.waitingPeople = waitingPeople;
  }

  public handleRequest(controller: ElevatorController) {
    controller.requestElevator(this.floorNumber);
  }
}

export class ElevatorController {
  public elevators: Elevator[] = [];
  public floors: Floor[] = [];

  constructor(public numberOfFloors: number) {
    for (let i = 0; i < numberOfFloors; i++) {
      this.floors.push(new Floor(i, 0));
    }
  }

  public requestElevator(floorNumber: number): any {
    if (floorNumber > this.numberOfFloors) {
      console.log("Floor does not exist");
      return;
    }

    const waitingPeople = this.updateWaitingPeople(floorNumber);
    const elevator = this.findnearestAvaibleElevator(floorNumber);

    if (elevator) {
      if (elevator.peopleCount > elevator.weightLimit) {
        console.log("This elevator is full!");
        return false;
      }
      const elevatorFloor = elevator.floor;
      if (elevatorFloor > floorNumber) {
        elevator.direction = "down";
        elevator.isMoving = true;
        elevator.waitingPeople = waitingPeople;
        return elevator;
      } else if (elevatorFloor < floorNumber) {
        elevator.direction = "up";
        elevator.isMoving = true;
        elevator.waitingPeople = waitingPeople;
        return elevator;
      } else {
        elevator.direction = "idle";
        elevator.isMoving = true;
      }
    } else {
      console.log("No avaiable elevator");
      return false;
    }
  }

  public findnearestAvaibleElevator(floorNumber: number) {
    let nearestElevator: Elevator | null = null;
    let shortestDistance: number = Infinity;

    for (const elevator of this.elevators) {
      if (elevator.direction === "idle") {
        const distance = Math.abs(elevator.currentFloor - floorNumber);

        if (distance < shortestDistance) {
          shortestDistance = distance;
          nearestElevator = elevator;
        }
      }
    }
    return nearestElevator;
  }

  public updateWaitingPeople(floorNumber: number) {
    const floor = this.floors.find((f) => f.floorNumber === floorNumber);

    if (floor) {
      floor.waitingPeople++;
    }

    return floor;
  }
}

const elevator1 = new Elevator(1, 5, "up");
const elevator2 = new Elevator(2, 6, "idle");
const elevator3 = new Elevator(3, 2, "down");

const elevatorController = new ElevatorController(7);

// elevatorController.updateWaitingPeople(1);

elevatorController.elevators.push(elevator1, elevator2, elevator3);
