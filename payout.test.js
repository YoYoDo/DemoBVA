/**
 * Unit Tests for Investment Payout Calculation (Dual Scenario)
 * 
 * To run this file:
 * 1. Initialize npm: `npm init -y`
 * 2. Install Jest: `npm install jest`
 * 3. Run: `npx jest payout.test.js`
 */
const FACTOR_A = 0.042;
const FACTOR_B = 0.036;

// Refactored to return both scenarios as per the updated specification.
const calculatePayout = (premium, feeRate, nav, costExRate, currentExRate) => {
    // TODO: Use a library like decimal.js for financial calculations to avoid IEEE 754 errors
    // 1. Actual Units
    const netPremiumTwd = premium * (1 - feeRate);
    const costPerUnitTwd = nav * costExRate;
    const units = costPerUnitTwd > 0 ? netPremiumTwd / costPerUnitTwd : 0;

    // 2. Calculate for both scenarios simultaneously
    const monthlyTwdA = units * FACTOR_A * currentExRate;
    const monthlyTwdB = units * FACTOR_B * currentExRate;

    return {
        units,
        scenarioA: {
            monthlyTwd: monthlyTwdA,
            yearlyTwd: monthlyTwdA * 12,
        },
        scenarioB: {
            monthlyTwd: monthlyTwdB,
            yearlyTwd: monthlyTwdB * 12,
        },
    };
};

describe('Investment Payout Calculation (Dual Scenario)', () => {
    test('should return correct monthly and yearly TWD payouts for both scenarios', () => {
        // Using validation data from spec: current exchange rate 30.
        const units = 3179.365;
        const currentExRate = 30;

        // Mocking inputs to produce the desired unit count.
        const result = calculatePayout(units, 0, 1, 1, currentExRate);

        // Verify Scenario A (>=9): Expected TWD 4,006 monthly
        expect(Math.round(result.scenarioA.monthlyTwd)).toBe(4006);
        expect(Math.round(result.scenarioA.yearlyTwd)).toBe(48072); // 4006 * 12
        // Verify Scenario B (<9):
        // Calculation: 3179.365 * 0.036 * 30 = 3433.7142, which rounds to 3434.
        expect(Math.round(result.scenarioB.monthlyTwd)).toBe(3434);
        expect(Math.round(result.scenarioB.yearlyTwd)).toBe(41208); // 3434 * 12
    });
});
