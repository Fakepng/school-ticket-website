import { useDeferredValue, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { io } from "socket.io-client";
let socket;

export default function Table() {
	const [tickets, setTickets] = useState([]);
	const [filterTickets, setFilterTickets] = useState([]);
	const [filter, setFilter] = useState({
		status: "ALL",
		priority: "ALL",
		title: "",
		description: "",
		room: "",
		creator: "",
	});
	const [showFilters, setShowFilters] = useState(false);

	const deferredFilter = useDeferredValue(filter);

	const { status, priority, title, description, room, creator } = filter;

	const changeFilter = (e) => {
		setFilter({ ...filter, [e.target.name]: e.target.value });
	};

	const removeFilter = () => {
		setFilter({
			status: "ALL",
			priority: "ALL",
			title: "",
			description: "",
			room: "",
			creator: "",
		});
	};

	const getTickets = async () => {
		const data = await axios.get("/api/getTickets");
		setTickets(data.data.reverse());
	};

	const socketInitializer = async () => {
		await fetch("/api/socket");
		socket = io();

		socket.on("connect", () => {
			console.log("connected to server");
		});

		socket.on("update-table", (msg) => {
			getTickets();
		});
	};

	useEffect(() => {
		socketInitializer(), getTickets();
	}, []);

	useEffect(() => {
		let filteredTickets = tickets;
		if (deferredFilter.status !== "ALL") {
			filteredTickets = filteredTickets.filter(
				(ticket) => ticket.status === deferredFilter.status
			);
		}

		if (deferredFilter.priority !== "ALL") {
			filteredTickets = filteredTickets.filter(
				(ticket) => ticket.priority === deferredFilter.priority
			);
		}

		if (deferredFilter.title !== "") {
			filteredTickets = filteredTickets.filter((ticket) =>
				ticket.title.toLowerCase().includes(deferredFilter.title.toLowerCase())
			);
		}

		if (deferredFilter.description !== "") {
			filteredTickets = filteredTickets.filter((ticket) =>
				ticket.description
					.toLowerCase()
					.includes(deferredFilter.description.toLowerCase())
			);
		}

		if (deferredFilter.room !== "") {
			filteredTickets = filteredTickets.filter((ticket) =>
				ticket.room.toLowerCase().includes(deferredFilter.room.toLowerCase())
			);
		}

		if (deferredFilter.creator !== "") {
			filteredTickets = filteredTickets.filter((ticket) =>
				ticket.creator
					.toLowerCase()
					.includes(deferredFilter.creator.toLowerCase())
			);
		}

		setFilterTickets(filteredTickets);
	}, [tickets, deferredFilter]);

	return (
		<div className='overflow-x-auto relative shadow-md sm:rounded-lg'>
			<div className='2xl:container 2xl:mx-auto'>
				<div className=' md:py-12 lg:px-20 md:px-6 py-9 px-4'>
					<div className=' flex justify-between items-center mb-4'>
						<button
							onClick={() => setShowFilters(!showFilters)}
							className=' cursor-pointer sm:flex hidden hover:bg-gray-700 focus:ring focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-4 px-6 bg-gray-800 flex text-base leading-4 font-normal text-white justify-center items-center '
						>
							<svg
								className=' mr-2'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M6 12C7.10457 12 8 11.1046 8 10C8 8.89543 7.10457 8 6 8C4.89543 8 4 8.89543 4 10C4 11.1046 4.89543 12 6 12Z'
									stroke='white'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M6 4V8'
									stroke='white'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M6 12V20'
									stroke='white'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z'
									stroke='white'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M12 4V14'
									stroke='white'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M12 18V20'
									stroke='white'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M18 9C19.1046 9 20 8.10457 20 7C20 5.89543 19.1046 5 18 5C16.8954 5 16 5.89543 16 7C16 8.10457 16.8954 9 18 9Z'
									stroke='white'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M18 4V5'
									stroke='white'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M18 9V20'
									stroke='white'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
							Filters
						</button>
					</div>

					<button
						onClick={() => setShowFilters(!showFilters)}
						className='cursor-pointer mt-6 block sm:hidden hover:bg-gray-700 focus:ring focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-2 w-full bg-gray-800 flex text-base leading-4 font-normal text-white justify-center items-center'
					>
						<svg
							className=' mr-2'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M6 12C7.10457 12 8 11.1046 8 10C8 8.89543 7.10457 8 6 8C4.89543 8 4 8.89543 4 10C4 11.1046 4.89543 12 6 12Z'
								stroke='white'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M6 4V8'
								stroke='white'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M6 12V20'
								stroke='white'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z'
								stroke='white'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M12 4V14'
								stroke='white'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M12 18V20'
								stroke='white'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M18 9C19.1046 9 20 8.10457 20 7C20 5.89543 19.1046 5 18 5C16.8954 5 16 5.89543 16 7C16 8.10457 16.8954 9 18 9Z'
								stroke='white'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M18 4V5'
								stroke='white'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M18 9V20'
								stroke='white'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
						Filters
					</button>
				</div>

				<div
					id='filterSection'
					className={
						"relative md:py-10 lg:px-20 md:px-6 py-9 px-4 bg-gray-50 w-full " +
						(showFilters ? "block" : "hidden")
					}
				>
					<div
						onClick={() => setShowFilters(false)}
						className=' cursor-pointer absolute right-0 top-0 md:py-10 lg:px-20 md:px-6 py-9 px-4'
					>
						<svg
							className=' lg:w-6 lg:h-6 w-4 h-4'
							viewBox='0 0 26 26'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M25 1L1 25'
								stroke='#1F2937'
								strokeWidth='1.25'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M1 1L25 25'
								stroke='#27272A'
								strokeWidth='1.25'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</div>
					<div>
						<div className=' md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap'>
							<div>
								<div className=' flex space-x-2'>
									<p className=' lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 '>
										หัวข้อ
									</p>
								</div>
								<div className=' md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap'>
									<div className=' flex space-x-2 md:justify-center md:items-center items-center justify-start'>
										<input
											type='text'
											name='title'
											id='TITLE'
											className='block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
											onChange={changeFilter}
											values={filter.title}
										/>
									</div>
								</div>
							</div>
							<div>
								<div className=' flex space-x-2'>
									<p className=' lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 '>
										คำอธิบาย
									</p>
								</div>
								<div className=' md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap'>
									<div className=' flex space-x-2 md:justify-center md:items-center items-center justify-start'>
										<input
											type='text'
											name='description'
											id='DESCRIPTION'
											className='block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
											onChange={changeFilter}
											values={filter.description}
										/>
									</div>
								</div>
							</div>
							<div>
								<div className=' flex space-x-2'>
									<p className=' lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 '>
										ห้อง
									</p>
								</div>
								<div className=' md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap'>
									<div className=' flex space-x-2 md:justify-center md:items-center items-center justify-start'>
										<input
											type='text'
											name='room'
											id='ROOM'
											className='block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
											onChange={changeFilter}
											value={filter.room}
										/>
									</div>
								</div>
							</div>
							<div>
								<div className=' flex space-x-2'>
									<p className=' lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 '>
										ชื่อเจ้าของแจ้งซ่อม
									</p>
								</div>
								<div className=' md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap'>
									<div className=' flex space-x-2 md:justify-center md:items-center items-center justify-start'>
										<input
											type='text'
											name='creator'
											id='CREATOR'
											className='block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
											onChange={changeFilter}
											value={filter.creator}
										/>
									</div>
								</div>
							</div>
						</div>
						<hr className=' bg-gray-200 lg:w-6/12 w-full md:my-10 my-8' />
						<div className=' md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap'>
							<div>
								<div className=' flex space-x-2'>
									<p className=' lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 '>
										สถานะ
									</p>
								</div>
								<div className=' md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap'>
									<div className=' flex space-x-2 md:justify-center md:items-center items-center justify-start'>
										<input
											className='w-4 h-4 mr-2'
											type='checkbox'
											id='ALL'
											name='status'
											value='ALL'
											checked={status === "ALL"}
											onChange={changeFilter}
										/>
										<div className=' inline-block'>
											<div className=' flex space-x-6 justify-center items-center'>
												<label
													className=' mr-2 text-sm leading-3 font-normal text-gray-600'
													htmlFor='ทั้งหมด'
												>
													ทั้งหมด
												</label>
											</div>
										</div>
									</div>
									<div className=' flex space-x-2 md:justify-center md:items-center items-center justify-start'>
										<input
											className='w-4 h-4 mr-2'
											type='checkbox'
											id='OPEN'
											name='status'
											value='OPEN'
											checked={status === "OPEN"}
											onChange={changeFilter}
										/>
										<div className=' inline-block'>
											<div className=' flex space-x-6 justify-center items-center'>
												<label
													className=' mr-2 text-sm leading-3 font-normal text-gray-600'
													htmlFor='เปิด'
												>
													เปิด
												</label>
											</div>
										</div>
									</div>
									<div className=' flex justify-center items-center'>
										<input
											className='w-4 h-4 mr-2'
											type='checkbox'
											id='IN_PROGRESS'
											name='status'
											value='IN_PROGRESS'
											checked={status === "IN_PROGRESS"}
											onChange={changeFilter}
										/>
										<div className=' inline-block'>
											<div className=' flex space-x-6 justify-center items-center'>
												<label
													className=' mr-2 text-sm leading-3 font-normal text-gray-600'
													htmlFor='กำลังดำเนินการ'
												>
													กำลังดำเนินการ
												</label>
											</div>
										</div>
									</div>
									<div className=' flex space-x-2 md:justify-center md:items-center items-center justify-end'>
										<input
											className='w-4 h-4 mr-2'
											type='checkbox'
											id='CLOSE'
											name='status'
											value='CLOSE'
											checked={status === "CLOSE"}
											onChange={changeFilter}
										/>
										<div className=' inline-block'>
											<div className=' flex space-x-6 justify-center items-center'>
												<label
													className=' mr-2 text-sm leading-3 font-normal text-gray-600'
													htmlFor='เสร็จสิ้น'
												>
													เสร็จสิ้น
												</label>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div>
								<div className=' flex space-x-2'>
									<p className=' lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 '>
										ความสำคัญ
									</p>
								</div>
								<div className=' md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap'>
									<div className=' flex space-x-2 md:justify-center md:items-center items-center justify-start'>
										<input
											className='w-4 h-4 mr-2'
											type='checkbox'
											id='ALL'
											name='priority'
											value='ALL'
											checked={priority === "ALL"}
											onChange={changeFilter}
										/>
										<div className=' inline-block'>
											<div className=' flex space-x-6 justify-center items-center'>
												<label
													className=' mr-2 text-sm leading-3 font-normal text-gray-600'
													htmlFor='ทั้งหมด'
												>
													ทั้งหมด
												</label>
											</div>
										</div>
									</div>
									<div className=' flex space-x-2 md:justify-center md:items-center items-center justify-start'>
										<input
											className='w-4 h-4 mr-2'
											type='checkbox'
											id='LOW'
											name='priority'
											value='LOW'
											checked={priority === "LOW"}
											onChange={changeFilter}
										/>
										<div className=' inline-block'>
											<div className=' flex space-x-6 justify-center items-center'>
												<label
													className=' mr-2 text-sm leading-3 font-normal text-gray-600'
													htmlFor='ต่ำ'
												>
													ต่ำ
												</label>
											</div>
										</div>
									</div>
									<div className=' flex justify-center items-center'>
										<input
											className='w-4 h-4 mr-2'
											type='checkbox'
											id='MEDIUM'
											name='priority'
											value='MEDIUM'
											checked={priority === "MEDIUM"}
											onChange={changeFilter}
										/>
										<div className=' inline-block'>
											<div className=' flex space-x-6 justify-center items-center'>
												<label
													className=' mr-2 text-sm leading-3 font-normal text-gray-600'
													htmlFor='กลาง'
												>
													กลาง
												</label>
											</div>
										</div>
									</div>
									<div className=' flex space-x-2 md:justify-center md:items-center items-center justify-end'>
										<input
											className='w-4 h-4 mr-2'
											type='checkbox'
											id='HIGH'
											name='priority'
											value='HIGH'
											checked={priority === "HIGH"}
											onChange={changeFilter}
										/>
										<div className=' inline-block'>
											<div className=' flex space-x-6 justify-center items-center'>
												<label
													className=' mr-2 text-sm leading-3 font-normal text-gray-600'
													htmlFor='เสร็จสิ้น'
												>
													สูง
												</label>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<table className='w-full text-sm text-left text-gray-500'>
				<thead className='text-xs text-gray-700 uppercase bg-gray-50'>
					<tr>
						<th scope='col' className='py-3 px-6'>
							หัวข้อ
						</th>
						<th scope='col' className='py-3 px-6'>
							คำอธิบาย
						</th>
						<th scope='col' className='py-3 px-6'>
							ห้อง
						</th>
						<th scope='col' className='py-3 px-6'>
							ชื่อเจ้าของแจ้งซ่อม
						</th>
						<th scope='col' className='py-3 px-6'>
							สถานะ
						</th>
						<th scope='col' className='py-3 px-6'>
							ความสำคัญ
						</th>
						<th scope='col' className='py-3 px-6'>
							<span className='sr-only'>Edit</span>
						</th>
					</tr>
				</thead>
				{tickets
					? filterTickets.map((ticket) => {
							return (
								<tbody key={ticket.id}>
									<tr className='bg-white border-b hover:bg-gray-50'>
										<th
											scope='row'
											className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap'
										>
											{ticket.title}
										</th>
										<td className='py-4 px-6'>
											{ticket.description.slice(0, 20)}
											{ticket.description.length > 20 ? "..." : ""}
										</td>
										<td className='py-4 px-6'>{ticket.room}</td>
										<td className='py-4 px-6'>{ticket.creator}</td>
										<td className='py-4 px-6'>
											{ticket.status === "IN_PROGRESS"
												? "IN PROGRESS"
												: ticket.status}
										</td>
										<td className='py-4 px-6'>{ticket.priority}</td>
										<td className='py-4 px-6 text-right'>
											<Link
												href={`/view/${ticket.id}`}
												className='font-medium text-blue-600 hover:underline'
											>
												Open
											</Link>
										</td>
									</tr>
								</tbody>
							);
					  })
					: null}
			</table>
		</div>
	);
}
