import { useEffect, useState } from "react";
import axios from "axios";

import StatusSelector from "@components/StatusSelector";
import PrioritySelector from "@components/PrioritySelector";

export default function Ticket({ ticketId }) {
	const [tickets, setTickets] = useState({});

	const getTickets = async () => {
		const data = await axios.post("/api/getTicket", { ticketId });
		setTickets(data.data);
	};

	const updateStatus = async (status) => {
		await axios.post("/api/updateStatus", { ticketId, status });
	};

	const updatePriority = async (priority) => {
		await axios.post("/api/updatePriority", { ticketId, priority });
	};

	const deleteTicket = async () => {
		await axios.post("/api/deleteTicket", { ticketId }).then(() => {
			window.location.href = "/view";
		});
	};

	const StatusChangeHandler = (status) => {
		updateStatus(status);
	};

	const PriorityChangeHandler = (priority) => {
		updatePriority(priority);
	};

	useEffect(() => {
		getTickets();
	}, []);

	return (
		<div className='overflow-hidden bg-white shadow sm:rounded-lg'>
			<div className='px-4 py-5 sm:px-6'>
				<h3 className='text-lg font-medium leading-6 text-gray-900'>
					{tickets.title}
				</h3>
			</div>
			<div className='border-t border-gray-200'>
				<dl>
					<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
						<dt className='text-sm font-medium text-gray-500'>คำอธิบาย</dt>
						<dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
							{tickets.description}
						</dd>
					</div>
					<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
						<dt className='text-sm font-medium text-gray-500'>ห้อง</dt>
						<dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
							{tickets.room}
						</dd>
					</div>
					<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
						<dt className='text-sm font-medium text-gray-500'>
							ชื่อเจ้าของแจ้งซ่อม
						</dt>
						<dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
							{tickets.creator}
						</dd>
					</div>
					<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
						<dt className='text-sm font-medium text-gray-500'>ติดต่อ</dt>
						<dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
							{tickets.contact}
						</dd>
					</div>
					<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
						<dt className='text-sm font-medium text-gray-500'>สถานะ</dt>
						<dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
							<StatusSelector
								status={tickets.status}
								StatusChangeHandler={StatusChangeHandler}
							/>
						</dd>
					</div>
					<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
						<dt className='text-sm font-medium text-gray-500'>ความสำคัญ</dt>
						<dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
							<PrioritySelector
								priority={tickets.priority}
								PriorityChangeHandler={PriorityChangeHandler}
							/>
						</dd>
					</div>
					<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
						<dt className='text-sm font-medium text-gray-500'>ประเภท</dt>
						<dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
							{tickets.type}
						</dd>
					</div>
					<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
						<dt className='text-sm font-medium text-gray-500'>รูปภาพ</dt>
						<dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
							<div className='flex flex-wrap'>
								{tickets.image?.map((image) => (
									<img key={image} src={image} className='m-2 max-h-60' />
								))}
							</div>
						</dd>
					</div>
					<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
						<dt className='text-sm font-medium text-gray-500'></dt>
						<dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
							<button
								class='bg-red-300 hover:bg-red-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center'
								onClick={deleteTicket}
							>
								<svg className='fill-current w-4 h-4 mr-2' viewBox='0 0 24 24'>
									<path
										fill='currentColor'
										d='M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z'
									/>
								</svg>
								<span>DELETE</span>
							</button>
						</dd>
					</div>
				</dl>
			</div>
		</div>
	);
}
