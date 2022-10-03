import Head from "next/head";
import { getSession } from "next-auth/react";

import Header from "../../components/Header";
import Table from "../../components/Table";
import Footer from "../../components/Footer";

export default function View() {
	return (
		<div className='flex flex-col h-screen'>
			<Head>
				<title>Ticket</title>
				<meta name='description' content='Ticket' />
				<link rel='icon' href='/images/favicon.ico' />
			</Head>

			<Header />

			<main className='container mx-auto mt-6 mb-auto'>
				<Table />
			</main>

			<Footer />
		</div>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	if (!(session && session.user.role === "ADMIN")) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: { session },
	};
}
