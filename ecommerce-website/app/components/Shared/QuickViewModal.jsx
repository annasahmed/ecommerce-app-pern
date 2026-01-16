"use client";

import { Fragment } from "react";
import {
	Dialog,
	DialogPanel,
	DialogTitle,
	Transition,
	TransitionChild,
} from "@headlessui/react";
import { X } from "lucide-react";
import { useFetchReactQuery } from "@/app/hooks/useFetchReactQuery";
import ProductServices from "@/app/services/ProductServices";
import { useStore } from "@/app/providers/StoreProvider";

export default function QuickViewModal({ isOpen, onClose, slug }) {
	const store = useStore();
	let { data: product, isLoading } = useFetchReactQuery(
		() => ProductServices.getProductBySlug(store.themeName, slug),
		["productDetails", store.themeName, slug],
		{ enabled: !!store.themeName },
	);
	if (!product) return null;

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={onClose}>
				{/* Backdrop */}
				<TransitionChild
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0">
					<div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
				</TransitionChild>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4">
						<TransitionChild
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95">
							<DialogPanel className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">
								{/* Header */}
								<div className="flex items-center justify-between mb-4">
									<DialogTitle className="text-lg font-semibold">
										{product.title}
									</DialogTitle>
									<button
										onClick={onClose}
										className="rounded-full p-1 hover:bg-gray-100">
										<X size={20} />
									</button>
								</div>

								{/* Content */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{/* Image */}
									<div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
										<img
											src={product.image}
											alt={product.title}
											className="h-full w-full object-cover"
										/>
									</div>

									{/* Details */}
									<div>
										<p className="text-sm text-gray-500 mb-2">
											{product.category}
										</p>

										<p className="text-xl font-bold mb-3">
											Rs. {product.price}
										</p>

										<p className="text-gray-600 text-sm mb-4">
											{product.description}
										</p>

										<button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
											Add to Cart
										</button>
									</div>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
