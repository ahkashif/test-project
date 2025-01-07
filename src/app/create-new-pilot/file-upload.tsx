import Image from "next/image";

// interface FileTu {
// 	name: string;
// 	size: number;
// }

const FileUpload: React.FC<{
	label: string;
	accept: string;
	multiple?: boolean;
	onChange: (files: FileList | null) => void;
	selectedFiles: File[];
	imageFile?: File[] | string;
	previewImage?: string | null;
}> = ({ label, accept, multiple, onChange, selectedFiles, previewImage }) => {
	return (
		<div className="border border-divider rounded-[10px] p-[15px]">
			<div
				className="border-dashed border-2 border-divider rounded-[10px] p-4 flex flex-col items-center justify-center cursor-pointer"
				onClick={() => document.getElementById(label)?.click()}>
				{selectedFiles.length === 0 && !previewImage ? (
					<>
						<p className="text-gray-400 text-sm text-center mt-2">Drag and drop or browse to choose a file</p>
					</>
				) : previewImage ? (
					<div className="w-full flex items-center justify-center">
						<Image
							src={previewImage}
							alt="Preview"
							className="max-h-full max-w-full object-cover rounded-md"
							width={500}
							height={250}
						/>
					</div>
				) : (
					<div className="w-full space-y-2">
						{selectedFiles.map((file, index) => (
							<div
								key={index}
								className="flex items-center justify-between p-2 border rounded-md">
								<span className="text-sm font-medium">{file?.name || ""}</span>
								<span className="text-sm text-gray-500">{(file?.size / 1024).toFixed(2)} KB</span>
							</div>
						))}
					</div>
				)}
			</div>
			<input
				id={label}
				type="file"
				accept={accept}
				multiple={multiple}
				onChange={(e) => onChange(e.target.files)}
				className="hidden"
			/>
		</div>
	);
};

export default FileUpload;
