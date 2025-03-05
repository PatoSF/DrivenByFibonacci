import ListingTable from "./ListingTable";


export default function Content() {
  return (
    <div className="space-y-4 p-4 w-full overflow-auto">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-color2 md:text-2xl text-3xl font-sora font-medium">Listings</h1>
        <ListingTable />
      </div>

      {/* <div className="bg-white rounded-xl p-6 flex flex-col items-start justify-start border border-gray-200 ">
        <h2 className="text-lg font-bold text-gray-900 mb-4 text-left flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-zinc-900" />
          Upcoming Events
        </h2>
        <List03 />
      </div> */}
    </div>
  );
}
