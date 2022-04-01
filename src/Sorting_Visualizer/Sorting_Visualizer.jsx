import React, { useState, useEffect, useRef }from 'react';
import ReactDom from 'react-dom'

import {getMergeSortAnimations} from '../Sorting_Algorithms/MergeSort.js';
import {getQuickSortAnimations} from '../Sorting_Algorithms/QuickSort.js';
import {getInsertionSortAnimations} from '../Sorting_Algorithms/InsertionSort.js';
import {getBubbleSortAnimations} from '../Sorting_Algorithms/BubbleSort.js';
import {getSelectionSortAnimations} from '../Sorting_Algorithms/SelectionSort.js';
import {getHeapSortAnimations} from '../Sorting_Algorithms/HeapSort.js';
import './Sorting_Visualizer.css';


var ANIMATION_SPEED = 20;

var ARR_LEN = 80;
var WIDTH = 2;

const ACCESSED_COLOR = 'red';

const SORTED_COLOR = 'green';


export default function SortingVisualizer(props) {

  const [arr, setArr] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const contRef = useRef(null);

  useEffect(generateArray, []);

      //Generating new array
      function generateArray() {
        if (isSorting) return;
        if (isSorted) changeArrColour();
        setIsSorted(false);
        const arr = [];
        for (let i = 0; i < ARR_LEN; i++) {
          arr.push(randomIntFromInterval(5, 600));
        }
        setArr(arr);
      }
    
       //Calling all sorting algorithms
      function mergeSort() {
        const animations = getMergeSortAnimations(arr);
        animateArrUpdate(animations);
      }
    
      function insertionSort() {
        const animations = getInsertionSortAnimations(arr);
        animateArrUpdate(animations);
      }
    
      function quickSort() {
        const animations = getQuickSortAnimations(arr);
        animateArrUpdate(animations);
      }

      function bubbleSort() {
        const animations = getBubbleSortAnimations(arr);
        animateArrUpdate(animations);
      }

      function selectionSort() {
        const animations = getSelectionSortAnimations(arr);
        animateArrUpdate(animations);
      }

      function heapSort() {
        const animations = getHeapSortAnimations(arr);
        animateArrUpdate(animations);
      }

      function animateArrUpdate(animations) {
        if (isSorting) return;
        setIsSorting(true);
        animations.forEach(([compare, swap], idx) => {
          setTimeout(() => {
            if (!swap) {
              if (compare.length === 2) {
                const [i, j] = compare;
                animateArrAccess(i);
                animateArrAccess(j);
              } else {
                const [i] = compare;
                animateArrAccess(i);
              }
            } else {
              setArr((prevArr) => {
                const [k, new_value] = compare;
                const newArr = [...prevArr];
                newArr[k] = new_value;
                return newArr;
              });
            }
          }, idx * ANIMATION_SPEED);
        });
        setTimeout(() => {
          animateSortedArr();
        }, animations.length * ANIMATION_SPEED);
      }


      function animateArrAccess(index) {
        const arrBars = contRef.current.children;
        const arrBarStyle = arrBars[index].style;
        setTimeout(() => {
          arrBarStyle.backgroundColor = ACCESSED_COLOR;
        }, ANIMATION_SPEED);
        setTimeout(() => {
          arrBarStyle.backgroundColor = '';
        }, ANIMATION_SPEED * 2);
      }      


  function animateSortedArr() {
    const arrBars = contRef.current.children;
    for (let i = 0; i < arrBars.length; i++) {
      const arrBarStyle = arrBars[i].style;
      setTimeout(
        () => (arrBarStyle.backgroundColor = SORTED_COLOR),
        i * ANIMATION_SPEED,
      );
    }
    setTimeout(() => {
      setIsSorted(true);
      setIsSorting(false);
    }, arrBars.length * ANIMATION_SPEED);
  }

  function changeArrColour() {
    const arrBars = contRef.current.children;
    for (let i = 0; i < arr.length; i++) {
      const arrBarStyle = arrBars[i].style;
      arrBarStyle.backgroundColor = '';
    }
  }

  
  

  return(
      <div className="array-container">

      <div className="Button">
        <button type="button" className="btn btn-outline-secondary btn-xs" onClick={generateArray}>Generate New Array</button>
        <button type="button" className="btn btn-outline-secondary btn-xs"onClick={mergeSort}>Merge Sort</button>
        <button type="button" className="btn btn-outline-secondary btn-xs"onClick={quickSort}>Quick Sort</button>
        <button type="button" className="btn btn-outline-secondary btn-xs"onClick={bubbleSort}>Bubble Sort</button>
        <button type="button" className="btn btn-outline-secondary btn-xs"onClick={selectionSort}>Selection Sort</button>
        <button type="button" className="btn btn-outline-secondary btn-xs"onClick={insertionSort}>Insertion Sort</button>
     </div>

        <div className="bar" ref={contRef}>
        
        
        {arr.map((Height, idx) => (
          <div
            className="array-bar" 
            key={idx}
            style={{
              width:`${12}px` ,
              height: `${Height}px`,
            }}></div>
        ))}
        </div>
      </div>


      
    );
  }

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
