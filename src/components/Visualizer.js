import React from 'react';
import SortingVisualizer from '../components/sorting/SortingVisualizer';

const Visualizer = () => {

    return (
        <>
            <div className="modal fade" id="sortingInfo">
                <div className="modal-dialog">
                    <div className="modal-content intro">
                        <div className="modal-header">
                            <h5 className="modal-title">Sorting</h5>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body style-body">
                            <p>Sorting is a process of arranging an ordered sequence. It is a common operation in many applications.</p>
                                <div className='uses-list'>
                                    <h5>Selection Sort</h5>
                                    <p className='sorts'>Selection sort is a sorting algorithm. This sorting algorithm is an in-place comparison-based algorithm in which the list is divided into two parts, the sorted part at the left end and the unsorted part at the right end. Initially, the sorted part is empty, and the unsorted part is the entire list.</p>
                                    <h5>Bubble Sort</h5>
                                    <p className='sorts'>Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order.</p>
                                    <h5>Insertion Sort</h5>
                                    <p className='sorts'>Insertion sort is a sorting algorithm in which the elements are transferred one at a time to the right position.</p>
                                    <h5>Merge Sort</h5>
                                    <p className='sorts'>Merge Sort is a Divide and Conquer algorithm. It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.</p>
                                    <h5>Quick Sort</h5>
                                    <p className='sorts'>Quick sort is a highly efficient sorting algorithm and is based on partitioning of array of data into smaller arrays. A large array is partitioned into two arrays one of which holds values smaller than the specified value, say pivot, based on which the partition is made and another array holds values greater than the pivot value.</p>
                                </div>
                            Now please choose a sorting algorithm and visualize it!
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <SortingVisualizer />
            </div>
            <div className="modal fade" id="setAlgoModal" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">No Algorithm Selected</h5>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body-alert">
                                <p>Please select an algorithm first.</p>
                            </div>
                        </div>
                    </div>
                </div>

        </>
    )
}

export default Visualizer;
