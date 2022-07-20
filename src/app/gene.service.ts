import { Injectable } from '@angular/core';
import {Gene} from './gene';
import { GENES } from './mock-genes';
import {Observable, of} from 'rxjs';
import { MessageService } from './message.service.spec';

@Injectable({
  providedIn: 'root'
})
export class GeneService {
  

  getGenes(): Observable<Gene[]>{
    const genes = of(GENES);
    this.messageService.add('GeneService fetched genes')
    return genes;
  }
  constructor(private messageService: MessageService) { }
  getGene(id: number): Observable<Gene> {
    
    const gene = GENES.find(h => h.id === id)!;
    this.messageService.add(`GeneService: fetched gene id=${id}`);
    return of(gene);
  }
}
