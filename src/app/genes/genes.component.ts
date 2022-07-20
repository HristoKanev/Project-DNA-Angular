import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Gene } from '../gene';
import {GeneService} from '../gene.service';
import { MessageService } from '../message.service.spec';


@Component({
  selector: 'app-genes',
  templateUrl: './genes.component.html',
  styleUrls: ['./genes.component.css']
})
export class GenesComponent implements OnInit {
  genes: Gene[] =[];
  constructor(private geneService: GeneService) { }

  ngOnInit(): void {
    this.getGenes();
    
  }

getGenes(): void{
  this.geneService.getGenes().subscribe(genes=>this.genes=genes); 
}

}
