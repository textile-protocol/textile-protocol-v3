import { expect } from 'chai'
import { ethers } from 'hardhat'

// Vendored UniswapX v2.1.0 LimitOrderReactor. This proves the vendored,
// pre-audited reactor compiles at 0.8.30 and deploys with the expected
// constructor wiring. The native-fee executeBatch fill path is exercised by
// SellFirstFeeController.test.ts.
const CANONICAL_PERMIT2 = '0x000000000022D473030F116dDEE9F6B43aC78BA3'

describe('LimitOrderReactor (vendored UniswapX v2.1.0)', () => {
  it('deploys and wires permit2 + protocol-fee owner', async () => {
    const [owner] = await ethers.getSigners()
    const ownerAddr = await owner.getAddress()

    const Reactor = await ethers.getContractFactory('LimitOrderReactor')
    const reactor = await Reactor.deploy(CANONICAL_PERMIT2, ownerAddr)
    await reactor.waitForDeployment()

    expect(await reactor.permit2()).to.equal(CANONICAL_PERMIT2)
    expect(await reactor.owner()).to.equal(ownerAddr)
    // No protocol fee until the owner sets a controller.
    expect(await reactor.feeController()).to.equal(ethers.ZeroAddress)
  })
})
