import { useEffect, useState } from "react";

export default function Form() {
	// const [images, setImages] = useState([]);
	const [imageURLs, setImageURLs] = useState([]);

	// useEffect(() => {
	// 	if (images.length < 1) return;
	// }, [images]);

	const convertToBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onload = () => {
				resolve(fileReader.result);
			};
			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	};

	const onImageChange = async (e) => {
		const newImageURLs = [];
		const images = [...e.target.files];
		images.forEach((image) => {
			convertToBase64(image).then((result) => {
				newImageURLs.push(result);
			});
		});
		setImageURLs(newImageURLs);
		// console.log(newImageURLs);
	};

	return (
		<>
			<div>
				<div className='md:grid md:grid-cols-2 md:gap-6 '>
					<div className='md:col-span-1'>
						<div className='px-4 sm:px-0'>
							<h3 className='text-lg font-medium leading-6 text-gray-900'>
								แจ้งซ่อม
							</h3>
						</div>
					</div>
					<div className='mt-5 md:col-span-2 md:mt-0'>
						<form>
							<div className='shadow sm:overflow-hidden sm:rounded-md'>
								<div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
									<div className='grid grid-cols-3 gap-6'>
										<div className='col-span-3 sm:col-span-2'>
											<label
												htmlFor='ticket-title'
												className='block text-sm font-medium text-gray-700'
											>
												หัวข้อ
											</label>
											<div className='mt-1 flex rounded-md shadow-sm'>
												<input
													type='text'
													name='ticket-title'
													id='ticket-title'
													className='block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
												/>
											</div>
										</div>
									</div>

									<div>
										<label
											htmlFor='ticket-description'
											className='block text-sm font-medium text-gray-700'
										>
											คำอธิบาย
										</label>
										<div className='mt-1'>
											<textarea
												id='ticket-description'
												name='ticket-description'
												rows={3}
												className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
												defaultValue={""}
											/>
										</div>
									</div>
									<div className='grid grid-cols-6 gap-6'>
										<div className='col-span-6 sm:col-span-6 lg:col-span-2'>
											<label
												htmlFor='room'
												className='block text-sm font-medium text-gray-700'
											>
												ห้อง
											</label>
											<input
												type='text'
												name='room'
												id='room'
												className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
											/>
										</div>

										<div className='col-span-6 sm:col-span-3 lg:col-span-2'>
											<label
												htmlFor='name'
												className='block text-sm font-medium text-gray-700'
											>
												ชื่อเจ้าของแจ้งซ่อม
											</label>
											<input
												type='text'
												name='name'
												id='name'
												autoComplete='address-level1'
												className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
											/>
										</div>

										<div className='col-span-6 sm:col-span-3 lg:col-span-2'>
											<label
												htmlFor='contact'
												className='block text-sm font-medium text-gray-700'
											>
												ติดต่อ
											</label>
											<input
												type='text'
												name='contact'
												id='contact'
												className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
											/>
										</div>
									</div>
									<div>
										<label className='block text-sm font-medium text-gray-700'>
											อัพโหลดรูปภาพ
										</label>
										<div className='mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6'>
											{imageURLs.length > 0 ? (
												<div>
													{imageURLs.map((image) => {
														<img width={640} height={640} src={image} />;
													})}
												</div>
											) : (
												<div className='space-y-1 text-center'>
													<svg
														className='mx-auto h-12 w-12 text-gray-400'
														stroke='currentColor'
														fill='none'
														viewBox='0 0 48 48'
														aria-hidden='true'
													>
														<path
															d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
															strokeWidth={2}
															strokeLinecap='round'
															strokeLinejoin='round'
														/>
													</svg>
													<div className='flex text-sm text-gray-600'>
														<label
															htmlFor='file-upload'
															className='relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500'
														>
															<span>Upload a file</span>
															<input
																id='file-upload'
																name='file-upload'
																type='file'
																multiple
																accept='image/*'
																onChange={onImageChange}
																className='sr-only'
															/>
														</label>
														<p className='pl-1'>or drag and drop</p>
													</div>
													<p className='text-xs text-gray-500'>
														PNG, JPG, GIF up to 10MB
													</p>
												</div>
											)}
										</div>
									</div>
								</div>
								<div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
									<button
										type='submit'
										className='inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
									>
										ส่ง
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
