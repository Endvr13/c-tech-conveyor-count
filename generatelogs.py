import json
import random
from datetime import datetime, timedelta

# Define the array of SKUs
skus = [623052, 398676, 464635, 484959, 604166, 667956, 123456]

# Function to generate random time
def random_time():
    base_time = datetime.now().replace(microsecond=0)
    random_seconds = random.uniform(0.1, 2)
    new_time = base_time + timedelta(seconds=random_seconds)
    return new_time.strftime("%H:%M:%S.%f")[:-3]

# Generate data
data = {}
for sku in skus:
    inventory_count = random.randint(1000, 5000)  # Random inventory count for each SKU
    sku_data = []
    for i in range(2000):
        entry = {
            "inventory": inventory_count + i,
            "time": random_time()
        }
        sku_data.append(entry)
    data[sku] = sku_data

# Create the final structure


# Write to JSON file
with open('inventory_logs.json', 'w') as f:
    json.dump(data, f, indent=2)

print("JSON file 'inventory_data.json' has been generated.")