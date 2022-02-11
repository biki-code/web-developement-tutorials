import React from "react";
import ReactDOM from "react-dom";

const Header = ({ title }) => {
	return (
		<>
			<h1>{title}</h1>
		</>
	);
};

const Contents = ({ contents }) => {
	return (
		<>
			{contents.map((content) => (
				<Entry key={content.phone} content={content} />
			))}
		</>
	);
};

const Entry = ({ content }) => {
  const {name, phone} = content
	return (
		<>
			<p>
				{name} {phone}
			</p>
		</>
	);
};

const App = () => {
	const title = "Superadvanced web phonebook app";
	const contents = [
		{
			name: "John Doe",
			phone: "358401234567",
		},
		{
			name: "Jane Doe",
			phone: "44551234567",
		},
		{
			name: "Foo bar",
			phone: "000",
		},
	];

	return (
		<div>
			<Header title={title} />
			<Contents contents={contents} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
