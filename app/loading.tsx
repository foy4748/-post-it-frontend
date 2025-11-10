"use client";

export default function SkeletonLoader() {
  return (
    <div className="w-full space-y-6 p-6">
      {/* Header Badge Skeleton */}
      <div className="inline-block">
        <div className="h-8 w-32 rounded-full bg-gray-200 animate-pulse" />
      </div>

      {/* Title Skeleton */}
      <div className="space-y-3">
        <div className="h-12 w-5/6 rounded-lg bg-gray-200 animate-pulse" />
        <div className="h-8 w-4/5 rounded-lg bg-gray-200 animate-pulse" />
      </div>

      {/* Author Info Skeleton */}
      <div className="flex items-center gap-4 py-4">
        <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-24 rounded-md bg-gray-200 animate-pulse" />
          <div className="h-4 w-32 rounded-md bg-gray-200 animate-pulse" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="space-y-3 pt-6">
        <div className="h-4 w-full rounded-md bg-gray-200 animate-pulse" />
        <div className="h-4 w-full rounded-md bg-gray-200 animate-pulse" />
        <div className="h-4 w-3/4 rounded-md bg-gray-200 animate-pulse" />
      </div>

      {/* Button Skeleton */}
      <div className="pt-6">
        <div className="h-10 w-32 rounded-lg bg-gray-200 animate-pulse" />
      </div>

      {/* Section Title Skeleton */}
      <div className="space-y-4 pt-8">
        <div className="h-8 w-48 rounded-lg bg-gray-200 animate-pulse" />
      </div>

      {/* Text Area Skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-20 rounded-md bg-gray-200 animate-pulse" />
        <div className="h-32 w-full rounded-lg bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
}
