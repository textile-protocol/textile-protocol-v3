# Vendored code — DO NOT MODIFY LOGIC

This tree is **verbatim, pre-audited** third-party code, copied so the filler
network's green leg (direct sale) settles through UniswapX's audited
`LimitOrderReactor` + Permit2 rather than new Textile cryptography. Keeping it
unmodified is the whole point: any logic change pulls it back into audit scope.

## Pinned sources

| Dependency | Repo | Commit | Tag |
|---|---|---|---|
| UniswapX | github.com/Uniswap/UniswapX | `df1dbfe2439c3c648ab5e3089953780ab7fc40b7` | `v2.1.0` |
| Permit2 | github.com/Uniswap/permit2 | `576f549a7351814f112edcc42f3f8472d1712673` | (UniswapX v2.1.0 submodule) |
| solmate | github.com/transmissions11/solmate | `27545b09183a9852f7655535d3c56f1ca46f018d` | (UniswapX v2.1.0 submodule) |

UniswapX's two OpenZeppelin imports (`ReentrancyGuard`, `SafeCast`) point at the
repo's existing **OZ v5** (`@openzeppelin/contracts/...`) rather than being
vendored. Both are standard, audited OZ utilities, and the API UniswapX uses
(`nonReentrant`, `SafeCast.toUint256`) is unchanged from v4 to v5 — so this keeps
a single OZ version in the repo with no behavioral difference.

## What's here (LimitOrderReactor closure only — 22 files)

- `uniswapx/` — `reactors/{LimitOrderReactor,BaseReactor}`, `base/{ProtocolFees,ReactorEvents,ReactorStructs}`, `interfaces/{IReactor,IReactorCallback,IValidationCallback,IProtocolFeeController}`, `lib/{LimitOrderLib,OrderInfoLib,ResolvedOrderLib,Permit2Lib,CurrencyLibrary}`
- `permit2/src/interfaces/` — `IPermit2`, `ISignatureTransfer`, `IAllowanceTransfer`, `IEIP712`
- `solmate/src/` — `utils/{SafeTransferLib,FixedPointMathLib}`, `tokens/ERC20`, `auth/Owned`

`ReentrancyGuard` + `SafeCast` are *not* vendored — they resolve to the repo's
OZ v5 (see note above).

## The only modification

Import **paths** in the `uniswapx/` files were rewritten from Foundry-remapped
prefixes to relative paths so both Hardhat (node_modules + relative only) and
Foundry resolve them with no remapping:

- `solmate/...` → `../../solmate/...`
- `permit2/...` → `../../permit2/...`
- `openzeppelin-contracts/...` → `@openzeppelin/contracts/...` (the repo's OZ v5)

No Solidity logic was changed. To re-verify, re-fetch the pinned commits and
diff (ignoring the import-prefix rewrites above).

## Upgrading

Bump the pinned commits, re-copy the closure, re-apply only the import-prefix
rewrites, recompile, and re-run the parity + behavior tests. Never hand-edit.
