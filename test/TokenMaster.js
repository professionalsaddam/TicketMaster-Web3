const { expect } = require("chai");
const { ethers } = require("hardhat");



let NAME = "TokenMaster";
let SYMBOL = "TK";

const OCCASION_NAME = "ETH Texas"
const OCCASION_COST = ethers.utils.parseUnits('1', 'ether')
const OCCASION_MAX_TICKETS = 100
const OCCASION_DATE = "Apr 27"
const OCCASION_TIME = "10:00AM CST"
const OCCASION_LOCATION = "Austin, Texas"


    describe("TokenMaster", () => {
        let tokenMaster;

        let deployer,user;
        

        describe("Deployment",() => {

        beforeEach(async () => {


            [deployer,user] = await ethers.getSigners();
            
            const TokenMaster = await ethers.getContractFactory("TokenMaster");
            tokenMaster = await TokenMaster.deploy(NAME,SYMBOL);

            const transaction = await tokenMaster.connect(deployer).list(
                OCCASION_NAME,
                OCCASION_COST,
                OCCASION_MAX_TICKETS,
                OCCASION_DATE,
                OCCASION_TIME,
                OCCASION_LOCATION
            )
        
            await transaction.wait()


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

    describe("Occasions", () => {
        it('Returns occasions attributes', async () => {
          const occasion = await tokenMaster.getOccasion(1)
          expect(occasion.id).to.be.equal(1)
          expect(occasion.name).to.be.equal(OCCASION_NAME)
          expect(occasion.cost).to.be.equal(OCCASION_COST)
          expect(occasion.tickets).to.be.equal(OCCASION_MAX_TICKETS)
          expect(occasion.date).to.be.equal(OCCASION_DATE)
          expect(occasion.time).to.be.equal(OCCASION_TIME)
          expect(occasion.location).to.be.equal(OCCASION_LOCATION)
        })
    
        it('Updates occasions count', async () => {
          const totalOccasions = await tokenMaster.totalOccasions()
          expect(totalOccasions).to.be.equal(1)
        })
    })

})
