// Async delay
function delay(ms){
  return new Promise(resolve=>setTimeout(resolve,ms));
}
// same Promise as before
async function asyncFormedDelay(ms){
  await new Promise(resolve=>setTimeout(resolve,ms));
}

let printout = async function(count){
  for(let i=0;i<count;i++){
    await console.log(i);
    await delay(1000);
  }
};

// Sync delay
for(let i=0;i<5;i++){
  setTimeout(()=>{
    console.log(i)
  },1000*i);
}
