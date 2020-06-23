class FoodVendor {
    constructor(name, inventory) {
        this.name = name
        this.inventory = inventory
    }

    getName() {
        return this.name
    }

    getQuantity(ingredient) {
        let quantity = 0
        this.inventory.forEach(i => {
            if (i[0] === ingredient) {
                quantity += i[1]
            }  
        })
        return quantity;
    }
}

export default FoodVendor