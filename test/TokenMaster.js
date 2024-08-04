const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenMaster", () => {
    let tokenMaster;

    let deployer,user;

    let NAME = "TokenMaster";
    let SYMBOL = "TK";

    describe("Deployment",() => {

    beforeEach(async () => {


        [deployer,user] = await ethers.getSigners();
        
        const TokenMaster = await ethers.getContractFactory("TokenMaster");
        tokenMaster = await TokenMaster.deploy(NAME,SYMBOL);



    })

    it("Sete the name", async () => {
        let name = await tokenMaster.name();
        expect(name).to.equal(NAME)
    })

    it("Sets the symbol", async () => {
        let symbol = await tokenMaster.symbol();
        expect(symbol).to.equal(SYMBOL)
    })

    it("Sets the Owner", async () => {
        let owner = await tokenMaster.owner();
        expect(owner).to.equal(deployer.address);
    })

})

})
