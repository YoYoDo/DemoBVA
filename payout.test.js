const { FACTOR_A, FACTOR_B, calculatePayout } = require("./src/payout-core");

describe('calculatePayout core model', () => {
    test('returns both scenarios with stable factors', () => {
        const result = calculatePayout(1000000, 0.028, 10, 31.5, 31.5);

        expect(result.scenarioA.factor).toBe(0.042);
        expect(result.scenarioB.factor).toBe(0.036);
        expect(result.scenarioA.monthlyTwd).toBeGreaterThan(result.scenarioB.monthlyTwd);
    });

    test('matches validation sample (units 3,179.365, currentExRate=30)', () => {
        const units = 3179.365;
        const result = calculatePayout(units, 0, 1, 1, 30);

        expect(Math.round(result.scenarioA.monthlyTwd)).toBe(4006);
        expect(Math.round(result.scenarioA.yearlyTwd)).toBe(48072);
        expect(Math.round(result.scenarioB.monthlyTwd)).toBe(3434);
        expect(Math.round(result.scenarioB.yearlyTwd)).toBe(41205);
    });

    test('protects against divide-by-zero when nav or costExRate invalid', () => {
        const navZero = calculatePayout(1000000, 0.028, 0, 31.5, 31.5);
        const exRateZero = calculatePayout(1000000, 0.028, 10, 0, 31.5);

        expect(navZero.units).toBe(0);
        expect(exRateZero.units).toBe(0);
        expect(navZero.scenarioA.monthlyTwd).toBe(0);
        expect(exRateZero.scenarioB.yearlyTwd).toBe(0);
    });

    test('keeps floating precision in calculation and rounds at display stage', () => {
        const result = calculatePayout(500000, 0.027, 8.5, 30.2, 31.37);

        expect(Number.isInteger(result.scenarioA.monthlyTwd)).toBe(false);
        expect(Math.round(result.scenarioA.monthlyTwd)).toBeGreaterThan(0);
    });
});
