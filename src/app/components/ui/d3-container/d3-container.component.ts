import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';
import * as d3 from 'd3';
import { Country, Region, World } from '../../../shared/interfaces/continent-region-country.interfaces';
import { Store } from '@ngxs/store';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { D3DataModel, D3Selectors } from '../view-model/d3.selectors.view-model';
import { WorldActions } from '../../../store/actions/world-actions';
import { HierarchyCircularNode, HierarchyNode } from 'd3';

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
export class D3ContainerWorld implements OnInit, OnDestroy {

  @ViewChild('svg', { static: true }) svgRef!: ElementRef<SVGElement>;

  hierachy!: HierarchyDatum;

  viewModel$!: Observable<D3DataModel>
  destroy$ = new Subject<void>();

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.viewModel$ = this.store.select(D3Selectors.getViewModel);

    this.viewModel$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(data => {
        if (!data.hierachy) { return;}
        this.drawData(data.hierachy);
      })

  }

  private drawData(data: Country): void {

    // if (data && data.population > 0) {
      const svg = d3.select(this.svgRef.nativeElement);
      svg.selectAll('*').remove();
  
      const width = +svg.attr('width');
      const height = +svg.attr('height');
  
      // Build D3 hierarchy and compute packing
      const root = d3.hierarchy<Country>(data)
        .sum(d => d.population)
        .sort((a, b) => b.value! - a.value!);
  
      const packed = d3.pack<Country>()
        .size([width, height])
        .padding(5)(root);
  
      // Create <g> for each node with the correct packed node type
      const nodeGroups = svg
        .selectAll<SVGGElement, HierarchyCircularNode<Country>>('g')
        .data(packed.descendants())
        .enter()
        .append('g')
        .attr('transform', d => `translate(${d.x},${d.y})`)
        .style('cursor', 'pointer')
        .on('click', (_, d) => {
          // Dispatch the Country object and open sidenav
          console.log(d.data);
          // this.store.dispatch(new SelectCountry(d.data));
          // this.sidenav.open();
        });
  
      // Draw circles
      nodeGroups
        .append('circle')
        .attr('r', d => d.r)  // now d.r is number
        .attr('fill', d => (d.children ? '#69b3a2' : '#40a9f3'))
        .attr('stroke', '#fff');
    // }

    
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}