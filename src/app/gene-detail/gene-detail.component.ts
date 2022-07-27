import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Gene } from '../gene';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { GeneService } from '../gene.service';
import { AfterViewInit } from '@angular/core';
import { ExpressionStatement } from '@angular/compiler';

@Component({
  selector: 'app-gene-detail',
  templateUrl: './gene-detail.component.html',
  styleUrls: ['./gene-detail.component.css']
})
export class GeneDetailComponent implements OnInit, AfterViewInit {
  @Input() gene?: Gene;

  constructor(private route: ActivatedRoute,
    private heroService: GeneService,
    private location: Location) { }

  ngOnInit(): void {
    this.getGene();
  }
  @ViewChild('myCanvas')
private myCanvas: ElementRef ={} as ElementRef;

public context!:
CanvasRenderingContext2D
ngAfterViewInit():void {
  this.context = this.myCanvas.nativeElement.getContext('2d');
  
}

  getGene(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getGene(id)
      .subscribe(gene => {
        this.gene = gene;
        this.draw();

      });
  }
  goBack(): void {
    this.location.back();
  }
  private findBiggestNumber():number{

    let biggestNumber: number=0;
    if(this.gene == undefined)
    {
      return 0;
      
    }
    else{
    for(var trans of this.gene.transcripts)
    {
      if(trans.exons[trans.exons.length - 1].stop>biggestNumber)
      {
        biggestNumber = trans.exons[trans.exons.length-1].stop;
      };
    }
    }
    return biggestNumber;
  }
  private draw(){
    let maxLength: number =1150;
    let pxBetweenTranscripts: number=100;
    let currPxBetweenTrans: number = 0;
    let startNumber: number;
    let finishNumber: number = this.findBiggestNumber();
    if(this.gene == undefined)
    {
      return;
      
    }
    else{

    
    startNumber = this.gene.transcripts[0].exons[0].start;
    let difference: number = finishNumber - startNumber;
    let coefficient: number = difference/maxLength;
    console.log(finishNumber);
    
    let currentLength: number=0;
    for(var trans of this.gene.transcripts)
    {
      console.log(trans.transcript_id);
      console.log(trans.chrom);
      console.log(trans.strand);
      currPxBetweenTrans += pxBetweenTranscripts;
      currentLength = (trans.exons[trans.exons.length-1].stop-startNumber)/coefficient;
      for(var cd of trans.cds)
      for( var exon of trans.exons)
      {
        if(exon.start>cd.start && exon.stop<cd.stop) this.context.fillRect(50+(exon.start-startNumber)/coefficient, currPxBetweenTrans-10,(exon.stop-exon.start)/coefficient,20);
         else if(exon.start<cd.start && exon.stop<= cd.start || exon.start>=cd.stop && exon.stop> cd.stop )
        this.context.fillRect(50+(exon.start-startNumber)/coefficient, currPxBetweenTrans-4,(exon.stop-exon.start)/coefficient,10);
        
        else if(exon.start<=cd.stop && exon.stop>=cd.stop)
        {
          this.context.fillRect(50+(exon.start-startNumber)/coefficient, currPxBetweenTrans-10,(cd.stop-exon.start)/coefficient,20);
          this.context.fillRect(50+(cd.stop-startNumber)/coefficient, currPxBetweenTrans-4,(exon.stop-cd.stop)/coefficient,10);
       }
        else if(exon.start<=cd.start && exon.stop>=cd.start)
        {
        this.context.fillRect(50+(exon.start-startNumber)/coefficient, currPxBetweenTrans-4,(cd.start-exon.start)/coefficient,10);
        this.context.fillRect(50+(cd.start-startNumber)/coefficient, currPxBetweenTrans-10,(exon.stop-cd.start)/coefficient,20);
        }
    
        
        
      }
      this.context.fillRect(50, currPxBetweenTrans, currentLength, 1);
      this.context.fillText("Stop: " + String(finishNumber),50,currPxBetweenTrans+20);
      this.context.fillText("Transcript id: " + trans.transcript_id,50,currPxBetweenTrans+40);
      this.context.fillText("Transcript chrom: " + trans.chrom,50,currPxBetweenTrans+60);
      this.context.fillText("Transcript strand: " + trans.strand,50,currPxBetweenTrans+80);

    }
  }
  }
}
