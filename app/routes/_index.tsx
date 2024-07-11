import type { MetaFunction } from "@remix-run/node";

import calamari_rings from "../images/calamari_rings.png";
import fish_cakes from "../images/fish_cakes.png";
import prawn_cocktail from "../images/prawn_cocktail.png";
import salmon_fillets from "../images/salmon_fillets.png";
import seafood_selection from "../images/seafood_selection.png";
import smoked_mackerel from "../images/smoked_mackerel.png";
import yellowfin_tuna from "../images/yellowfin_tuna.png";

import ItemCard from "../components/item_card";

export const meta: MetaFunction = () => {
  return [
    { title: "Seafood Inventory" },
    { name: "description", content: "Seafood Inventory" },
  ];
};

export default function Index() {
  return (
    <div className="grid justify-items-center grid-cols-1 bg-slate-200">
      <h1 className="text-4xl font-bold text-center py-5">Seafood Inventory</h1>
      <ItemCard image={calamari_rings} itemName="Calamari Rings" itemSKU="623052" />
      <ItemCard image={fish_cakes} itemName="Fish Cakes" itemSKU="398676"  />
      <ItemCard image={prawn_cocktail} itemName="Prawn Cocktail" itemSKU="464635"  />
      <ItemCard image={salmon_fillets} itemName="Salmon Fillets" itemSKU="484959"  />
      <ItemCard image={seafood_selection} itemName="Seafood Selection" itemSKU="604166"  />
      <ItemCard image={smoked_mackerel} itemName="Smoked Mackerel" itemSKU="667956" />
      <ItemCard image={yellowfin_tuna} itemName="Yellowfin Tuna" itemSKU="123456" />
    </div>
  );
}
