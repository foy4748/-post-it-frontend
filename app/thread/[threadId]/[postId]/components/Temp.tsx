/**
 * v0 by Vercel.
 * @see https://v0.app/t/Gzv5wBYM0Ty
 * Documentation: https://v0.app/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="ml-12 border-l border-gray-200 dark:border-gray-800 p-4 rounded-lg">
      <div className="flex items-start space-x-4">
        <Avatar className="w-8 h-8">
          <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <div className="font-semibold">AC</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              2 hours ago
            </div>
          </div>
          <div>
            This is really cool! I can't wait to use it in my own projects.
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <Button variant="ghost" size="none" className="p-1 rounded-full">
              <ThumbsUpIcon className="w-3 h-3.5" />
              <div /> Like
            </Button>
            <Button variant="ghost" size="none" className="p-1 rounded-full">
              <ThumbsDownIcon className="w-3 h-3.5" />
              <div /> Dislike
            </Button>
            <Button variant="ghost" size="none" className="p-1 rounded-full">
              <ChevronDownIcon className="w-3 h-3.5" />
              <div /> Reply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ThumbsDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 14V2" />
      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
    </svg>
  );
}

function ThumbsUpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
}
