import React, { useState } from "react";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationPrevious,
	PaginationNext,
} from "@/components/ui/pagination";
import Icon from "../../components/icon/icons";

import { IgniteTypes } from "@/app/api/common/add-ignite/route";

const IgniteListView = ({ ignites }: { ignites: any }) => {
	const [currentPage, setCurrentPage] = useState(1); // Current page
	const rowsPerPage = 8; // Number of rows per page

	// Calculate the data for the current page
	const paginatedData = ignites.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

	// Calculate total pages
	const totalPages = Math.ceil(ignites.length / rowsPerPage);

	const startItem = (currentPage - 1) * rowsPerPage + 1;
	const endItem = Math.min(currentPage * rowsPerPage, ignites.length);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<div className="overflow-x-auto w-full rounded-[10px] border border-divider">
			<table className="min-w-full bg-white">
				<thead className="bg-gray-7 border-b border-divider rounded-[10px] overflow-hidden">
					<tr>
						<th className="text-left p-[15px] text-body3 text-gray-3">Idea Name</th>
						<th className="text-left p-[15px] text-body3 text-gray-3">Associated Challenges</th>
						<th className="text-left p-[15px] text-body3 text-gray-3">Category</th>
						<th className="text-left p-[15px] text-body3 text-gray-3">Sector</th>
						<th className="text-left p-[15px] text-body3 text-gray-3">Submission Date</th>
					</tr>
				</thead>
				<tbody>
					{paginatedData.map((pilot: IgniteTypes, index: number) => (
						<tr
							key={index}
							className="border-b border-b-divider">
							<td className="px-[15px] py-[20px] text-body2 text-others-blackShade">{pilot.ideaName}</td>
							<td className="px-[15px] py-[20px] text-body2">{pilot.associatedChallenges}</td>
							<td className="px-[15px] py-[20px] text-body2 text-others-blackShade">{pilot.category}</td>
							<td className="px-[15px] py-[20px] text-body2 text-others-blackShade">{pilot.sector}</td>
							<td className="px-[15px] py-[20px] text-body2 text-others-blackShade">{pilot.submissionDate}</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className="flex justify-between items-center p-20">
				<p className="text-body2 font-light flex gap-5 items-center">
					Showing {startItem}-{endItem} of {ignites.length} <Icon name={"chevron-down"} />
				</p>
				<Pagination className="flex items-center gap-30">
					<PaginationPrevious
						className="w-[24px] h-[24px] rounded-[6px] bg-gray-6 cursor-pointer"
						onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
					/>
					<PaginationContent className="gap-30">
						{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
							<PaginationItem key={page}>
								<PaginationLink
									isActive={page === currentPage}
									onClick={() => handlePageChange(page)}
									className="cursor-pointer">
									{page}
								</PaginationLink>
							</PaginationItem>
						))}
					</PaginationContent>
					<PaginationNext
						className="w-[24px] h-[24px] rounded-[6px] bg-secondary-brown cursor-pointer"
						onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
					/>
				</Pagination>
			</div>
		</div>
	);
};

export default IgniteListView;
