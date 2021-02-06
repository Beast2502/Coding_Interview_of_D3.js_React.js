import React, { Component } from 'react';
import ReactDom from 'react-dom';

import Data from './Data.json';
import {select, scaleBand ,scaleLinear} from 'd3';
import './App.css'


class Index extends Component {
    constructor(){
        super();
        this.state = {
          data: Data,
        
        }
        this.draw = this.draw.bind(this);
      }

      componentDidMount(){
          this.draw();
      }

      draw(){
          const node = select(this.node);
          const bounds = node.node().getBoundingClientRect();
          const w = bounds.width;
          const h = bounds.height;
          const {data} = this.state;

          const xscale = scaleBand();
          xscale.domain(data.map(d=>d.month))
          xscale.range([0,w]);

          const yscale = scaleLinear();
          yscale.domain([0,100]);
          yscale.range([0,h]);

          const upd = node.selectAll('rect').data(data);
          upd.enter()
          .append('rect')
          .attr('x', d=>xscale(d.month))
          .attr('y',d=> h -yscale(d.sales))
          .attr('width', xscale.bandwidth())
          .attr('height', d=> yscale(d.sales) )
          .style("stroke", "red")
          .attr('fill','green') ;

          

      }
    render() {
        return (
            <div>
                
                <div className='gapping'>
                "Data"
                {this.state.data.map( data => {
                    return(
                        <div>
                            {data.month} => {data.sales}
                        </div>
                    )
                })}
              </div>
                <div className="gapping">
                    "Chart"
                    <svg
                        style={{ width: '100%', height: '100%' }}
                        ref={node => {
                                        this.node = node;
                                    }}
                      >
                    </svg>
                </div>
            </div>
        );
    }
}
ReactDom.render(<Index/>,document.getElementById('root'))
