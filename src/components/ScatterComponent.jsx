import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function LineChart( data ) {
  const svgRef = useRef();
  let nums = [];


  var age = data.age;
  const handleAge = () => {
    var ageLimit;
    if(age < 25){
       ageLimit = 17;
    }
    else{
       ageLimit = age-8;
    }
    return ageLimit;
  }


  useEffect(() => {

    if(data.age){
      for(let i=0; i < data.data.y.length;i++){
         nums.push([handleAge()+i,(handleAge()+i)+data.data.y.length,(handleAge()+i)+(2*(data.data.y.length))]);
        
      }
    }
  }, [age]);


  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    if (data) {

      const padding = { top: 10, right: 10, bottom: 60, left:50 };
      const width = +450 - padding.left - padding.right;
      const height = +300 - padding.top - padding.bottom;
      const g = svg.append("g").attr("transform", `translate(${padding.left},${padding.top})`);


      const xExtent = d3.extent(data.data.x);

      const xScale = d3.scaleLinear()
        .domain(xExtent)
        .range([0, width])
        .nice();
      const yScale = d3.scaleLinear()
        .domain([0, 9])
        .range([height, 0])
        .nice();

      const line = d3.line()
        .x(d => xScale(d))
        .y((d, i) => yScale(data.data.y[i]));

        
      g.append("g")
        .attr("color", "#E74646")
        .call(d3.axisLeft(yScale));

      g.append('path')
        .datum(data.data.x)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2)
        .attr('d', line);
      
        g.selectAll('.circle')
        .data(data.data.y)
        .enter()
        .append('circle')
        .attr('cx', (d, i) => xScale(data.data.x[i]))
        .attr('cy', (d, i) => yScale(d))
        .attr('r', 7)
        .style('fill', 'white')
        .style("stroke", "violet");

        g.selectAll('.dashed')
        .data(data.data.y)
        .enter()
        .append('line')
        .attr('x1', 0)
        .attr('y1', d => yScale(d))
        .attr('x2', (d, i) => xScale(data.data.x[i]))
        .attr('y2', d => yScale(d))
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '5 15');
  
        
    }
  }, [data]);

  return (  
      <svg ref={svgRef} style={{maxWidth:"500px"}} viewBox="0 0 500 300" />
  );
}

export default LineChart;
