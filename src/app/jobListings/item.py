# CS 172 - Lab 2: Using Classes
# This program implements a Receipt class that manages a collection of items
# and calculates totals including tax

import datetime
from item import Item

class Receipt:
    def __init__(self, tax_rate=0.07):
        """
        Constructor for Receipt class
        Args:
            tax_rate (float): Tax rate as decimal, defaults to 0.07 (7%)
        """
        self.__tax_rate = tax_rate
        self.__purchases = []

    def addItem(self, item):
        """
        Adds an item to the receipt
        Args:
            item (Item): Item object to add to purchases
        """
        self.__purchases.append(item)

    def receiptToString(self):
        """Returns a formatted string representation of the entire receipt"""
        # Get current timestamp
        current_time = str(datetime.datetime.now())
        
        # Start building receipt string
        receipt = f"----- Receipt {current_time} -----\n"
        
        # Add each item
        subtotal = 0.0
        total_tax = 0.0
        
        for item in self.__purchases:
            price = item.getPrice()
            subtotal += price
            total_tax += item.getTax(self.__tax_rate)
            # Format with name, underscores, and right-aligned price
            name = item.getItemName()
            receipt += f"{name}{('_' * (35 - len(name)))}{price:>5.2f}\n"
        
        # Add totals with same formatting
        receipt += "\n"  # Add blank line before totals
        receipt += f"Sub Total{('_' * (35 - len('Sub Total')))}{subtotal:>5.2f}\n"
        receipt += f"Tax{('_' * (35 - len('Tax')))}{total_tax:>5.2f}\n"
        receipt += f"Total{('_' * (35 - len('Total')))}{grand_total:>5.2f}"
        
        return receipt

# Test your Receipt class here before you continue with the rest of the lab
if __name__ == "__main__":
    # Milestone 2: Create an instance of Receipt and test its methods
    print('*** Testing Receipt Class ***')
    item1 = Item('Soda', 2.48, True)
    item2 = Item('Milk', 4.79, False)
    myReceipt = Receipt(0.08)
    myReceipt.addItem(item1)
    myReceipt.addItem(item2)
    print(myReceipt.receiptToString())