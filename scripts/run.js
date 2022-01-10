const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const bookContractFactory = await hre.ethers.getContractFactory("BookPortal");
    const bookContract = await bookContractFactory.deploy();
    await bookContract.deployed();

    console.log("Contract deployed to :", bookContract.address);
    console.log("Contract deployed by :", owner.address);

    let bookCount;
    bookCount = await bookContract.getTotalBooks();

    let bookTxn = await bookContract.addBook();
    await bookTxn.wait();

    bookCount = await bookContract.getTotalBooks();

    bookTxn = await bookContract.connect(randomPerson).addBook();
    await bookTxn.wait();

    bookCount = await bookContract.getTotalBooks();
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

runMain();