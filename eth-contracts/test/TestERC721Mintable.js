var CustomERC721Token = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const totalSupplyAccount1=5;
    const totalSupplyAccount2=10;
    const totalSupply=totalSupplyAccount1+totalSupplyAccount2;
    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await CustomERC721Token.new({from: account_one});

            // TODO: mint multiple tokens
            for(var i=0;i< totalSupplyAccount1;i++){
                await this.contract.mint(account_one,i,{from:account_one});
            }
            for(var i=totalSupplyAccount1;i<totalSupply;i++){
                await this.contract.mint(account_two,i,{from:account_one});
            }
        })

        it('should return total supply', async function () { 
            let result=await this.contract.totalSupply.call();
            assert.equal(totalSupply,result);
        })

        it('should get token balance', async function () { 
            let result=await this.contract.balanceOf(account_one);
            assert.equal(totalSupplyAccount1,result);
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let result=await this.contract.tokenURI(1);
            assert.equal(result,"https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1");
        })

        it('should transfer token from one owner to another', async function () { 
           await this.contract.transferFrom(account_two,account_one,(totalSupply-1),{from:account_two});
           let result=await this.contract.ownerOf((totalSupply-1));
           assert.equal(account_one,result);

           result=await this.contract.balanceOf(account_one);
           assert.equal(totalSupplyAccount1+1,result,"account 1 gains 1 token");
           result=await this.contract.balanceOf(account_two);
           assert.equal(totalSupplyAccount2-1,result,"account 2 looses 1 token");

          
           result=await this.contract.totalSupply.call();
           assert.equal(totalSupply,result,"total supply stays same");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await CustomERC721Token.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
           try{
            await this.contract.mint(account_two,1,{from:account_two});
           }catch(err){
              assert.equal(err.reason,"caller must be contract owner");
           } 
        });

        it('should return contract owner', async function () { 
            let result=await this.contract.owner();
            assert.equal(account_one,result);
        })

    });
})