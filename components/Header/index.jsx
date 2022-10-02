import { Popover } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Header() {
	const { data: session } = useSession();

	return (
		<nav>
			<Popover className='relative bg-white'>
				<div className='mx-auto max-w-7xl px-4 sm:px-6'>
					<div className='flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10'>
						<div className='flex justify-start lg:w-0 lg:flex-1'>
							<Link href='/'>
								<img
									className='h-8 w-auto sm:h-10 hover:cursor-pointer rounded-full'
									src='/audioandvisual.png'
									alt='Satriwitthaya 2 School'
								/>
							</Link>
						</div>
						<div className='-my-2 -mr-2 md:hidden'>
							<Popover.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
								<span className='sr-only'>Open menu</span>
								<Bars3Icon className='h-6 w-6' aria-hidden='true' />
							</Popover.Button>
						</div>
						{session && (
							<Link
								href='/view'
								class='text-base font-medium text-gray-500 hover:text-gray-900'
							>
								View
							</Link>
						)}

						<div className='hidden items-center justify-end md:flex md:flex-1 lg:w-0'>
							{session ? (
								<>
									<img
										className='h-8 w-auto sm:h-10 hover:cursor-pointer rounded-full'
										src={session.user.image}
										alt='User Profile'
									/>
									<div
										className='ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
										onClick={() => signOut()}
									>
										{session.user.name}
									</div>
								</>
							) : (
								<a
									href='#'
									className='ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
									onClick={() => signIn()}
								>
									Sign in
								</a>
							)}
						</div>
					</div>
				</div>
			</Popover>
		</nav>
	);
}
