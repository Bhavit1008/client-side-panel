import { Input } from "@angular/core";
import { GatePass } from "./GatePass";

export class GatePassEntries {

    id: string;
    gatepasses ?: GatePass[];

    constructor(id: string, gatepasses: GatePass[]){
        this.id = id;
        this.gatepasses = gatepasses
    }

}