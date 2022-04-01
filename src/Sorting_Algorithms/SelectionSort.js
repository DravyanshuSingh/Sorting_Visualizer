import { swap } from "./Swap_fun";


  export function getSelectionSortAnimations(arr){
    const animations =[];
    if(arr.length<=1)return arr;

    const temp = [...arr];
    for(let i=0;i<temp.length;i++)
    {
          let min_idx=i;
          for(let j=i+1;j<temp.length;j++)
          {
            animations.push([[min_idx, j], false]);
            if(temp[j]<temp[min_idx])
            {
                min_idx=j;
            }
          }
          animations.push([[min_idx, temp[i]], true]);
          animations.push([[i, temp[min_idx]], true]);
          swap(temp,i,min_idx);
    }
    return animations;
  }