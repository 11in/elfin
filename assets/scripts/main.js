// do stuff
const main = async () => {
    console.log('Fetching data, awaiting response...');
    const response = await fetch('https://httpbin.org/user-agent');
    const responseText = await response.text();

    console.log('Response:', responseText);
};

main();