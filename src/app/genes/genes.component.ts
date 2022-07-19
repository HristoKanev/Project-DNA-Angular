import { Component, OnInit } from '@angular/core';
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
  selectedGene?: Gene;

  

  

  constructor(private geneService: GeneService, private messageService:MessageService) { }

  ngOnInit(): void {
    this.getGenes();
    
  }
onSelect(gene:Gene) : void {
  this.selectedGene = gene;
  this.messageService.add(`GenesComponent: Selected gene id=${gene.id}`);
}

getGenes(): void{
  this.geneService.getGenes().subscribe(genes=>this.genes=genes); 
}
}
