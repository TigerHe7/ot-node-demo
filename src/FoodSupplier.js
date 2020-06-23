import FoodVendor from './FoodVendor.js'

class FoodSupplier {
    constructor() {
        // mock
        this.vendors = []
        this.vendors.push(new FoodVendor("foodmart", [["salt", 10, 300]]))
        this.vendors.push(new FoodVendor("foodplace", [["salt", 2, 200]]))
        this.vendors.push(new FoodVendor("foodstore", [["salt", 57, 1000]]))
    }

    getVendors(ingredient) {
        // mock
        // simulate some random work.
        for (let i = 0; i <= Math.floor(Math.random() * 4000000000); i += 1) {
          // empty
        }

        console.log(this.vendors.filter(v => {
            return v.getQuantity(ingredient) > 0
        }))

        return this.vendors.filter(v => {
            return v.getQuantity(ingredient) > 0
        })
    }
}

export default FoodSupplier