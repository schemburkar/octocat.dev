import { Metadata } from "next"

export const metadata: Metadata = {
    title: '404 - This page could not be found.',
    description: '',
}

export default function NotFound() {
    return (
      <div className="flex justify-center h-[100vh] items-center gap-2">
        <h2 className="font-semibold text-2xl">404</h2>
        <div className="border-r h-10 border-gray-400"></div>
        <p className="text-sm">This page could not be found.</p>
       
      </div>
    )
  }