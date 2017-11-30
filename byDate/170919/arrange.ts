/**
 * 给定一个数组，枚举出数组中元素的所有可能的组合
 * @param select 
 * @param unselect 
 * @param deep 
 */

function arrange(select,unselect,deep){
    if(unselect.length===0){
        console.log('Possible result: ', select);
        return;
    }

    for(let i=0;i<unselect.length;i++){
        select[deep] = unselect[i];
        arrange(select,unselect.filter((value,index)=>{
            index!==i
        }),deep+1);
    }
}

arrange([1,2,3],[1,2,3],2);