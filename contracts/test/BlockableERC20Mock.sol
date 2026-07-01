// SPDX-License-Identifier: BUSL-1.1
// Copyright (c) 2026 Textile, Inc.
pragma solidity 0.8.30;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @notice Test-only ERC20 with configurable decimals and a simple blocklist.
 */
contract BlockableERC20Mock is ERC20 {
  uint8 private immutable _decimals;
  mapping(address => bool) public blocked;

  constructor(string memory name_, string memory symbol_, uint8 decimals_) ERC20(name_, symbol_) {
    _decimals = decimals_;
  }

  function decimals() public view virtual override returns (uint8) {
    return _decimals;
  }

  function mint(address to, uint256 amount) external {
    _mint(to, amount);
  }

  function setBlocked(address account, bool value) external {
    blocked[account] = value;
  }

  function _update(address from, address to, uint256 value) internal virtual override {
    require(!blocked[from] && !blocked[to], "blocked");
    super._update(from, to, value);
  }
}
