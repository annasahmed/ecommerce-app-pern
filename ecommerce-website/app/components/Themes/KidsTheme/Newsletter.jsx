import { useState } from "react";

export default function Newsletter() {
	const [email, setEmail] = useState("");
	const [agree, setAgree] = useState(false);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!agree) {
			setMessage("You must agree to the terms and conditions.");
			return;
		}

		if (!email) {
			setMessage("Please enter a valid email address.");
			return;
		}

		setLoading(true);
		setMessage("");
		setEmail("");
		setAgree(false);
		try {
			// Replace this with your actual API endpoint
			setMessage("Thank you for subscribing!");
			const res = await fetch("/api/subscribe", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});

			// if (res.ok) {
			// 	setEmail("");
			// 	setAgree(false);
			// } else {
			// 	setMessage("Something went wrong. Please try again.");
			// }
		} catch (error) {
			console.error(error);
			setMessage("Network error. Please try again.");
		}

		setLoading(false);
	};

	return (
		<section className="bg-secondary section-layout">
			<div className="container-layout flex items-start justify-between gap-32 max-md:flex-col max-md:gap-8">
				<div className="text-light flex-1">
					<h2 className="font-semibold h2">Be the First to Know</h2>
					<p className="p4">
						Get all the latest information on Events, Sales and Offers. Sign up
						for newsletter today.
					</p>
				</div>

				<form onSubmit={handleSubmit} className="flex-1 pr-10 pt-2">
					<div className="flex">
						<input
							type="email"
							placeholder="Your email address"
							className="flex-1 w-full px-4 py-3 bg-light focus:outline-none"
							value={email}
							onChange={(e) => {
								setMessage("");
								setEmail(e.target.value);
							}}
						/>

						<button
							type="submit"
							disabled={loading}
							className="px-6 py-3 bg-primary/90 text-light hover:brightness-95 disabled:opacity-50">
							{loading ? "Submitting..." : "Subscribe"}
						</button>
					</div>

					<label className="flex items-center gap-2 mt-2 text-light p5 max-w-fit">
						<input
							type="checkbox"
							checked={agree}
							onChange={() => setAgree(!agree)}
							className="w-4 h-4"
						/>
						I agree with the terms and conditions.
					</label>

					{message && <p className="mt-1 p4 text-light">{message}</p>}
				</form>
			</div>
		</section>
	);
}
