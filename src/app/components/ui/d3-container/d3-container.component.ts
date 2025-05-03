import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Input
} from '@angular/core';
import * as d3 from 'd3';
import { Region, World } from '../../../shared/interfaces/continent-region-country.interfaces';

export type HierarchyDatum = {
  name: string;
  value?: number;
  children?: HierarchyDatum[];
};

type PackedNode = d3.HierarchyCircularNode<HierarchyDatum>;

@Component({
  selector: 'app-d3-container-world-container',
  templateUrl: './d3-container.component.html',
  styleUrls: ['./d3-container.component.scss']
})
export class D3ContainerWorld implements AfterViewInit {

  @ViewChild('svg', { static: true }) svgRef!: ElementRef<SVGElement>;

  @Input() hierachy!: HierarchyDatum;

  ngAfterViewInit(): void {

    // map data 
    console.log(this.hierachy);

    const svg = d3.select(this.svgRef.nativeElement);
    const width = 600;
    const height = 600;

    const root = d3
      .hierarchy<HierarchyDatum>(this.hierachy)
      .sum(d => d.value || 0)
      .sort((a, b) => b.value! - a.value!);


    const packedRoot = d3.pack<HierarchyDatum>()
      .size([width, height])
      .padding(5)(root);

      const nodes = svg
      .selectAll('circle')
      .data(packedRoot.descendants()) // Type: PackedNode[]
      .enter()
      .append('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.r)
      .attr('fill', d => d.children ? '#69b3a2' : '#40a9f3')
      .attr('stroke', '#fff');
    
  }

 
}