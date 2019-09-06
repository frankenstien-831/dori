pragma solidity 0.5.6;

import 'openzeppelin-eth/contracts/ownership/Ownable.sol';

contract Test is Ownable {
    function initialize()
        external
        initializer
    {
        Ownable.initialize(msg.sender);
    }
}
