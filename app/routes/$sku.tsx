import { json, LoaderFunction} from '@remix-run/node';
import { useParams } from 'react-router-dom';
import fs from 'fs/promises'; // For reading JSON
import { useLoaderData } from '@remix-run/react';
import { useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Divider, Link } from '@nextui-org/react';


/**
 * Loader function for retrieving inventory data based on SKU.
 * @param {Object} params - The parameters object containing the SKU.
 * @param {string} params.sku - The SKU to retrieve inventory data for.
 * @returns {Promise<Response>} A promise that resolves to the inventory data as a JSON response.
 * @throws {Response} Throws a response with an error message if the SKU is missing, not found, or if there is an internal server error.
 */
export const loader: LoaderFunction = async ({ params }) => {
  const sku = params.sku;
  if (!sku) {
    throw new Response("Missing SKU", { status: 400 });
  }
  try {
    const data = JSON.parse(await fs.readFile('./app/data/inventory_logs.json', 'utf-8'));
    const inventoryData = data[sku];
    if (!inventoryData) {
      throw new Response("SKU not found", { status: 404 });
    }
    return json(inventoryData);
  } catch (error) {
    console.error("Error loading data:", error);
    throw new Response("Internal Server Error", { status: 500 });
  }
};

/**
 * Renders the inventory page for a specific SKU.
 *
 * @returns The JSX element representing the inventory page.
 */

export default function InventoryPage() {

  const inventoryData = useLoaderData<typeof loader>();

  const reversedInventoryData = [...inventoryData].reverse();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 50;

  const offset = currentPage * itemsPerPage;
  const currentPageData = reversedInventoryData.slice(offset, offset + itemsPerPage);

  const pageCount = Math.ceil(reversedInventoryData.length / itemsPerPage);

  const handlePageClick = (data: { selected: number}) => {
    setCurrentPage(data.selected)
  }

  const listContainerRef = useRef<HTMLUListElement>(null);

  

  return (
    <div className='min-h-screen bg-slate-200 my-auto py-5'>
      <div className='container mx-auto max-w-lg p-4 bg-slate-100 rounded-xl '>
        <div>
          <Link href={'/'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back</Link>
          <h1 className='text-2xl font-bold mb-4'>Inventory for SKU: {useParams().sku}</h1>
          <h1 className='text-2xl font-bold mb-4'>{useParams().name}</h1>
        </div>
        <div className='grid grid-rows-2 bg-slate-100'>
          <div className='flex justify-between mb-4 flex-row'>
            <h2 className='text-lg'>Quantity</h2>
            <h2 className='text-lg'>Timestamp</h2>
          </div>
          <Divider></Divider>
        </div>


        <ul 
          ref={listContainerRef}
          className='list-none p-0 max-h-[600px] overflow-y-auto'>
          {currentPageData.map((item, index) => (
            <li key={index}
                className='border-b border-gray-200 py-2 flex justify-between'
            >
              <span className='font-semibold'>{item.inventory}</span>
              <span className='font-semibold'>{item.time}</span>
            </li>
          ))}
        </ul>

        <ReactPaginate
          previousLabel={
            <span className='px-3 py-2 border rounded m-0.5'>Previous</span>
          }
          nextLabel={
            <span className='px-3 py-2 border rounded m-0.5'>Next</span>
          }
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={4}
          onPageChange={handlePageClick}
          containerClassName="pagination flex justify-center mt-4 items-center space-x-1"
          activeLinkClassName="bg-blue-500 text-white m-1"
          breakLinkClassName='px-1 py-1 border rounded m-1 block w-full h-full flex justify-center items-center'
          pageLinkClassName='px-1 py-1 border block w-full h-full flex justify-center items-center rounded m-1'
        />
      </div>      
    </div>

  );
}
