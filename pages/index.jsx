import Head from "next/head";

import Headers from "../components/Headers";
import Form from "../components/Form";
import Footer from "../components/Footer";

export default function Home() {
	return (
		<div className='flex flex-col h-screen'>
			<Head>
				<title>Ticket</title>
				<meta name='description' content='Ticket' />
				<link rel='icon' href='/images/favicon.ico' />
			</Head>

			<Headers />

			<main className='container mx-auto mt-6 mb-auto'>
				<Form />
			</main>

			<Footer />
		</div>
	);
}
