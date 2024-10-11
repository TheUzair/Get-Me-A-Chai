import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<>
			<div className="flex justify-center flex-col gap-6 items-center text-white h-[40vh]">
				<h1 className="text-5xl font-bold flex items-center gap-2">
					Buy Me a Chai
					<span>
						<Image className="invertImg" src="/tea.gif" alt="tea" width={64} height={64} unoptimized/>
					</span>
				</h1>
				<p className="text-center max-w-xl text-lg">
					Get Me a Chai is a crowdfunding platform designed for creators. Receive direct support from your fans and bring your projects to life.
				</p>
				<div className="flex gap-4">
					<Link href="/login">
						<button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
							Start Here
						</button>
					</Link>
					<Link href="/about">
						<button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
							Read More
						</button>
					</Link>
				</div>

			</div>

			<div className="bg-white h-[1px] opacity-10 my-6"></div>

			<div className="container mx-auto text-white py-16">
				<h2 className="text-3xl font-bold text-center mb-10">How Fans Can Support You</h2>
				<div className="flex flex-wrap justify-around gap-8">
					<div className="flex flex-col items-center space-y-3 max-w-xs">
						<Image className="rounded-full" src="/fans.gif" alt="Fans helping" width={88} height={88} unoptimized/>
						<h3 className="font-bold text-xl">Collaborative Fans</h3>
						<p className="text-center text-gray-300">
							Your fans are eager to support your journey and contribute to your success.
						</p>
					</div>
					<div className="flex flex-col items-center space-y-3 max-w-xs">
						<Image className="rounded-full" src="/contribution.gif" alt="Financial support" width={88} height={88} unoptimized/>
						<h3 className="font-bold text-xl">Direct Contributions</h3>
						<p className="text-center text-gray-300">
							Receive financial support from your fans through chai purchases, fueling your projects.
						</p>
					</div>
					<div className="flex flex-col items-center space-y-3 max-w-xs">
						<Image className="rounded-full" src="/community.gif" alt="Community" width={88} height={88} unoptimized/>
						<h3 className="font-bold text-xl">Join a Community</h3>
						<p className="text-center text-gray-300">
							Engage with a community of passionate individuals invested in your creative process.
						</p>
					</div>
				</div>
			</div>

			<div className="bg-white h-[1px] opacity-10 my-5"></div>

			<div className="container mx-auto text-white py-16">
				<h2 className="text-3xl font-bold text-center mb-10">Learn More About Us</h2>
				<div className="flex flex-wrap justify-around gap-8">
					<div className="flex flex-col items-center space-y-3 max-w-xs">
						<Image className="rounded-full" src="/man.gif" alt="About the platform" width={88} height={88} unoptimized/>
						<h3 className="font-bold text-xl">About the Platform</h3>
						<p className="text-center text-gray-300">
							We connect creators with their fans, enabling projects to be funded directly by those who love your work.
						</p>
					</div>
					<div className="flex flex-col items-center space-y-3 max-w-xs">
						<Image className="rounded-full" src="/coin.gif" alt="Funding options" width={88} height={88} unoptimized/>
						<h3 className="font-bold text-xl">Flexible Funding</h3>
						<p className="text-center text-gray-300">
							Our platform offers various funding options to suit your project needs and fan preferences.
						</p>
					</div>
					<div className="flex flex-col items-center space-y-3 max-w-xs">
						<Image className="rounded-full" src="/group.gif" alt="Growing community" width={88} height={88} unoptimized/>
						<h3 className="font-bold text-xl">Our Community</h3>
						<p className="text-center text-gray-300">
							Join a growing community of creators and supporters who believe in the power of collaboration.
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

