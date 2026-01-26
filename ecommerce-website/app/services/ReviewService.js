import requests from "./httpServices";

const ReviewService = {
	myReviews: async () => {
		try {
			const data = await requests.get(`/review`);
			return data || [];
		} catch (err) {
			console.error("API error:", err);
		}
	},
	addReview: async (review = {}) => {
		try {
			const data = await requests.post(`/review`, {
				...review,
			});
			return data;
		} catch (err) {
			console.error("API error:", err);
		}
	},
};

export default ReviewService;
