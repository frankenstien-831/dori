pragma solidity 0.5.6;

import 'openzeppelin-eth/contracts/ownership/Ownable.sol';

contract EarlyOwner is Ownable {
    function initialize(
        address _owner
    )
        public
        initializer
    {
        Ownable.initialize(_owner);
    }
}
