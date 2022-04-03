const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy('fresh');
    await domainContract.deployed();

    console.log("Contract deployed to: ", domainContract.address);

    let txn = await domainContract.register("fantasy", {value: hre.ethers.utils.parseEther('0.1')});
    await txn.wait();
    console.log("Minted domain fantasy.fresh");

    txn =  await domainContract.setRecord("fantasy", "This is a cool domain on polygon");
    await txn.wait();
    console.log("Set record for fantasy.fresh");

    const address = await domainContract.getAddress("fantasy");
    console.log("Owner of domain 'fantasy': ", address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract Balance: ", hre.ethers.utils.formatEther(balance));
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();