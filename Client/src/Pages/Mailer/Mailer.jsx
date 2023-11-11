import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const Mailer = () => {
	const [roll, setRoll] = useState("");
	const [email, setEmail] = useState("");
	const [files, setFiles] = useState([]);

	const handleFileChange = (e) => {
		const selectedFiles = e.target.files;

		// Check if files are selected
		if (selectedFiles && selectedFiles.length > 0) {
			// Limit the number of files to 50
			if (selectedFiles.length + files.length > 10) {
				toast.error("You can upload up to 10 files.");
			} else {
				setFiles((prevFiles) => [...prevFiles, ...Array.from(selectedFiles)]);
			}
		}
	};
	console.log(files);
	console.log(files.length);
	console.log(files.length <= 10);

	const handleRollChange = (e) => {
		setRoll(e.target.value);
		setEmail(e.target.value + "@kiit.ac.in");
	};

	const handleDragOver = (e) => {
		e.preventDefault();
	};

	const handleDrop = (e) => {
		e.preventDefault();

		const droppedFiles = e.dataTransfer.files;

		// Limit the number of files to 10
		if (droppedFiles.length + files.length > 10) {
			toast.error("You can upload up to 10 files.");
		} else {
			setFiles((prevFiles) => [...prevFiles, ...Array.from(droppedFiles)]);
		}
	};

	const handleRemoveFile = (index) => {
		const updatedFiles = [...files];
		updatedFiles.splice(index, 1);
		setFiles(updatedFiles);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("email", email);

		for (let i = 0; i < files.length; i++) {
			formData.append("files", files[i]);
		}

		try {
			const response = await axios.post(
				"/email/send",
				formData
			);
			toast.success(response.data.message);
		} catch (error) {
			console.error("Error:", error.message);
			toast.error("Error uploading files.");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-black text-white font-roboto">
			<div className="max-w-md w-full p-6 bg-black bg-opacity-90 rounded-md shadow-md">
				<Toaster position="top-center" />
				<h2 className="text-4xl font-bold mb-6 text-center">
					File-Mailer Preview
				</h2>
				<form
					onSubmit={handleSubmit}
					encType="multipart/form-data"
					onDragOver={handleDragOver}
					onDrop={handleDrop}>
					<div className="mb-4">
						<label htmlFor="email" className="block text-xl font-bold">
							Email
						</label>
						<p className="text-gray-500">
							Enter the roll number the email will be auto-filled
						</p>

						<input
							type="email"
							id="email"
							name="email"
							value={email}
							required
							disabled
							className="mt-1 p-2 w-full border rounded-md font-bold bg-white text-black"
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="roll" className="block text-xl font-bold">
							Enter Roll Number
						</label>
						<input
							type="text"
							id="roll"
							name="roll"
							value={roll}
							onChange={handleRollChange}
							required
							className="mt-1 p-2 w-full border rounded-md bg-white text-black font-bold"
							autoComplete="off"
							autoFocus
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="files" className="block text-xl font-bold mb-2">
							Select Files (Up to 10)
						</label>
						{files.length < 10 && (
							<div className="relative border-dashed border-2 border-gray-400 p-6 rounded-md">
								<input
									type="file"
									id="files"
									name="files"
									multiple
									accept=".py,.c,.cpp,.java"
									onChange={handleFileChange}
									required
									className="absolute top-0 left-0 w-full h-full opacity-0"
								/>
								<p className="text-center text-gray-500">
									Drag and drop files here or click to select.
								</p>
							</div>
						)}
						<div className="mt-4">
							<p className="text-sm text-gray-500">Selected Files:</p>
							<div className="grid grid-cols-2 gap-4">
								{files.map((file, index) => (
									<div
										key={index}
										className="flex items-center border rounded-md p-2 mt-2">
										<div className="flex-shrink-0">
											{/* Adjust the width and height as needed */}
										</div>
										<div>{file.name}</div>
										<button
											type="button"
											onClick={() => handleRemoveFile(index)}
											className="text-red-500 p-1 w-8 h-8">
											&#10006;
										</button>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="flex justify-center">
						<button
							type="submit"
							className="bg-white text-black py-2 px-4 rounded-md hover:bg-red-500 hover:text-white focus:outline-none focus:ring focus:border-red-300">
							Upload
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Mailer;
