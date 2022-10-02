import Head from "next/head";
import { useRouter } from "next/router";

import Header from "@components/Header";
import Ticket from "@components/Ticket";
import Footer from "@components/Footer";

export default function TicketView() {
	const router = useRouter();
	const { id } = router.query;

	return (
		<div className='flex flex-col h-screen'>
			<Head>
				<title>Ticket</title>
				<meta name='description' content='Ticket' />
				<link rel='icon' href='../../images/favicon.ico' />
			</Head>

			<Header />

			<main className='container mx-auto mt-6 mb-auto'>
				<Ticket ticketId={id} />
			</main>

			<Footer />
		</div>
	);
}
