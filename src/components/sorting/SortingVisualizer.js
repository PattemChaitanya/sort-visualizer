import React, { Component } from 'react';
import Pile from '../piles/Piles';
import { SelectionSort, BubbleSort, InsertionSort, MergeSort, QuickSort } from '../../algorithms/index';

export default class SortingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            piles: [],
            numPiles: 75,
            finished: false,
            maxPile: 100,
            changingPiles: [],
            pileDelayTimes: [30, 40, 40, 80, 80],
            DelayTimesSizeBased: {'immediate': [0,0,0,0,0],'fast': [15, 20, 20, 40, 40], 'normal': [30, 40, 40, 80, 80], 'slow': [60, 80, 80, 160, 160]},
            currentAlgorithm: null,
            unsortedPiles: [],
            speed: "fast",
            size: "medium",
            algorithms: ['Selection Sort', 'Bubble Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort'],
            sortingAlgorithms: [SelectionSort, BubbleSort, InsertionSort, MergeSort, QuickSort],
        };
        this.randomizePiles = this.randomizePiles.bind(this);
        this.visualizeSorting = this.visualizeSorting.bind(this);
        this.setAlgorithm = this.setAlgorithm.bind(this);
    }

    componentDidMount() {
        const piles = this.initializePiles();
        this.setState({
            piles: piles,
        });
        this.setState({ piles: piles, unsortedPiles: piles.slice() });
    }

    setAlgorithm(algoId) {
        if (this.state.unsortedPiles !== []) {
            this.setState({ finished: false, changingPiles: [], piles: this.state.unsortedPiles, pivot: -1 });
        }
        this.setState({ currentAlgorithm: algoId });
    }

    initializePiles() {
        let piles = [];
        for (let i = 0; i < this.state.numPiles; i++) {
            piles.push(i + 5);
        }

        for (let i = 0; i < this.state.numPiles; i++) {
            let j = getRandomInt(0, i);
            let temp = piles[i];
            piles[i] = piles[j];
            piles[j] = temp;
        }
        piles.push(this.state.numPiles + 5);
        return piles;
    }

    visualizeSorting() {
        if (this.state.currentAlgorithm === null) {
            return;
        }
        if (this.state.rendering) return;
        if (this.state.finished) {
            this.state.finished = false;
            this.state.changingPiles = [];
            this.state.piles = this.state.unsortedPiles;
        }
        const piles = this.state.piles.slice();

        const statesInOrder = this.state.sortingAlgorithms[this.state.currentAlgorithm](piles);
        for (let i = 0; i < statesInOrder.length; i++) {
            const { piles: state, changing: changingPiles, pivot } = statesInOrder[i];
            setTimeout(() => {
                this.setState({ piles: state, changingPiles: changingPiles, pivot: pivot });
            }, this.state.pileDelayTimes[this.state.currentAlgorithm] * i);

        }
        setTimeout(() => {
            this.setState({ finished: true });
        }, this.state.pileDelayTimes[this.state.currentAlgorithm] * statesInOrder.length);
    }

    randomizePiles() {
        if (this.state.rendering) return;
        this.setState({ finished: false, changingPiles: [], colorSetIndex: getRandomInt(0, 3) });
        const piles = this.initializePiles();
        this.setState({ piles: piles, unsortedPiles: piles.slice() });
    }

    setSpeed(speed) {
        this.setState({ speed: speed, pileDelayTimes: this.state.DelayTimesSizeBased[speed] });
    }

    setSize(s) {
        if(this.state.size === s) return;
        let sizes = {"smallest": 25 ,"small": 50, "medium": 75, "large": 100};
        this.setState({ size: s, numPiles: sizes[s] });
        this.state.numPiles = sizes[s];
        const piles = this.initializePiles();
        this.setState({ finished: false, changingPiles: [], piles: piles, unsortedPiles: piles.slice() });
    }

    render() {
        const piles = this.state.piles;
        return (
            <>
                <h6 style={{ marginTop: "20px" }}><strong style={{ textTransform: "uppercase" }}>Sorting Visualizer</strong></h6>
                <div className="d-flex justify-content-center" style={{ marginTop: "15px" }}>
                    <div className='dropdown 1'>
                        <div className="dropdown">
                            <button className="btn btn-primary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled={this.state.rendering} style={{ marginRight: "5px", height: "30px", width: "150px" }}>
                                {this.state.currentAlgorithm === null ? 'Algorithms' : this.state.algorithms[this.state.currentAlgorithm]}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                {this.state.algorithms.map((algorithm, algoId) => {
                                    return (
                                        <button type="button" className="btn btn-light navbtn" onClick={() => {
                                            this.setAlgorithm(algoId);
                                            this.setState({ currentAlgorithm: algoId});
                                        }}>
                                            {algorithm}
                                        </button>);
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="dropdown 1">
                        <button className="btn btn-outline-dark btn-sm dropdown-toggle" type="button" disabled={this.state.rendering} id="dropdownMenuSpeed" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ marginRight: "5px", height: "30px", width: "150px" }}>
                            {`Speed: ${this.state.speed}`}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuSpeed">
                            <button type="button" className="btn btn-light navbtn" style={{ height: "30px" }} onClick={() => this.setSpeed('slow')}><p style={{ "marginTop": "-5px" }}>{`slow`}</p></button>
                            <button type="button" className="btn btn-light navbtn" style={{ height: "30px" }} onClick={() => this.setSpeed('normal')}><p style={{ "marginTop": "-5px" }}>{`normal`}</p></button>
                            <button type="button" className="btn btn-light navbtn" style={{ height: "30px" }} onClick={() => this.setSpeed('fast')}><p style={{ "marginTop": "-5px" }}>{`fast`}</p></button>
                            <button type="button" className="btn btn-light navbtn" style={{ height: "30px" }} onClick={() => this.setSpeed('immediate')}><p style={{ "marginTop": "-5px" }}>{`immediate`}</p></button>
                        </div>
                    </div>
                    <div className="dropdown 1">
                        <button className="btn btn-outline-dark btn-sm dropdown-toggle" type="button" disabled={this.state.rendering} id="dropdownMenuSize" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ marginLeft: "5px", height: "30px", width: "150px" }}>
                            {`Size: ${this.state.size}`}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuSize">
                            <button type="button" className="btn btn-light navbtn" style={{ height: "30px" }} onClick={() => this.setSize('smallest')}><p style={{ "marginTop": "-5px" }}>{`smallest`}</p></button>
                            <button type="button" className="btn btn-light navbtn" style={{ height: "30px" }} onClick={() => this.setSize('small')}><p style={{ "marginTop": "-5px" }}>{`small`}</p></button>
                            <button type="button" className="btn btn-light navbtn" style={{ height: "30px" }} onClick={() => this.setSize('medium')}><p style={{ "marginTop": "-5px" }}>{`medium`}</p></button>
                            <button type="button" className="btn btn-light navbtn" style={{ height: "30px" }} onClick={() => this.setSize('large')}><p style={{ "marginTop": "-5px" }}>{`large`}</p></button>
                        </div>
                    </div>
                    <div style={{ marginLeft: "20px" }}>
                        <button type="button" className="btn btn-primary btn-sm" onClick={() => this.visualizeSorting()} data-toggle={this.state.currentAlgorithm === null ? "modal" : ""} data-target="#setAlgoModal" style={{ marginRight: "10px" }}>Go!</button>
                        <button type="button" className="btn btn-danger btn-sm" onClick={() => this.randomizePiles()}>Reset</button>
                    </div>
                </div>
                <div className="piles container">
                    {
                        piles.map((pile, pileId) => {
                            return (
                                <Pile
                                    finished={this.state.finished}
                                    className='pile'
                                    key={pileId}
                                    index={pileId}
                                    val={pile}
                                    size={this.state.size}
                                    isChanging={this.state.changingPiles.indexOf(pileId) !== -1}
                                ></Pile>
                            )
                        })
                    }
                </div>
                <button type='button' data-toggle="modal" data-target="#sortingInfo" className='btn btn-light' style={{ marginTop: "40px" }} >How to use?</button>
                <a href="https://github.com/PattemChaitanya/path-visualizer" style={{ marginTop: "40px" }} className="btn btn-light">Github Repo</a>
            </>
        );
    }

}

function getRandomInt(min, range) {
    return Math.floor(Math.random() * range) + min;
}