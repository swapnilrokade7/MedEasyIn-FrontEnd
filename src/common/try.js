
let cart=[{"name":"Sagar"},{"name":"Mayank"},{"name":"Swapnil"}]
console.log(cart.length);
cart.map((item,index)=>{
    if(item.name==="Swapnil"){
        console.log("In Map")
        cart.splice(index,1);
    }
})
// console.log(cart);