"use client";
const appMode = process.env.NEXT_PUBLIC_DEBUG
const appUrl = process.env.NEXT_PUBLIC_URL
const appProNum = process.env.NEXT_PUBLIC_CLOUD_PROJECT_NUMBER

export default function Home() {
  console.log(appMode, appUrl, appProNum)
  return (
    <main className="min-h-screen bg-gray-900 text-white p-8 font-sans flex flex-col gap-12">
      <div className="">appMode: {appMode}</div>
      <div className="">appUrl:{appUrl}</div>
      <div className="">appProNum:{appProNum}</div>
      Hello world
    </main>
  );
}
 