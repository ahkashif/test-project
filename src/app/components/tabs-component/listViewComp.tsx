import React, { JSX, useState } from "react";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationPrevious,
	PaginationNext,
} from "@/components/ui/pagination";
import Icon from "../icon/icons";

interface ListViewProps {
	data: any[];
	headers: string[];
	renderRow: (item: any, index: number) => JSX.Element;
	rowsPerPage?: number;
}

const ListViewComp = ({ data, headers, renderRow, rowsPerPage = 8 }: ListViewProps) => {
	const [currentPage, setCurrentPage] = useState(1);

	// Calculate the data for the current page
	const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

	// Calculate total pages
	const totalPages = Math.ceil(data.length / rowsPerPage);

	const startItem = (currentPage - 1) * rowsPerPage + 1;
	const endItem = Math.min(currentPage * rowsPerPage, data.length);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<div className="overflow-x-auto w-full rounded-[10px] border border-divider">
			<table className="min-w-full bg-white">
				<thead className="bg-gray-7 border-b border-divider rounded-[10px] overflow-hidden">
					<tr>
						{headers.map((header, index) => (
							<th
								key={index}
								className="text-left p-[15px] text-body3 text-gray-3">
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>{paginatedData.map((item, index) => renderRow(item, index))}</tbody>
			</table>

			<div className="flex justify-between items-center p-20">
				<p className="text-body3 font-light flex gap-5 items-center">
					Showing {startItem}-{endItem} of {data.length} <Icon name={"chevron-down"} />
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

export default ListViewComp;
