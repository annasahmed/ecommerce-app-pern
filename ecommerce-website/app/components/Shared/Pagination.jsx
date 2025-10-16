"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
	currentPage = 1,
	totalPages = 10,
	onPageChange = () => {},
}) {
	const pages = [];

	// Generate visible page numbers (smart pagination)
	const start = Math.max(1, currentPage - 2);
	const end = Math.min(totalPages, currentPage + 2);
	for (let i = start; i <= end; i++) {
		pages.push(i);
	}

	return (
		<div className="flex items-center justify-center mt-6 gap-2">
			{/* Previous Button */}
			<button
				onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className={`flex items-center justify-center w-9 h-9 rounded-md border 
          ${
						currentPage === 1
							? "opacity-40 cursor-not-allowed"
							: "hover:bg-muted/10"
					}`}>
				<ChevronLeft size={18} />
			</button>

			{/* First page (if not visible) */}
			{start > 1 && (
				<>
					<button
						onClick={() => onPageChange(1)}
						className={`w-9 h-9 text-sm rounded-md border hover:bg-muted/10 ${
							currentPage === 1 ? "bg-primary text-light border-primary" : ""
						}`}>
						1
					</button>
					{start > 2 && <span className="text-muted text-sm">...</span>}
				</>
			)}

			{/* Page numbers */}
			{pages.map((page) => (
				<button
					key={page}
					onClick={() => onPageChange(page)}
					className={`w-9 h-9 text-sm rounded-md border 
            ${
							page === currentPage
								? "bg-primary text-light border-primary"
								: "hover:bg-muted/10"
						}`}>
					{page}
				</button>
			))}

			{/* Last page (if not visible) */}
			{end < totalPages && (
				<>
					{end < totalPages - 1 && (
						<span className="text-muted text-sm">...</span>
					)}
					<button
						onClick={() => onPageChange(totalPages)}
						className={`w-9 h-9 text-sm rounded-md border hover:bg-nuted ${
							currentPage === totalPages
								? "bg-primary text-light border-primary"
								: ""
						}`}>
						{totalPages}
					</button>
				</>
			)}

			{/* Next Button */}
			<button
				onClick={() =>
					currentPage < totalPages && onPageChange(currentPage + 1)
				}
				disabled={currentPage === totalPages}
				className={`flex items-center justify-center w-9 h-9 rounded-md border 
          ${
						currentPage === totalPages
							? "opacity-40 cursor-not-allowed"
							: "hover:bg-muted/10"
					}`}>
				<ChevronRight size={18} />
			</button>
		</div>
	);
}
