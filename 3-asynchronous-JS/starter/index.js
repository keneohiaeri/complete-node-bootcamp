const fs = require("fs");
const superagent = require("superagent");

const readFilePro = (file) => {
	return new Promise((resolve, reject) => {
		fs.readFile(file, (err, data) => {
			if (err) reject("I could not find the file");
			resolve(data);
		});
	});
};

const writeFilePro = (file, data) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(file, data, (err) => {
			if (err) reject("Could not write file");
			resolve("success");
		});
	});
};

const getDogPic = async () => {
	try {
		const data = await readFilePro(`${__dirname}/dog.txt`);
		console.log(`Breed: ${data}`);

		const res = await superagent.get(
			`https://dog.ceo/api/breed/${data}/images/random`
		);
		console.log(res.body.message);

		await writeFilePro("dog-image.txt", res.body.message);
		console.log("Random image saved to file");
	} catch (err) {
		console.log(err);
	}
	return "2: Pic Ready!";
};

(async () => {
	try {
		console.log("1: Will get dog pic");
		const x = await getDogPic();
		console.log(x);
		console.log("3:Done getting dog pic");
	} catch (err) {
		console.log("ERROR!");
	}
})();
/*
readFilePro(`${__dirname}/dog.txt`)
	.then((data) => {
		console.log(`Breed: ${data}`);
		return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
	})
	.then((res) => {
		console.log(res.body.message);
		return writeFilePro("dog-image.txt", res.body.message);
	})
	.then(() => {
		console.log("Random image saved to file");
	})
	.catch((err) => {
		console.log(err.message);
	});
*/
