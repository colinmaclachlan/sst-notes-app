import {expect, test} from "vitest";
import {calculateCost} from "../src/cost";

test("Low tier", () => {
    const storage = 10;
    const cost = 4000;
    const expectedCost = calculateCost(storage);
    expect(cost).toEqual(expectedCost);
});

test("Middle tier", () => {
    const storage = 100;
    const cost = 20000;
    const expectedCost = calculateCost(storage);
    expect(cost).toEqual(expectedCost); 
});

test("High tier", () => {
    const storage = 101;
    const cost = 10100;
    const expectedCost = calculateCost(storage);
    expect(cost).toEqual(expectedCost); 
});