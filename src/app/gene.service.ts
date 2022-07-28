import { Injectable } from '@angular/core';
import {Gene} from './gene';
import {Observable, of} from 'rxjs';
import { MessageService } from './message.service.spec';
import { HttpClient } from '@angular/common/http';
import {throwError} from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneService {
  

  getGenes(): Observable<Gene[]>{
    const genes = this.httpClient.get("http://127.0.0.1:8000/genes").pipe(
      map(data => data as Gene[]),
      catchError(error => throwError("Genes not found"))
    );
    this.messageService.add('GeneService fetched genes')
    return genes;
  }
  constructor(private messageService: MessageService, private httpClient: HttpClient) { }
  getGene(id: number): Observable<Gene> {
    
    const gene =  this.httpClient.get(`http://127.0.0.1:8000/genes/${id}`).pipe(
      map(data => data as Gene),
      
      catchError(error => throwError(`Gene with ${id} not found`))
    );
   
    this.messageService.add(`GeneService: fetched gene id=${id}`);
    return  (gene);
  }
}
