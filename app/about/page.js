// "use client";

// import React from 'react';
// import Head from 'next/head';
// import { useSession } from 'next-auth/react';

// const About = () => {
// 	const { status } = useSession();

// 	if (status === 'loading') {
// 		return <div className="min-h-screen flex items-center justify-center">
// <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
// </div>;
// 	}


// 	return (
// 		<>
// 			<Head>
// 				<title>About - Get Me A Chai</title>
// 			</Head>
// 			<div className="min-h-screen bg-gray-900 text-white p-8">
// 				<section className="max-w-7xl mx-auto text-center">
// 					<h1 className="text-4xl font-bold mb-6">About Get Me a Chai</h1>
// 					<p className="mb-12 text-lg">
// 						Get Me a Chai is a crowdfunding platform designed for creators to fund their projects with the support of their fans.
// 					</p>

// 					<div className="flex flex-col gap-16">

// 						<div className="grid grid-cols-2 gap-8 text-left items-start">
// 							<div className="px-4">
// 								<h2 className="text-2xl font-semibold mb-4">How It Works</h2>
// 								<ul className="space-y-4">
// 									<li className="min-h-[2rem]">💼 <strong>Fans Want to Collaborate:</strong> Your fans are enthusiastic about collaborating with you on your projects.</li>
// 									<li className="min-h-[2rem]">☕ <strong>Support Through Chai:</strong> Receive support from your fans in the form of chai purchases, directly contributing to your project funding.</li>
// 								</ul>
// 							</div>

// 							<div className="px-4">
// 								<h2 className="text-2xl font-semibold mb-4">Benefits for Creators</h2>
// 								<ul className="space-y-4">
// 									<li className="min-h-[2rem]">💸 Direct financial support from your fanbase</li>
// 									<li className="min-h-[2rem]">🤝 Engage with your fans on a personal level</li>
// 									<li className="min-h-[2rem]">🎨 Access to a platform tailored for creative projects</li>
// 								</ul>
// 							</div>
// 						</div>


// 						<div className="grid grid-cols-2 gap-8 text-left items-start">
// 							<div className="px-4">
// 								<h2 className="text-2xl font-semibold mb-4">Benefits for Fans</h2>
// 								<ul className="space-y-4">
// 									<li className="min-h-[2rem]">❤️ Directly contribute to the success of your favorite creators</li>
// 									<li className="min-h-[2rem]">🎁 Exclusive rewards and perks for supporting creators</li>
// 									<li className="min-h-[2rem]">📣 Be part of the creative process and connect with creators</li>
// 								</ul>
// 							</div>

// 							<div className="px-4">
// 								<h2 className="text-2xl font-semibold mb-4">Benefits of Collaboration</h2>
// 								<ul className="space-y-4">
// 									<li className="min-h-[2rem]">🌐 Unlock new opportunities through collaboration with fellow creators</li>
// 									<li className="min-h-[2rem]">📈 Expand your network and reach a wider audience</li>
// 									<li className="min-h-[2rem]">🔧 Combine skills and resources to create innovative projects</li>
// 								</ul>
// 							</div>
// 						</div>


// 						<div className="grid grid-cols-2 gap-8 text-left items-start">
// 							<div className="px-4">
// 								<h2 className="text-2xl font-semibold mb-4">Community Engagement</h2>
// 								<ul className="space-y-4">
// 									<li className="min-h-[2rem]">👥 Engage with a supportive community of like-minded individuals</li>
// 									<li className="min-h-[2rem]">💬 Receive valuable feedback and encouragement from peers</li>
// 									<li className="min-h-[2rem]">🗣️ Participate in discussions and events centered around your interests</li>
// 								</ul>
// 							</div>

// 							<div className="px-4">
// 								<h2 className="text-2xl font-semibold mb-4">Access to Resources</h2>
// 								<ul className="space-y-4">
// 									<li className="min-h-[2rem]">📚 Gain access to tutorials, templates, and tools</li>
// 									<li className="min-h-[2rem]">🧑‍🏫 Receive guidance from experienced creators</li>
// 									<li className="min-h-[2rem]">🔍 Stay updated on industry trends and best practices</li>
// 								</ul>
// 							</div>
// 						</div>


// 						<div className="grid grid-cols-2 gap-8 text-left items-start">
// 							<div className="px-4">
// 								<h2 className="text-2xl font-semibold mb-4">Recognition and Exposure</h2>
// 								<ul className="space-y-4">
// 									<li className="min-h-[2rem]">🌍 Showcase your work to a global audience and gain recognition</li>
// 									<li className="min-h-[2rem]">📢 Feature in promotional materials and campaigns</li>
// 									<li className="min-h-[2rem]">🛠️ Build your portfolio and increase credibility as a creator</li>
// 								</ul>
// 							</div>

// 							<div className="px-4">
// 								<h2 className="text-2xl font-semibold mb-4">Supportive Community</h2>
// 								<ul className="space-y-4">
// 									<li className="min-h-[2rem]">🤝 Join a community that values creativity, diversity, and inclusivity</li>
// 									<li className="min-h-[2rem]">🎉 Find encouragement and inspiration from fellow members</li>
// 									<li className="min-h-[2rem]">🔗 Collaborate on projects and share resources for mutual growth</li>
// 								</ul>
// 							</div>
// 						</div>
// 					</div>
// 				</section>
// 			</div>
// 		</>
// 	);
// };

// export default About;

"use client";

import React from 'react';
import { useSession } from 'next-auth/react';

const About = () => {
  const { status } = useSession();

  if (status === 'loading') {
		return <div className="min-h-screen flex items-center justify-center">
		<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
	</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      	<div className="min-h-screen bg-gray-900 text-white p-8">
				<section className="max-w-7xl mx-auto text-center">
					<h1 className="text-4xl font-bold mb-6">About Get Me a Chai</h1>
					<p className="mb-12 text-lg">
						Get Me a Chai is a crowdfunding platform designed for creators to fund their projects with the support of their fans.
					</p>

					<div className="flex flex-col gap-16">

						<div className="grid grid-cols-2 gap-8 text-left items-start">
							<div className="px-4">
								<h2 className="text-2xl font-semibold mb-4">How It Works</h2>
								<ul className="space-y-4">
									<li className="min-h-[2rem]">💼 <strong>Fans Want to Collaborate:</strong> Your fans are enthusiastic about collaborating with you on your projects.</li>
									<li className="min-h-[2rem]">☕ <strong>Support Through Chai:</strong> Receive support from your fans in the form of chai purchases, directly contributing to your project funding.</li>
								</ul>
							</div>

							<div className="px-4">
								<h2 className="text-2xl font-semibold mb-4">Benefits for Creators</h2>
								<ul className="space-y-4">
									<li className="min-h-[2rem]">💸 Direct financial support from your fanbase</li>
									<li className="min-h-[2rem]">🤝 Engage with your fans on a personal level</li>
									<li className="min-h-[2rem]">🎨 Access to a platform tailored for creative projects</li>
								</ul>
							</div>
						</div>


						<div className="grid grid-cols-2 gap-8 text-left items-start">
							<div className="px-4">
								<h2 className="text-2xl font-semibold mb-4">Benefits for Fans</h2>
								<ul className="space-y-4">
									<li className="min-h-[2rem]">❤️ Directly contribute to the success of your favorite creators</li>
									<li className="min-h-[2rem]">🎁 Exclusive rewards and perks for supporting creators</li>
									<li className="min-h-[2rem]">📣 Be part of the creative process and connect with creators</li>
								</ul>
							</div>

							<div className="px-4">
								<h2 className="text-2xl font-semibold mb-4">Benefits of Collaboration</h2>
								<ul className="space-y-4">
									<li className="min-h-[2rem]">🌐 Unlock new opportunities through collaboration with fellow creators</li>
									<li className="min-h-[2rem]">📈 Expand your network and reach a wider audience</li>
									<li className="min-h-[2rem]">🔧 Combine skills and resources to create innovative projects</li>
								</ul>
							</div>
						</div>


						<div className="grid grid-cols-2 gap-8 text-left items-start">
							<div className="px-4">
								<h2 className="text-2xl font-semibold mb-4">Community Engagement</h2>
								<ul className="space-y-4">
									<li className="min-h-[2rem]">👥 Engage with a supportive community of like-minded individuals</li>
									<li className="min-h-[2rem]">💬 Receive valuable feedback and encouragement from peers</li>
									<li className="min-h-[2rem]">🗣️ Participate in discussions and events centered around your interests</li>
								</ul>
							</div>

							<div className="px-4">
								<h2 className="text-2xl font-semibold mb-4">Access to Resources</h2>
								<ul className="space-y-4">
									<li className="min-h-[2rem]">📚 Gain access to tutorials, templates, and tools</li>
									<li className="min-h-[2rem]">🧑‍🏫 Receive guidance from experienced creators</li>
									<li className="min-h-[2rem]">🔍 Stay updated on industry trends and best practices</li>
								</ul>
							</div>
						</div>


						<div className="grid grid-cols-2 gap-8 text-left items-start">
							<div className="px-4">
								<h2 className="text-2xl font-semibold mb-4">Recognition and Exposure</h2>
								<ul className="space-y-4">
									<li className="min-h-[2rem]">🌍 Showcase your work to a global audience and gain recognition</li>
									<li className="min-h-[2rem]">📢 Feature in promotional materials and campaigns</li>
									<li className="min-h-[2rem]">🛠️ Build your portfolio and increase credibility as a creator</li>
								</ul>
							</div>

							<div className="px-4">
								<h2 className="text-2xl font-semibold mb-4">Supportive Community</h2>
								<ul className="space-y-4">
									<li className="min-h-[2rem]">🤝 Join a community that values creativity, diversity, and inclusivity</li>
									<li className="min-h-[2rem]">🎉 Find encouragement and inspiration from fellow members</li>
									<li className="min-h-[2rem]">🔗 Collaborate on projects and share resources for mutual growth</li>
								</ul>
							</div>
						</div>
					</div>
				</section>
			</div>
      
    </div>
  );
};

export default About;
