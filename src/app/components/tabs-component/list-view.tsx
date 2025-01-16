import React, { useState } from "react";
import Image from "next/image";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationPrevious,
	PaginationNext,
} from "@/components/ui/pagination";
import Icon from "../icon/icons";
import { PilotRequest } from "@/app/api/common/pilots/add-pilot/route";

const ListView = ({ pilotsData }: { pilotsData: PilotRequest[] }) => {
	const [currentPage, setCurrentPage] = useState(1); // Current page
	const rowsPerPage = 8; // Number of rows per page

	// Calculate the data for the current page
	const paginatedData = pilotsData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

	// Calculate total pages
	const totalPages = Math.ceil(pilotsData.length / rowsPerPage);

	const startItem = (currentPage - 1) * rowsPerPage + 1;
	const endItem = Math.min(currentPage * rowsPerPage, pilotsData.length);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<div className="overflow-x-auto w-full rounded-[10px] border border-divider">
			<table className="min-w-full bg-white">
				<thead className="bg-gray-7 border-b border-divider rounded-[10px] overflow-hidden">
					<tr>
						<th className="text-left p-[15px] text-body3 text-gray-3">Pilot ID</th>
						<th className="text-left p-[15px] text-body3 text-gray-3">Pilot Name</th>
						<th className="text-left p-[15px] text-body3 text-gray-3">Pilot Stage</th>
						<th className="text-left p-[15px] text-body3 text-gray-3">Completion Date</th>
						<th className="text-left p-[15px] text-body3 text-gray-3">Pilot Contributors</th>
						<th className="text-left p-[15px] text-body3 text-gray-3">Comp./Tech. Provider</th>
					</tr>
				</thead>
				<tbody>
					{paginatedData.map((pilot, index) => (
						<tr
							key={index}
							className="border-b border-b-divider">
							<td className="px-[15px] py-[20px] text-body3 text-gray-3">{"897"}</td>
							<td className="px-[15px] py-[20px] text-body3 text-gray-3">
								<div className="flex items-center gap-2">
									<div className="flex flex-col gap-5">
										<p className="text-subtitle2 font-semibold">{pilot.pilotName}</p>
										<div className="flex flex-row gap-10 items-center">
											<Image
												src="/avatar-small-1.svg"
												alt={pilot.pilotName}
												className="w-[22px] h-[22px] rounded-full"
												loading="lazy"
												width={22}
												height={22}
											/>
											<p className="text-body3 text-gray-3">by {pilot.pilotName}</p>
										</div>
									</div>
								</div>
							</td>
							<td className="px-[15px] py-[20px] text-body3">
								<span
									className={`px-[15px] py-5 min-w-[95px] rounded-full text-white text-body2 font-light ${
										pilot.currStage === "Planning"
											? "bg-secondary-red"
											: pilot.currStage === "Ploting"
											? "bg-other-cyan"
											: pilot.currStage === "Assessment"
											? "bg-primary-green"
											: "bg-primary-gold"
									}`}>
									{pilot.currStage}
								</span>
							</td>
							<td className="px-[15px] py-[20px] text-body3 text-gray-3">{pilot.createdDate || "N/A"}</td>
							<td className="px-[15px] py-[20px] text-body3 text-gray-3">{pilot.technologySolution || "N/A"}</td>
							<td className="px-[15px] py-[20px] text-body3 text-gray-3">{pilot.technologyProvider || "N/A"}</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className="flex justify-between items-center p-20">
				<p className="text-body3 font-light flex gap-5 items-center">
					Showing {startItem}-{endItem} of {pilotsData.length} <Icon name={"chevron-down"} />
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

export default ListView;
