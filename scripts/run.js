const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const bookContractFactory = await hre.ethers.getContractFactory("BookPortal");
    const bookContract = await bookContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
    });
    await bookContract.deployed();

    console.log("Contract deployed to :", bookContract.address);
    console.log("Contract deployed by :", owner.address);

    let contractBalance = await hre.ethers.provider.getBalance(bookContract.address);
    console.log("Contract Balance ", hre.ethers.utils.formatEther(contractBalance));

    let bookCount;
    bookCount = await bookContract.getTotalBooks();

    let bookTxn = await bookContract.addBook("Fault in our stars");
    await bookTxn.wait();

    bookTxn = await bookContract.addBook("Fault in our stars");
    await bookTxn.wait();

    contractBalance = await hre.ethers.provider.getBalance(bookContract.address);
    console.log("Contract Balance ", hre.ethers.utils.formatEther(contractBalance));

    bookCount = await bookContract.getTotalBooks();

    bookTxn = await bookContract.connect(randomPerson).addBook("The Alchemist");
    await bookTxn.wait();

    bookCount = await bookContract.getTotalBooks();
    console.log("Book count : ", bookCount);
    let books = await bookContract.getAllBooks();
    console.log("All Books: ", books);
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