pragma solidity 0.5.6;

import 'openzeppelin-eth/contracts/ownership/Ownable.sol';

contract Upgrade is Ownable {
    uint test;
    
    function initialize()
        external
        initializer
    {
        test = 1;
        Ownable.initialize(msg.sender);
    }
}
