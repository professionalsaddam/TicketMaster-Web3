const { expect } = require("chai")

describe("TokenMaster", () => {
    let tokenMaster;

    let NAME = "TokenMaster";
    let SYMBOL = "TK";

    describe("Deployment",() => {

    beforeEach(async () => {
        
        const TokenMaster = await ethers.getContractFactory("TokenMaster");
        tokenMaster = await TokenMaster.deploy(NAME,SYMBOL);



    })

    it("Setes the name", async () => {
        let name = await tokenMaster.name();
        expect(name).to.equal(NAME)
    })

    it("Setes the symbol", async () => {
        let symbol = await tokenMaster.symbol();
        expect(symbol).to.equal(SYMBOL)
    })

})

})
