import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  public url: string;
  public sanitizedUrl: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    const snapshot = this.route.snapshot;
    if (snapshot.params['id']) {
      const streamId = snapshot.params['id'];
      this.createUrl(streamId);
    }
  }

  public toStreams() {
    this.router.navigate(['/streams']);
  }

  private createUrl(streamId: string) {
    this.url = 'http://localhost:5601/app/kibana#/visualize/edit/75b307a0-5f36-11e8-8c81-198045bd6619?embed=true&_g=()&_a=(filters:!(("$state":(store:appState),meta:(alias:!n,disabled:!f,index:"92b418c0-5f32-11e8-8c81-198045bd6619",key:streamName,negate:!f,params:(query:'+streamId+',type:phrase),type:phrase,value:'+streamId+'),query:(match:(streamName:(query:'+streamId+',type:phrase))))),linked:!f,query:(language:lucene,query:""),uiState:(vis:(legendOpen:!t)),vis:(aggs:!((enabled:!t,id:"1",params:(customLabel:"Ingested_Observations"),schema:metric,type:count),(enabled:!t,id:"3",params:(field:statistics.IngestObservation.phenomenon.keyword,size:10),schema:group,type:significant_terms),(enabled:!t,id:"4",params:(customInterval:"2h",extended_bounds:(),field:"@timestamp",interval:h,min_doc_count:1),schema:segment,type:date_histogram)),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,categoryAxes:!((id:CategoryAxis-1,labels:(show:!t,truncate:100),position:bottom,scale:(type:linear),show:!t,style:(),title:(),type:category)),grid:(categoryLines:!f,style:(color:%23eee)),legendPosition:right,seriesParams:!((data:(id:"1",label:"Ingested_Observations"),drawLinesBetweenPoints:!t,mode:normal,show:true,showCircles:!t,type:histogram,valueAxis:ValueAxis-1)),times:!(),type:histogram,valueAxes:!((id:ValueAxis-1,labels:(filter:!f,rotate:0,show:!t,truncate:100),name:LeftAxis-1,position:left,scale:(mode:normal,type:linear),show:!t,style:(),title:(text:"Ingested_Observations"),type:value))),title:vis,type:histogram))';
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

}
