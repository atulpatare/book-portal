const main = async () => {
    const [deplyer] = await hre.ethers.getSigners();
    const accountBalance = await deplyer.getBalance();

    console.log("Deplying contracts with account: ", deplyer.address);
    console.log("Account balance :", accountBalance.toString());

    const token = await hre.ethers.getContractFactory("BookPortal");
    const portal = await token.deploy({
        value: hre.ethers.utils.parseEther("0.01"),
    });
    await portal.deployed();

    console.log("BookPortal address : ", portal.address);
};

const runMain = async () => {
    try{
        await main();
        process.exit(0);
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
};

runMain();