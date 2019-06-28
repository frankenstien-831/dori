pragma solidity 0.5.6;

import 'zos-lib/contracts/Initializable.sol';

contract Upgrade is Initializable {
    uint test;
    
    function initialize()
        external
        initializer
    {
        test = 1;
    }
}
