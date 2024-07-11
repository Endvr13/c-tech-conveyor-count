import React, { useEffect, useState } from 'react';
import { Image} from "@nextui-org/react";
import { Link } from '@remix-run/react';

/**
 * Represents the props for the ItemCard component.
 */
interface ItemCardProps {
    image: string; // The image of the item.
    itemName: string; // The name of the item.
    itemSKU: string; // The SKU of the item.
}

/**
 * Represents an item card component.
 * @param {ItemCardProps} props - The props for the item card component.
 * @returns {JSX.Element} The rendered item card component.
 */
const ItemCard: React.FC<ItemCardProps> = (props) => {

    const [latestInventoryCount, setLatestInventoryCount] = useState(null)

    useEffect(() => {
        /**
         * Fetches the inventory count for the specified item SKU.
         * If the item SKU is found in the inventory logs, the latest inventory count is set using the `setLatestInventoryCount` function.
         * If there is an error while fetching the inventory count, the `setLatestInventoryCount` function is called with a value of `null`.
         */
        const fetchInventoryCount = async () => {
            try {
                const response = await fetch("/app/data/inventory_logs.json");
                const logs = await response.json();

                if (props.itemSKU in logs) {
                    const latestInventoryCount = logs[props.itemSKU].slice(-1)[0].inventory;
                    setLatestInventoryCount(latestInventoryCount);
                }
            } catch (error) {
                console.error("Error fetching inventory count: ", error);
                setLatestInventoryCount(null);
            }
        };

        fetchInventoryCount();
    }, [props.itemSKU]);

    return (
        <div className='py-1 bg-slate-300 rounded-xl my-1'>
            <div className="grid grid-cols-3 gap-4 items-center mx-5">
                <div className='w-48'>
                    <Image
                        width={150}
                        src={props.image} 
                    />
                </div>          
                
                <div className="space-y-1 px-5  flex flex-col">
                    <p className="text-lg font-bold">{props.itemName}</p>
                    <p className="text-sm">SKU: {props.itemSKU}</p>
                    <p className="text-sm">Inventory Count: {latestInventoryCount === null ? 'Loading...' : latestInventoryCount}</p>
                </div>
                <div className='justify-self-end'>
                    <Link to={`/${props.itemSKU}`} 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >View Logs</Link>

                </div>
            </div>   
        </div>
    );
};

export default ItemCard;