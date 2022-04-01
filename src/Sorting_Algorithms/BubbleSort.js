import { swap } from "./Swap_fun";


  export function getBubbleSortAnimations(arr){
  const animations =[];
    if(arr.length<=1)return arr;
    const tempArr=arr.slice();
    bubbleSort(tempArr,animations);
    return animations;
}

function bubbleSort(arr, animations,){
  var sorted;
  do{
       sorted=true;
    for(let i=0;i<arr.length-1;i++)
    {animations.push([[i, i + 1], false]);
     if(arr[i]>arr[i+1]){
         animations.push([[i, arr[i + 1]], true]);
         animations.push([[i+1, arr[i]], true]);
         let temp=arr[i];
         arr[i]=arr[i+1];
         arr[i+1]=temp;
         sorted=false;
     }
      
    }
  }while(!sorted);

}



