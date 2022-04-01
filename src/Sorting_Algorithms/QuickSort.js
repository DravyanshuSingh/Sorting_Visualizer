import { swap } from './Swap_fun';

export function getQuickSortAnimations(arr) {
  const temp = [...arr];
  const animations = [];
  quickSort(temp, 0, temp.length - 1, animations);
  return animations;
}

function quickSort(arr, left, right, animations) {
  if (right <= left) return;
  const part = partition(arr, left, right, animations);
  quickSort(arr, left, part, animations);
  quickSort(arr, part + 1, right, animations);
}

function partition(arr, left, right, animations) {
  let i = left;
  let j = right + 1;
  const pivot = arr[left];
  while (true) {
    while (arr[++i] <= pivot) {
      if (i === right) break;
      animations.push([[i], false]);
    }
    while (arr[--j] >= pivot) {
      if (j === left) break;
      animations.push([[j], false]);
    }
    if (j <= i) break;
    animations.push([[i, arr[j]], true]);
    animations.push([[j, arr[i]], true]);
    swap(arr, i, j);
  }
  animations.push([[left, arr[j]], true]);
  animations.push([[j, arr[left]], true]);
  swap(arr, left, j);
  return j;
}