import FoodSupplier from './FoodSupplier'

const opentelemetry = require('@opentelemetry/api');
const tracer = opentelemetry.trace.getTracer('main-tracer');

class FoodFinder {
    constructor() {
        this.supplier = new FoodSupplier()
    }

    getInventory(ingredient, span_context) {
        const span = tracer.startSpan('getInventory', {
            span_context,
        });

        const time_start = (new Date()).getTime();
  
        const vendors = this.supplier.getVendors(ingredient)
        const inventory = vendors.map(v => {
            const name = v.getName()
            const quantity = v.getQuantity(ingredient)
            // const price = v.getPrice(ingredient)
            return (name, quantity)
        })

        const time_end = (new Date()).getTime();

        span.setAttribute('key', 'value');
        span.addEvent('invoking doWork');
        span.end();
        
        return inventory;
    }
}

export default FoodFinder