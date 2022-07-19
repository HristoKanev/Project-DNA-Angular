import { Component, OnInit, Input } from '@angular/core';
import { Gene } from '../gene';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { GeneService } from '../gene.service';

@Component({
  selector: 'app-gene-detail',
  templateUrl: './gene-detail.component.html',
  styleUrls: ['./gene-detail.component.css']
})
export class GeneDetailComponent implements OnInit {
  @Input() gene?: Gene;

  constructor(private route: ActivatedRoute,
    private heroService: GeneService,
    private location: Location) { }

  ngOnInit(): void {
    this.getGene();
  }
  getGene(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getGene(id)
      .subscribe(gene => this.gene = gene);
  }
  goBack(): void {
    this.location.back();
  }
}
