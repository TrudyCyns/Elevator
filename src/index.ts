export class Elevator {
  public currentFloor = 1;
  public isMoving: boolean = false;
  public waitingPeople: Floor | undefined;
  public weightLimit: number = 5;

  constructor(
    public floor: number,
    public peopleCount: number,
    public direction: "up" | "down" | "idle"
  ) {
    this.currentFloor = floor;
    this.peopleCount = peopleCount;
    this.isMoving = false;
    this.direction = direction;
  }
}

class Floor {
  constructor(public floorNumber: number, public waitingPeople: number) {
    this.floorNumber = floorNumber;
    this.waitingPeople = waitingPeople;
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
/**
 * This method is used to request an elevator for a person at a certain floor. It checks for the elevator closest to the person and if it is full or not.
 * 
 * @param floorNumber - a number of the floor on which the person requesting the elevator is
 */
  public requestElevator(floorNumber: number): any {
    if (floorNumber > this.numberOfFloors) {
      console.log("Floor does not exist");
      return false;
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

  /**
   * This method finds the elevator closest to the person requesting it.
   * 
   * @param floorNumber - the number of the floor to check the closest elevator to it.
   * @returns the nearest elevator to the given floor number
   */
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

  /**
   * Updates the number of people waiting on a certain floor by 1 on each elevator requesr.
   */
  public updateWaitingPeople(floorNumber: number) {
    const floor = this.floors.find((f) => f.floorNumber === floorNumber);

    if (floor) {
      floor.waitingPeople++;
    }

    return floor;
  }
}
