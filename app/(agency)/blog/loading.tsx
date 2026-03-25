export default function Loading() {
  return (
    <div className="py-24 px-6 max-w-7xl mx-auto text-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#5B3CF5] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
        <span className="!absolute !-m-px !h-px !w-px !oh-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
      </div>
      <p className="mt-4 text-[#6E6E82] font-medium">Fetching blog posts...</p>
    </div>
  );
}
