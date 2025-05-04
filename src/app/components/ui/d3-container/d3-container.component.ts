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
import { Country, FilterType, Region, World } from '../../../shared/interfaces/continent-region-country.interfaces';
import { Store } from '@ngxs/store';
import { filter, map, Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { D3DataModel, D3Selectors } from '../view-model/d3.selectors.view-model';
import { WorldActions } from '../../../store/actions/world-actions';
import { HierarchyCircularNode, HierarchyNode } from 'd3';
import { WorldSelectors } from '../../countries-display/view-model/world.selectors';

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

    this.store
    .select(WorldSelectors.getViewModel)
    .pipe(
      filter(vm => !!vm?.hierachy && Array.isArray(vm.hierachy.children) && vm.hierachy.children.length > 0)
    )
    .subscribe(vm => {
      console.log(vm)
      this.drawData(vm.hierachy, vm.filterType);
    });

  }

  private drawData(data: Country, filter: FilterType): void {
    const svg = d3.select(this.svgRef.nativeElement);
    svg.selectAll('*').remove();
  
    const width = +svg.attr('width');
    const height = +svg.attr('height');
  
    // Create a group for zoomable content
    const zoomGroup = svg.append('g').attr('class', 'zoom-group');
  
    // Set up zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 5]) // zoom scale limits
      .on('zoom', (event) => {
        zoomGroup.attr('transform', event.transform);
      });

      
  
    // Attach zoom behavior to the SVG
    (svg as unknown as d3.Selection<SVGSVGElement, unknown, null, undefined>).call(zoom);
  
    // Build D3 hierarchy and compute packing
    const root = d3.hierarchy<Country>(data)
      .sum(d => d[filter] ?? 0)
      .sort((a, b) => b.value! - a.value!);
  
    const packed = d3.pack<Country>()
      .size([width, height])
      .padding(5)(root);
  
    // Create nodes inside the zoom group
    const nodeGroups = zoomGroup
      .selectAll<SVGGElement, HierarchyCircularNode<Country>>('g')
      .data(packed.descendants())
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .style('cursor', 'pointer')
      .on('click', (_, d) => {
        this.store.dispatch(new WorldActions.CountrySelected(d.data));
      });
  
    nodeGroups
      .append('circle')
      .attr('r', d => d.r)
      .attr('fill', d => (d.children ? '#fc3298' : '#3e4d64'))
      .attr('stroke', '#fff');
  
    nodeGroups
      .filter(d => !d.children)
      .append('text')
      .text(d => d.data.country)
      .attr('dy', '0.3em')
      .style('text-anchor', 'middle')
      .style('pointer-events', 'none')
      .style('fill', '#fff')
      .style('font-size', d => `${Math.min(2 * d.r, (2 * d.r) / d.data.country.length)}px`);
  }
  

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}