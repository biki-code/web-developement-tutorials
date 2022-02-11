var xhttp = new XMLHttpRequest();

function send_request(url, callback) {
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			const data = JSON.parse(this.responseText);
			const { fact, length } = data;
			callback(`Today's cat fact is "${fact}" with a length of ${length}`);
			console.log(data);
		}
	};

	xhttp.open("GET", url, true);
	xhttp.send();
}

send_request("https://catfact.ninja/fact", process_xhr);
var something = 1 + 2;
console.log(something);

function process_xhr(value) {
	document.getElementById("example").innerHTML = value;
	alert("I am redirecting now");
	location.href = "redirected_to.html";
}

// Destructuring
const test_data = {
	fact: "A queen (female cat) can begin mating when she is between 5 and 9 months old.",
	length: 77,
};

const { fact, length } = test_data; // is equivalent to bottom

const test_fact = test_data.fact;
const test_length = test_data.length;

const another_data = ["first", "second"];
const [first, second] = another_data;
