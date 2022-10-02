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

	const StatusChangeHandler = (status) => {
		updateStatus(status);
	};

	const PriorityChangeHandler = (priority) => {
		console.log(priority);
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
					<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
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
				</dl>
			</div>
		</div>
	);
}
