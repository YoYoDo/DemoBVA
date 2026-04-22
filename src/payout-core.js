/* eslint-disable no-undef */
(function initPayoutCore(root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
    return;
  }
  root.PayoutCore = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function createPayoutCore() {
  const FACTOR_A = 0.042;
  const FACTOR_B = 0.036;

  function calculatePayout(premium, feeRate, nav, costExRate, currentExRate) {
    const netPremiumTwd = premium * (1 - feeRate);
    const costPerUnitTwd = nav * costExRate;
    const units = costPerUnitTwd > 0 ? netPremiumTwd / costPerUnitTwd : 0;

    const monthlyTwdA = units * FACTOR_A * currentExRate;
    const monthlyTwdB = units * FACTOR_B * currentExRate;

    return {
      units,
      netPremiumTwd,
      costPerUnitTwd,
      scenarioA: {
        monthlyTwd: monthlyTwdA,
        yearlyTwd: monthlyTwdA * 12,
        factor: FACTOR_A,
      },
      scenarioB: {
        monthlyTwd: monthlyTwdB,
        yearlyTwd: monthlyTwdB * 12,
        factor: FACTOR_B,
      },
    };
  }

  return {
    FACTOR_A,
    FACTOR_B,
    calculatePayout,
  };
});
