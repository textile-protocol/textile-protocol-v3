// Coverage config scoped to Settlement v3 only.
module.exports = {
  skipFiles: [
    'v1-deprecated/',
    'v2-deprecated/',
    'v2.1/',
    'mocks/',
    'v3/mocks/',
  ],
  testfiles: [
    'test/v3/PushOracle/PushOracle.test.ts',
    'test/v3/PushOracle/PushOracle.DeviationBreaker.test.ts',
    'test/v3/PushOracle/PushOracle.CumulativeBound.test.ts',
    'test/v3/PushOracle/PushOracle.SandwichReject.test.ts',
    'test/v3/PushOracle/PushOracle.Freshness.test.ts',
    'test/v3/SettlementPool/SettlementPool.test.ts',
    'test/v3/SettlementPool/SettlementPool.Deposit.test.ts',
    'test/v3/SettlementPool/SettlementPool.Open.test.ts',
    'test/v3/SettlementPool/SettlementPool.Close.test.ts',
    'test/v3/SettlementPool/SettlementPool.CloseBatch.test.ts',
    'test/v3/SettlementPool/SettlementPool.Yield.test.ts',
    'test/v3/SettlementPool/SettlementPool.RefundDoS.test.ts',
    'test/v3/SettlementPool/SettlementPool.Sweep.test.ts',
    'test/v3/SettlementPool/SettlementPool.OverflowGuards.test.ts',
  ],
  configureYulOptimizer: true,
}
